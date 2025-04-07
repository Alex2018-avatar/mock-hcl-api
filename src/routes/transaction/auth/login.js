import express from 'express';
import { addFolder } from '../../../middleware/auth.js';
import { AuthController } from '../../../controllers/auth/auth.js';

const authRouter = express.Router()

// /resources/store/9701/loginidentity?updateCookies=true
authRouter.post('/:storeId/loginidentity', addFolder, AuthController.loginIdentity);
authRouter.post('/:storeId/b2b/loginidentity', addFolder, AuthController.b2bLoginIdentity);
authRouter.post('/:storeId/guestidentity', addFolder, AuthController.guestidentity);
authRouter.delete('/:storeId/loginidentity/@self', addFolder, AuthController.logOut);
authRouter.post('/:storeId/syncRegister/registerCommerce', addFolder, AuthController.syncRegister);

export default authRouter;
