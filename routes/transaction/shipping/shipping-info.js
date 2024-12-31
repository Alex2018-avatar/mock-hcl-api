import { Router } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { addFolder } from '../../../middleware/auth.js';
import { ShippingInfoController } from '../../../controllers/shipping/ShippingInfo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shippingInfoRouter = Router();

shippingInfoRouter.get('/:storeId/address_info/:type', addFolder, ShippingInfoController.getShippingInfoByType);
// /wcs/resources/store/9701/person/addressInfoByType/BLOQUE_O_INTERIOR
shippingInfoRouter.get('/:storeId/person/addressInfoByType/:addressType', addFolder, ShippingInfoController.getAddressInfoByType);
shippingInfoRouter.post('/:storeId/cart/@self/b2b/shipping_info', addFolder, ShippingInfoController.saveB2BShippingInfo)

export default shippingInfoRouter;