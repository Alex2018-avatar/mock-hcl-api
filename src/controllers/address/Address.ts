import { Request, Response } from "express";
import Address from "../../services/address/Address";

class AddressController {
  static async getAddressBook(req: Request, res: Response) {
    const _folder = req.storeIdentifier as string;
    const getAddressBook = await Address.getAddressBook(_folder);
    res.status(200).json(getAddressBook);
  }

  static async getAddressInfoByType(req, res) {
    const { storeId, addressType } = req.params;
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(
      __dirname,
      `../../data/${_folder}/address/address-info/${addressType}.json`
    );
    const data = await fsPromises.readFile(filePath, "utf8");
    const response = JSON.parse(data);
    res.status(200).json(response);
  }
}
export default AddressController;
