import mongoose from "mongoose";
import Shipment from "./models/shipment.models";
import Status from "./models/status.models";
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) return;
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Shipment.deleteMany({});
    await Status.deleteMany({});
    console.log("Old data cleared");

    const shipmentsData = [
      {
        origin: "Delhi",
        destination: "Mumbai",
      },
      {
        origin: "Ghaziabad",
        destination: "Lucknow",
      },
    ];

    const shipments = [];

    for (const data of shipmentsData) {
      const shipment = new Shipment(data);
      await shipment.save();
      shipments.push(shipment);
    }

    const statuses = [];
    const allUpdates = [
      [
        {
          location: "Delhi",
          status: "Created",
        },
        {
          location: "Noida",
          status: "InTransit",
        },
        {
          location: "Mumbai",
          status: "Delivered",
        },
      ],
      [
        {
          location: "Ghaziabad",
          status: "Created",
        },
        {
          location: "Kanpur",
          status: "InTransit",
        },
        {
          location: "Allahabad",
          status: "InTransit",
        },
        {
          location: "Lucknow",
          status: "Delivered",
        },
      ],
    ];

    for (let i = 0; i < shipments.length; i++) {
      const shipment = shipments[i];
      const statusIds: mongoose.Types.ObjectId[] = [];
      const updates = allUpdates[i] || allUpdates[0]; 

      for (const update of updates) {
        const statusDoc = new Status({
          shipmentId: shipment._id,
          location: update.location,
          status: update.status,
        });
        await statusDoc.save();
        statuses.push(statusDoc);
        statusIds.push(statusDoc._id);
      }

      shipment.statusIdsByTimeline = statusIds;
      await shipment.save();
      console.log(shipment);
    }

    console.log("Status updates added");
    console.log("Database seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();