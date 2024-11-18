import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { generateWCSError } from "../../../utils/error-utils.js";

const userRouter = express.Router();
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// /wcs/resources/store/11/person/@self?langId=-1
userRouter.get("/:storeId/person/@self", async (req, res) => {
  const { storeId, emsName } = req.params;
  console.log("emsName: ", req.body);
  res.status(200).json({
    lastName: "Ramos",
    registrationStatus: "RegisteredPerson",
    preferredLanguage: "es_ES",
    resourceId:
      "https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/11/person/@self?langId=-1",
    preferredCurrency: "USD",
    distinguishedName:
      "uid=demo@gmail.com,o=default organization,o=root organization",
    orgizationId: "-2000",
    addressId: "3074457362980024554",
    accountStatus: "Enabled",
    email1: "demo@gmail.com",
    profileType: "Consumer",
    challengeQuestion: "-",
    nickName: "demo@gmail.com",
    addressType: "ShippingAndBilling",
    resourceName: "person",
    userId: "1002",
    registrationDateTime: "2024-10-18T17:34:12.767Z",
    organizationDistinguishedName: "o=default organization,o=root organization",
    firstName: "Juan",
    logonId: "demo@gmail.com",
    receiveEmailPreference: [
      {
        storeID: "11",
        value: "true",
      },
    ],
    lastUpdate: "2024-10-18T17:34:12.767Z",
    registrationApprovalStatus: "Approved",
    passwordExpired: "false",
    primary: "true",
    receiveSMSPreference: [
      {
        storeID: "11",
        value: "false",
      },
    ],
    contact: [
      {
        "lastName": "grillo",
        "zipCode": "12345",
        "country": "Peru",
        "city": "Lima",
        "nickName": "casa",
        "addressType": "ShippingAndBilling",
        "addressLine": [
          "mi casa ",
          "cerca del metro",
          ""
        ],
        "addressId": "3074457362951363813",
        "phone1": "87878878",
        "firstName": "pepe",
        "email1": "poxx2@gmail.com",
        "state": "Lima",
        "primary": "false"
      }
    ],
  });
});

// /store/{storeId}/person/{userId}
userRouter.get("/:storeId/person/:userId", async (req, res) => {
  const { profileName } = req.query;
  if (profileName) {
    res.status(200).json({
      rolesWithDetails: [
        {
          displayName: "Cliente registrado",
          roleId: "-29",
          name: "Registered Customer",
          description: null,
        },
      ],
      displayName: "",
      userId: "1002",
    });
  } else {
    console.log("Ruta completa: ", req.originalUrl);
    res.status(200).json({
      manager: "",
      mobilePhone1: "",
      mobilePhone1Country: "",
      parentMemberId: "-2000",
      phone2: "",
      dn: "uid=ipro.test.2090@gmail.com,o=default organization,o=root organization",
      employeeId: "",
      logonPassword: "************",
      parentOrgName: "Default Organization",
      userId: "1002",
      phone1: "9835146991",
      email2: "",
      email1: "ipro.test.2090@gmail.com",
      employeeType: "",
      secretary: "",
      logonId: "ipro.test.2090@gmail.com",
      departmentNumber: "",
      registrationUpdate: "9 de octubre de 2024 16:17",
      fax2: "",
      registration: "9 de octubre de 2024 16:17",
      fax1: "",
      lastSession: "18 de octubre de 2024 14:17",
      logonPasswordVerify: "************",

    });
  }
});

userRouter.put("/:storeId/person/@self", async (req, res) => {
  const { storeId, emsName } = req.params;
  const { phone1, phone2, fax2,
    resetPassword, xcred_logonPasswordOld, xcred_validationCode,
    xcred_logonPasswordVerify
  } = req.body;

  // RESET PASSWORD
  if (resetPassword) {
    if (xcred_validationCode) {
      // ERROR WAY
      // res.status(400).json({
      //   "errors": [
      //     {
      //       "errorKey": "_ERR_CMD_INVALID_PARAM",
      //       "errorParameters": "validationCode",
      //       "errorMessage": "The value of the parameter validationCode is not correct.",
      //       "errorCode": "2190"
      //     }
      //   ]
      // });

      // SUCCESS WAY
      res.status(200).json({ "resourceName": "person", "userId": "3" });
    } else {
      // CAMBIAR PASSWORD MI CUENTA
      if (xcred_logonPasswordOld && xcred_logonPasswordVerify) {
        // SUCCESS WAY
        res.status(200).json({ "resourceName": "person", "userId": "3" });
        // ERROR WAY
        // TODO: Agregar error
      } else {
        res.status(200).json({ "resourceName": "person", "userId": "3" });
      }
    }
  } else {
    // if (!phone1 || !fax2)
    //   return res.status(400).json({
    //     errors: [
    //       {
    //         errorKey: "_INF_TEXT",
    //         errorParameters:
    //           "No pudimos actualizar tus datos, ingresa más tarde.",
    //         errorMessage: "No pudimos actualizar tus datos, ingresa más tarde.",
    //         errorCode: "ERR_GENERAL",
    //       },
    //     ],
    //   });
    // res.status(200).json({
    //   resourceName: "person",
    //   userId: "18004",
    //   addressId: "3074457375142411703",
    // });
    res.status(400).json({
      "errors": [
        {
          "errorKey": "_ERROR_LOGIN_CUSTOMER_SEARCH_NOT_REGISTERED",
          "errorParameters": "",
          "errorMessage": "The specified logon ID or password are not correct. Verify the information provided and log in again.",
          "errorCode": "1001"
        }
      ]
    });
  }
});

// /wcs/resources/store/9701/person?updateCookies=true
userRouter.post("/:storeId/person", async (req, res) => {
  const { storeId } = req.params;

  await delay(1200);

  if (storeId === "9701") {
    const { xcont_paramPreValidation } = req.body;
    const commonErrorProperties = {
      "errorParameters": "error",
      "errorMessage": "error message",
    }
    // REGISTER CUSTOMER
    if (xcont_paramPreValidation === "true") {
      // SUCCESS WAY - enable address form
      // res.status(201).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_NOT_REGISTERED", "0000"));

      // _ERROR_REGISTER_CUSTOMER_VALIDATE_CHANNEL_NOT_CORRESPOND
      //res.status(201).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_VALIDATE_CHANNEL_NOT_CORRESPOND", "1003"));

      // _ERROR_REGISTER_CUSTOMER_SEARCH_REQUIRED_FIELDS
      // res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_REQUIRED_FIELDS", "1003"));

      // _ERROR_REGISTER_CUSTOMER_VALIDATE_ERROR_LEGADO
      // res.status(201).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_VALIDATE_ERROR_LEGADO", "1003"));

      // _ERROR_REGISTER_CUSTOMER_VALIDATE_ERROR
      // res.status(500).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_VALIDATE_ERROR", "1001"));

      // _ERROR_REGISTER_CUSTOMER_VALIDATE_REGISTERED
      //        "errorMessage": "Usuario ya registrado.",
      // res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_VALIDATE_REGISTERED", "1003"));

      // _ERROR_REGISTER_CUSTOMER_SEARCH_REGISTERED
      // res.status(500).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_REGISTERED", "1003"));

      // _ERROR_REGISTER_CUSTOMER_SEARCH_CHANNEL_NOT_CORRESPOND
      // res.status(500).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_CHANNEL_NOT_CORRESPOND", "1003"));

      // _ERROR_REGISTER_CUSTOMER_SEARCH_CHANNEL_NOT_CORRESPOND
      // res.status(500).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_REQUIRED_FIELDS", "1003"));

      // _ERROR_REGISTER_CUSTOMER_SEARCH_ERROR
      // res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_ERROR", "1001"));

      // _ERROR_REGISTER_CUSTOMER_SEARCH_NOT_REGISTERED
      res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_NOT_REGISTERED", "0000"));

      // _ERROR_REGISTER_CUSTOMER_SAVE_CHANNEL_NOT_CORRESPOND
      // res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SAVE_CHANNEL_NOT_CORRESPOND", "1005"));

      // _ERROR_REGISTER_CUSTOMER_SAVE_REQUIRED_FIELDS
      // res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SAVE_REQUIRED_FIELDS", "1005"));

      // _ERROR_REGISTER_CUSTOMER_SAVE_ERROR_LEGADO
      // res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SAVE_ERROR_LEGADO", "1005"));

    } else {
      res.status(201).json({
        "resourceName": "person",
        "userId": "9011",
        "addressId": "3074457351658731456"
      });
      // res.status(400).json(generateWCSError("_ERROR_REGISTER_CUSTOMER_SEARCH_REQUIRED_FIELDS", "1003"));
    }
  } else {
    res.status(201).json({
      message: "Hello World",
    });
  }
});

export default userRouter;
