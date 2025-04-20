import mongoose, { Schema } from 'mongoose';
import Shipment from './shipment.models';
import { IShipment } from './shipment.models';

export interface IStatus {
  location: string;
  shipmentId: mongoose.Types.ObjectId | IShipment;
  status: 'Created' | 'PickedUp' | 'InTransit' | 'Delivered' | 'Cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

const statusSchema = new Schema<IStatus>(
  {
    shipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shipment',
      required: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Created', 'PickedUp', 'InTransit', 'Delivered', 'Cancelled'],
      default: 'Created',
    },
  },
  { timestamps: true }
);

statusSchema.post('save', async function (doc) {
  try {
    await Shipment.findByIdAndUpdate(
      doc.shipmentId,
      {
        $set: { status: doc.status },
        $push: { statusIdsByTimeline: doc._id },
      },
      { new: true }
    );
  } catch (error) {
    console.error('Error updating shipment after status save:', error);
  }
});

const Status = mongoose.model<IStatus>('Status', statusSchema);
export default Status;
