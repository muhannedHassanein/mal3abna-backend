const { getPaymentLink } = require("../utils/paymob");

const initiatePayment = async (req, res) => {
  const { pitchId, hours } = req.body;

  try {
    const result = await getPaymentLink(pitchId, hours, req.user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { initiatePayment };
