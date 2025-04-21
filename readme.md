# Shipment Tracker API

An API for tracking and updating shipment statuses, built with Node.js, TypeScript, Express, and MongoDB using Mongoose.

## Project Structure

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
│   ├── .gitignore               # Gitignore file for backend
│   ├── tsconfig.json            # TypeScript configuration
│   └── package.json             # Backend dependencies and scripts
│
├── frontend/                    # Frontend folder (React using Vite)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Pages
│   │   ├── App.tsx              # Main App component
│   │   ├── index.css            # Main CSS file
│   │   ├── types.ts             # Defines type of data
│   │   └── main.tsx             # Entry point
│   │
│   ├── tsconfig.json            # TypeScript config
│   ├── .gitignore               # Gitignore file for frontend
│   ├── vite.config.ts           # Vite configuration
│   └── package.json             # Frontend dependencies and scripts
│
└── README.md                    # Root project README
```

## Project Setup

Follow the steps below to set up and run the Shipment Tracker API locally.

### 1. Clone the Repository

```bash
git clone https://github.com/akashsingh3414/Shipment-Tracker.git
cd Shipment-Tracker
```

### 2. Backend Setup

#### Install Dependencies

Navigate to the backend directory:

```bash
cd backend
npm install
```

#### Configure TypeScript

TypeScript should be installed as a project dependency in the backend's package.json, but you can also install it globally if needed:

```bash
npm install -g typescript
```

#### Set Up MongoDB

Ensure MongoDB is installed and running locally or use a remote MongoDB URI.

* Local installation: https://www.mongodb.com/try/download/community
* Cloud option: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

#### Create a `.env` File

Create a `.env` file in the backend directory:

Add the following configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shipment-tracker
```

Replace the `MONGODB_URI` with your own connection string if using MongoDB Atlas or a custom DB name.

#### Database Seeding Guide

##### Step 1: Navigate to the Backend Directory

```bash
cd backend/src
```

##### Step 2: Run the Seed Script

Use one of the following commands to run the seed script:

###### Option 1: Directly using ts-node

```bash
npx ts-node seed.ts
```

###### Option 2: Using npm script (if configured in package.json)

```bash
npm run seed
```

##### ShipmentId Note

After seeding:

Check the console output to **note down the generated `shipmentId`** from the **`Shipment` object’s `_id`** field  
  
You can use this shipmentId to **track the shipment status** in your application or while testing endpoints.

#### Start the Backend Server

From the backend/src/ directory:

```bash
# Development mode with auto-reloading
npm run dev

# OR for production build
npm run build
npm start
```

The API will be available at: `http://localhost:3000`

### 3. Frontend Setup

#### Install Dependencies

Navigate to the frontend directory from the project root:

```bash
cd frontend
npm install
```

#### Configure TypeScript

TypeScript should be installed as a project dependency in the frontend's package.json.

#### Start the Frontend Development Server
Navigate to frontend/src/ directory and run the script:

```bash
npm run dev
```

The frontend will typically be available at: `http://localhost:5173` (if using Vite)

## API Documentation

Detailed API documentation is available and maintained in Postman.

📎 [Refer to the full API documentation here](https://documenter.getpostman.com/view/37272934/2sB2cd5yna)

The documentation includes:

* All available endpoints
* Request/response examples
* Error formats
* Data structure descriptions

## Main API Endpoints

* `GET /shipments/:shipmentId/track` - View tracking information for a specific shipment
* `POST /shipments/:shipmentId/status` - Update the status of a shipment

## Prerequisites

Make sure the following are installed before running the project:

* Node.js (v14 or higher)
* npm
* MongoDB
* TypeScript (installed globally or as a project dependency)
* Postman (optional, for API testing)

## Testing the API

Once the server and MongoDB are running:

* Use `GET /shipments/:shipmentId/track` to view tracking info
* Use `POST /shipments/:shipmentId/status` to update shipment status
* Use Postman or any other API testing tool to interact with the endpoints

## Additional Information

### Backend Technologies
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- dotenv for environment variables

### Frontend Technologies
- React.js
- TypeScript
- Vite (for development and building)

### Why MongoDB?

MongoDB is chosen for this project due to its flexibility, performance, and seamless integration with Node.js and TypeScript. Key advantages include:

- **Schema Flexibility**: MongoDB allows dynamic and evolving data structures, which is useful when shipment records may vary or expand over time.
- **JSON-Like Documents**: Data is stored in a format that closely mirrors JavaScript objects, making development faster and cleaner in a Node.js environment.
- **High Performance**: Optimized for fast reads and writes, which is essential for real-time shipment status updates.
- **Scalability**: Easily handles large datasets and supports horizontal scaling through sharding.
- **Mongoose Integration**: Using Mongoose provides a structured, type-safe layer on top of MongoDB for better data modeling and validation.
