import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/logger.js';
import { getAddressBook } from '../../services/shipping.js';
import { UserService } from '../../services/user.js';
import { UserHelper } from '../../helpers/UserHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class UserController {
  static async getUserHandler(req, res) {
    const { _folder, userType, logged } = req;
    const { xProcessFlow } = req.query
    const userIdFromCookie = req.cookies.USER_ID;
    const userId = req?.session?.userAuth?.userId || userIdFromCookie;
    const user = await UserService.getUserById(_folder, userId);
    const contact = await UserService.getAddressBook(_folder);

    if (xProcessFlow === 'b2bShipping') {
      const selfcareUserInfo = await UserHelper.getSelfCareUserInfo('full');
      return res.status(200).json(selfcareUserInfo);
    }

    if (logged) {
      res.status(200).json({
        ...user,
        // contact: [],
        contact,
      });
    } else {
      res.status(200).json({
        "organizationDistinguishedName": "o=default organization,o=root organization",
        "resourceName": "person",
        "userId": "37",
        "orgizationId": "-2000"
      });
    }
  }
} 