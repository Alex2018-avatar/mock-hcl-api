import { Router } from 'express'
import { CustomClaroController } from '../../../controllers/custom/customClaro.js'
import { addFolder } from '../../../middleware/auth.js'

const customClaroRouter = Router()

// cartRouter.get('/:storeId/cart/@self/b2b/shipping_info', ShippingController.saveB2BShippingInfo)
customClaroRouter.post('/:storeId/financing/customerAccountList', addFolder, CustomClaroController.getClaroCupoHandler)
customClaroRouter.post('/:storeId/validar/validarCredito', addFolder, CustomClaroController.getClaroReserveAndFinancialHandler)
customClaroRouter.post('/:storeId/cuotas/financialTerm', addFolder, CustomClaroController.getClaroFinancialTermHandler)
customClaroRouter.post('/:storeId/home/validateHomeAddress', addFolder, CustomClaroController.getClaroValidateHomeAddressHandler)
customClaroRouter.post('/:storeId/cart/@self/payment_instruction/punchoutPaymentInfo', addFolder, CustomClaroController.getB2BGatewayUrlHandler)

export default customClaroRouter