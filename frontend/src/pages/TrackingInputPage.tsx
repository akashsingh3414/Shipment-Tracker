import ShipmentIdForm from "../components/ShipmentIdForm";

const TrackingInputPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-semibold text-gray-800 mb-4">Track Your Shipment</h1>
      <p className="text-lg text-gray-600 mb-8">Please enter your shipment ID below to check its status.</p>
      <ShipmentIdForm />
    </div>
  );
};

export default TrackingInputPage;
