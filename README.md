🏟️ Mal3abna Backend
Backend API for Mal3abna — A football pitch booking platform.

🚀 Tech Stack
Node.js

Express.js

MongoDB + Mongoose

Paymob Payment Integration

JWT Authentication

Multer (for file uploads)

📂 Folder Structure

backend/
│
├── config/          # Database connection
├── controllers/     # Business logic
├── middleware/      # Auth and file upload middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── utils/           # Payment utils
├── uploads/         # User uploaded images
├── .env             # Environment variables (ignored)
├── .gitignore
├── package.json
└── server.js
🔑 Environment Variables

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PAYMOB_API_KEY=your_paymob_api_key
PAYMOB_IFRAME_ID=your_iframe_id
PAYMOB_INTEGRATION_ID=your_integration_id

🛠️ Run Locally

git clone https://github.com/muhannedHassanein/mal3abna-backend.git
cd mal3abna-backend
npm install
npm run dev

📄 API Endpoints
Method	Endpoint	Description	Auth Required

POST	/api/users/register	Register user	❌

POST	/api/users/login	Login user	❌

PUT	/api/users/update	Update user profile	✅

POST	/api/pitches	Create pitch	✅ (owner)

PUT	/api/pitches/:id	Update pitch	✅ (owner)

DELETE	/api/pitches/:id	Delete pitch	✅ (owner)

GET	/api/pitches	Get all pitches	❌

POST	/api/bookings/:pitchId	Book pitch	✅ (user)

GET	/api/bookings/my-bookings	Get my bookings	✅ (user)

POST	/api/payment/pay	Create payment	✅


💳 Payment Flow (Paymob)
Calculates pitch price based on booking hours.

Adds 5% VAT.

Generates payment link through Paymob iframe.

✅ Notes
.env file and node_modules/ are not uploaded.
Fully RESTful API.
Backend only — no frontend included for now.

✨ Author
Muhanned Hassanein
