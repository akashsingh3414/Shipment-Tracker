import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShipmentIdForm = () => {
  const shipmentId = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean | false>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  
    if (!shipmentId.current || shipmentId.current.value.trim() === "") {
      setError("Please enter a valid shipment Id.");
      setLoading(false);
      return;
    }
  
    setError(null);
    navigate(`/tracking-result/${shipmentId.current.value}`);
    setLoading(false);
  };
  

  return (
    <div className='w-full max-w-sm bg-gray-100 p-6 rounded-lg'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <input 
          type="text" 
          placeholder="Please Enter Shipment Id"
          ref={shipmentId}
          className='border border-black m-2 p-1.5 rounded w-full'
        />
        {loading 
        ? <button disabled className='border border-black m-2 p-1.5 px-4 rounded bg-gray-700 text-white w-full'>Loading...</button> 
        : <button type="submit" className='border border-black m-2 p-1.5 px-4 rounded bg-black text-white hover:bg-blue-700 hover:text-white w-full'>Track Status</button>
        }
      </form>
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default ShipmentIdForm;
