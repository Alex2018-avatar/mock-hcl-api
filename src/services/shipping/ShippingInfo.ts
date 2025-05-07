import { TransactionError, ValidationError } from "@errors/AppError";
import { FsUtil } from "@utils/file/FsUtil";

class ShippingInfoService {
  static async getShippingInfoByType(store: string, type: string) {
    const fsPath = FsUtil.getFilePath(store, `address/${type}.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    // throw new ValidationError(`Error al leer el archivo`);

    // throw new TransactionError([
    //   {
    //     errorKey: "_INF_TEXT",
    //     errorParameters:
    //       "Nuestra tienda aún no está disponible para tus compras. <b>Te invitamos a adquirir tus productos en los canales habituales.</b>",
    //     errorMessage:
    //       "Nuestra tienda aún no está disponible para tus compras. <b>Te invitamos a adquirir tus productos en los canales habituales.</b>",
    //     errorCode: "ERR_LOGIN_CODE_34",
    //   },
    // ]);
    return data;
  }

  static async getAddressInfoByType(store: string, type: string) {
    const fsPath = FsUtil.getFilePath(store, `address-info/${type}.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }
}

export default ShippingInfoService;
