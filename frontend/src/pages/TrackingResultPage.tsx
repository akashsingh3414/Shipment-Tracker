import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShipmentDetails from "../components/ShipmentDetails";
import StatusTimeline from "../components/StatusTimeline";
import axios from "axios";
import type { IShipment, IStatus } from "../types";
import { Package, AlertCircle, Loader2 } from "lucide-react";

const TrackingResultPage = () => {
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const [shipment, setShipment] = useState<IShipment | null>(null);
  const [statusUpdates, setStatusUpdates] = useState<IStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackingData = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ shipment: IShipment; statuses: IStatus[] }>(
          `/shipments/${shipmentId}/track`
        );
        setStatusUpdates(res.data.statuses);
        setShipment(res.data.shipment);
        setError(null);
      } catch (err: any) {
        const errorData = err.response?.data;
        const status = err.response?.status;

        if (status === 400) {
          setError(errorData?.message || "Invalid Shipment Id");
        } else if (status === 404) {
          setError(errorData?.message || "Shipment not found.");
        } else {
          setError("Failed to retrieve tracking information. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (shipmentId) {
      fetchTrackingData();
    }
  }, [shipmentId, navigate]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <h3 className="text-xl font-medium text-gray-700">Loading tracking information...</h3>
      </div>
    );
  }

  if (error || !shipment) {
    const handleGoBack = () => {
      navigate("/")
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white border rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Tracking Details
            </h2>
          </div>
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="bg-red-50 rounded-full p-4 mb-4">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Unable to Track Shipment</h3>
            <p className="text-red-600 text-center mb-6 max-w-md">{error}</p>
            <div className="flex gap-4">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ← Back to tracking page
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center border">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No Status Updates Available</h3>
          <p className="text-gray-500 mt-2">Please check your tracking number and try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ShipmentDetails shipment={shipment} />
      <div className="mt-12">
        {statusUpdates.length > 0 ? (
          <StatusTimeline statusUpdates={statusUpdates} />
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No Status Updates Yet</h3>
            <p className="text-gray-500 mt-2">Status updates will appear here once your shipment begins its journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingResultPage;
