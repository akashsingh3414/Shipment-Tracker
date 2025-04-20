import express from 'express'
import { trackShipment, updateShipmentStatus } from '../controllers/shipment.controllers'

const shipmentRouter = express.Router()

shipmentRouter.get('/:shipmentId/track', trackShipment)
shipmentRouter.post('/:shipmentId/status', updateShipmentStatus)

export default shipmentRouter
