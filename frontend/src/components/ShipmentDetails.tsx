import { useState } from "react";
import type { IShipment } from "../types";
import { Calendar, MapPin, Package, Copy, CircleCheck } from "lucide-react";

interface shipmentDetailsProps {
  shipment: IShipment;
}

const ShipmentDetails = ({ shipment }: shipmentDetailsProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setCopied(false);
    }
  };

  const getStatusBadge = () => {
    const status = shipment.status?.toLowerCase() || "";

    switch (status) {
      case "created":
        return <Badge color="blue" text="Created" />;
      case "pickedup":
        return <Badge color="yellow" text="Picked Up" />;
      case "intransit":
        return <Badge color="purple" text="In Transit" />;
      case "delivered":
        return <Badge color="green" text="Delivered" />;
      case "cancelled":
        return <Badge color="red" text="Cancelled" />;
      default:
        return <Badge color="gray" text="Unknown" />;
    }
  };

  const Badge = ({ color, text }: { color: string; text: string }) => (
    <span className={`bg-${color}-100 text-${color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {text}
    </span>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex items-center">
          <Package className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Tracking ID:
            <span className="ml-2 font-mono">{shipment._id}</span>
          </h2>
          <button
            onClick={() => copyToClipboard(shipment._id)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy tracking ID"
          >
            {copied ? (
              <CircleCheck className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <div>{getStatusBadge()}</div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Origin</h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800">{shipment.origin}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Destination</h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800">{shipment.destination}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Created Date</h3>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-gray-800">{formatDate(shipment.createdAt as Date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
