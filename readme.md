# Shipment Tracker API

An API for tracking and updating shipment statuses, built with Node.js, TypeScript, Express, and MongoDB using Mongoose.

## Project Setup

Follow the steps below to set up and run the Shipment Tracker API locally.

### 1. Clone the Repository

```bash
git clone https://github.com/akashsingh3414/Shipment-Tracker.git
cd Shipment-Tracker
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed on your machine. Then, install the project dependencies:

```bash
npm install
```

### 3. Set Up TypeScript

Install TypeScript globally (if not already installed):

```bash
npm install -g typescript
```

You can compile the code (if needed) using:

```bash
tsc
```

For development, you're likely using `ts-node-dev`, so you can just run the dev script (more on that below).

### 4. Configure MongoDB

Ensure MongoDB is installed and running locally or use a remote MongoDB URI.

You can install MongoDB locally from:
https://www.mongodb.com/try/download/community

Or use a cloud-hosted MongoDB database like MongoDB Atlas.

### 5. Create a `.env` File

Create a `.env` file in the root of the project and add the following:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shipment-tracker
```

Replace the `MONGODB_URI` with your own connection string if using MongoDB Atlas or a custom DB name.

### 6. Seed the Database

Run the seed script to populate the database with initial data:

```bash
npm run seed
```

This script connects to MongoDB and inserts sample shipment data you can use for testing.

### 7. Start the Server

To start the server in development mode with auto-reloading:

```bash
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

Once running, the API will be available at: `http://localhost:3000`

## API Documentation

Detailed API documentation is available and maintained in Postman.

📎 [Refer to the full API documentation here](https://documenter.getpostman.com/view/37272934/2sB2cd5yna)

The documentation includes:

* All available endpoints
* Request/response examples
* Error formats
* Data structure descriptions

## Prerequisites

Make sure the following are installed before running the project:

* Node.js (v14 or higher)
* npm
* MongoDB
* TypeScript (`npm install -g typescript`)
* ts-node (`npm install -g ts-node`, if using manually)
* (Optional) Postman for API testing

## Testing the API

Once the server and MongoDB are running:

* Use `GET /shipments/:shipmentId/track` to view tracking info
* Use `POST /shipments/:shipmentId/status` to update shipment status
* Use Postman or any other API testing tool to interact with the endpoints.

## Suggested Project Structure

```
shipment-tracker/
│
├── backend/                     # Backend folder (Node.js + TypeScript + Mongoose)
│   ├── src/
│   │   ├── controllers/         # Logic for handling API requests
│   │   ├── models/              # Mongoose schemas and models
│   │   ├── routes/              # Express route definitions
│   │   ├── seed.ts              # Script to populate DB with sample data
│   │   └── index.ts             # Entry point of the app
│   │
│   ├── .env                     # Environment variables
|   ├── .gitignore               # Gitignore file for backend
│   ├── tsconfig.json            # TypeScript configuration
│   └── package.json             # Backend dependencies and scripts
│
├── frontend/                    # Frontend folder (React or Next.js app)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Pages
│   │   ├── App.tsx              # Main App component
|   |   ├── index.css
|   |   ├── types.ts             # Defines type of data
│   │   └── main.tsx             # Entry point
│   │
│   ├── tsconfig.json            # TypeScript config
|   ├── .gitignore               # Gitignore file for frontend
│   ├── vite.config.ts           # Based on the framework
│   └── package.json             # Frontend dependencies and scripts
│
└── README.md                    # Root project README
```

Let me know if you'd like to add Docker support, Swagger/OpenAPI integration, or deployment steps!
