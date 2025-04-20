import express from 'express';
import shipmentRouter from './routes/shipment.routes';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/shipments', shipmentRouter);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    if(!process.env.MONGODB_URI) return;
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`connect to mongodb: ${conn.connection.host}`)
  } catch (error) {
    console.log('Unable to connect to mongodb')
  }
});
