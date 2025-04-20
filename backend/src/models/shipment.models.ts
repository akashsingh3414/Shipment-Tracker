import mongoose, { Document, Schema } from 'mongoose';

export interface IShipment extends Document {
  origin: string;
  destination: string;
  status: string;
  statusIdsByTimeline: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const shipmentSchema = new Schema<IShipment>(
  {
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Created', 'PickedUp', 'InTransit', 'Delivered', 'Cancelled'],
      default: 'Created',
    },
    statusIdsByTimeline: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Status',
        required: true
      },
    ],
  },
  { timestamps: true }
);

const Shipment = mongoose.model<IShipment>('Shipment', shipmentSchema);

export default Shipment;
