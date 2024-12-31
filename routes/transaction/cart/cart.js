import { Router } from 'express'
import { ShippingController } from '../../../controllers/cart/Shipping.js'

const cartRouter = Router()

// cartRouter.get('/:storeId/cart/@self/b2b/shipping_info', ShippingController.saveB2BShippingInfo)

export default cartRouter