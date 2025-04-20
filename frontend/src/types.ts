export interface IShipment {
    _id: string;
    origin: string;
    destination: string;
    status: 'Created' | 'PickedUp' | 'InTransit' | 'Delivered' | 'Cancelled';
    statusIdsByTimeline: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
export interface IStatus {
    _id: string;
    location: string;
    shipmentId: string;
    status: 'Created' | 'PickedUp' | 'InTransit' | 'Delivered' | 'Cancelled';
    createdAt?: Date;
    updatedAt?: Date;
}