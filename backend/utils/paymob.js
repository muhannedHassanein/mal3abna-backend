const axios = require("axios");
const Pitch = require("../models/pitchModel");
require("dotenv").config();

const API_KEY = process.env.PAYMOB_API_KEY;
const IFRAME_ID = process.env.PAYMOB_IFRAME_ID;
const INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;

const getAuthToken = async () => {
  const { data } = await axios.post("https://accept.paymob.com/api/auth/tokens", {
    api_key: API_KEY,
  });
  return data.token;
};

const createOrder = async (authToken, priceInCents) => {
  const { data } = await axios.post("https://accept.paymob.com/api/ecommerce/orders", {
    auth_token: authToken,
    delivery_needed: "false",
    amount_cents: priceInCents,
    currency: "EGP",
    items: [],
  });
  return data.id;
};

const generatePaymentKey = async (authToken, amount_cents, orderId, user) => {
  const { data } = await axios.post("https://accept.paymob.com/api/acceptance/payment_keys", {
    auth_token: authToken,
    amount_cents: amount_cents,
    expiration: 3600,
    order_id: orderId,
    currency: "EGP",
    integration_id: INTEGRATION_ID,
    billing_data: {
      apartment: "NA",
      email: user.email || "NA",
      floor: "NA",
      first_name: user.name,
      street: "NA",
      building: "NA",
      phone_number: user.phone || "+201000000000",
      shipping_method: "NA",
      postal_code: "NA",
      city: "Cairo",
      country: "EG",
      last_name: user.name,
      state: "Cairo",
    },
  });

  return data.token;
};

const getPaymentLink = async (pitchId, hours, user) => {
  const pitch = await Pitch.findById(pitchId);
  if (!pitch) throw new Error("Pitch not found");

  const pricePerHour = pitch.pricePerHour;
  const subtotal = pricePerHour * hours;
  const tax = subtotal * 0.05;
  const total = Math.ceil((subtotal + tax) * 100);

  const authToken = await getAuthToken();
  const orderId = await createOrder(authToken, total);
  const paymentToken = await generatePaymentKey(authToken, total, orderId, user);

  const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentToken}`;

  return { iframeUrl, total: total / 100 };
};

module.exports = { getPaymentLink };
