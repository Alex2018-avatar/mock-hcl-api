import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";

const userRouter = express.Router();
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const { phone1, phone2, fax2 } = req.body;
  if (!phone1 || !fax2)
    return res.status(400).json({
      errors: [
        {
          errorKey: "_INF_TEXT",
          errorParameters:
            "No pudimos actualizar tus datos, ingresa más tarde.",
          errorMessage: "No pudimos actualizar tus datos, ingresa más tarde.",
          errorCode: "ERR_GENERAL",
        },
      ],
    });
  res.status(200).json({
    resourceName: "person",
    userId: "18004",
    addressId: "3074457375142411703",
  });
});

export default userRouter;
