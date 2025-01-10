export class UserHelper {
  static async getSelfCareUserInfo(data = "full") {
    if (data === "full") {
      return {
        "x_findPhonesSelfcare": {
          "primaryPhone": "1111111111",
          "code": "SUCCESS",
          "additionalPhone": "2222222222"
        }
      }
    }

    if (data === "empty") {
      return {
        "x_findPhonesSelfcare": {
          "code": "FETCH_USERPHONE_EMPTY"
        },
      }
    }

    if (data === "main") {
      return {
        "x_findPhonesSelfcare": {
          "primaryPhone": "1111111111",
          "code": "SUCCESS"
        },
      }
    }

    if (data === "secondary") {
      return {
        "x_findPhonesSelfcare": {
          "code": "SUCCESS",
          "additionalPhone": "2222222222"
        },
      }

    }

    return {
      "x_findPhonesSelfcare": {
        "code": "FETCH_USERPHONE_GENERIC_ERROR",
        "message": "Inténtalo más tarde|Algo salió mal al procesar tu solicitud"
      },
    };
  }
}