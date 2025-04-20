import Shipment from "../models/shipment.models";
import Status from "../models/status.models";
import { Request, Response } from 'express';
import mongoose from "mongoose";

export const trackShipment = async (req: Request, res: Response) => {
  try {
    const shipmentId = req.params.shipmentId;

    if (!mongoose.Types.ObjectId.isValid(shipmentId)) {
      return res.status(400).json({ message: "Invalid shipment ID format" });
    }

    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    const statuses = await Status.find({ shipmentId }).sort({ createdAt: 1 });

    res.status(200).json({ message: "Status fetched successfully", shipment, statuses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error Occurred" });
  }
};


export const updateShipmentStatus = async (req: Request, res: Response) => {
  try {
    const shipmentId = req.params.shipmentId;
    const { location, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(shipmentId)) {
      return res.status(400).json({ message: "Invalid shipment ID format" });
    }

    if (!shipmentId || !location || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    const newStatus = new Status({
      shipmentId,
      location,
      status,
    });

    await newStatus.save();

    res.status(201).json({ message: "Shipment status updated successfully", newStatus });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error Occurred" });
  }
};
