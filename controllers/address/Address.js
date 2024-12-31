export class AddressController {


  static async getAddressInfoByType(req, res) {
    const { storeId, addressType } = req.params;
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(__dirname, `../../data/${_folder}/address/address-info/${addressType}.json`);
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    res.status(200).json(response);
  }
}