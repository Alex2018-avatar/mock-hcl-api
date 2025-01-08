import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/logger.js';
import { getAddressBook } from '../../services/shipping.js';
import { UserService } from '../../services/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class UserController {
  static async getUserHandler(req, res) {
    const { _folder, userType, logged } = req;
    const userIdFromCookie = req.cookies.USER_ID;
    const userId = req?.session?.userAuth?.userId || userIdFromCookie;
    const user = await UserService.getUserById(_folder, userId);
    const contact = await UserService.getAddressBook(_folder);

    if (logged) {
      res.status(200).json({
        ...user,
        contact: [],
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