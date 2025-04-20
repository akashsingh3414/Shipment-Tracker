import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrackingInputPage from './pages/TrackingInputPage';
import TrackingResultPage from './pages/TrackingResultPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TrackingInputPage />} />
            <Route path="/track-shipment" element={<TrackingInputPage />} />
            <Route path="/tracking-result/:shipmentId" element={<TrackingResultPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
