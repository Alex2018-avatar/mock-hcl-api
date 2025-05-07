export interface PersonPersonAttributes {
  bProfileAttrKey?: string;
  bProfileAttrValue?: string;
  contactInfoAttrKey?: string;
  contactInfoAttrValue?: string;
  pProfileAttrKey?: string;
  pProfileAttrValue?: string;
  key: string;
  attrKey: string;
  attrValue: string;
}
export interface JavaUtilMapEntry {
  value?: string;
  key: string;
}
export interface OrganizationIdentifierType {
  distinguishedName?: string;
  uniqueID?: string;
}
export interface PersonSingleContactUserDataField {
  value?: string;
  key: string;
}
export interface PersonPersonContextAttributeAttributeValue {
  storeId?: string;
  value: string[];
}
export interface PersonSingleContact {
  addressType?: string;
  addressLine?: string[];
  addressId?: string;
  personTitle?: string;
  primary?: string;
  email2?: string;
  email1?: string;
  city?: string;
  middleName?: string;
  geographicalTaxCode?: string;
  state?: string;
  internalOfficeAddress?: string;
  fax2?: string;
  fax1?: string;
  organizationIdentifier?: OrganizationIdentifierType;
  phone1Type?: string;
  nickName?: string;
  phone2Type?: string;
  phone2?: string;
  businessTitle?: string;
  phone1?: string;
  zipCode?: string;
  bestCallingTime?: string;
  mobilePhone1Country?: string;
  phone2Publish?: string;
  mobilePhone1?: string;
  personIdentifier?: PersonIdentifierType;
  organizationUnitName?: string;
  organizationName?: string;
  language?: string;
  firstName?: string;
  lastName?: string;
  resourceId?: string;
  resourceName?: string;
  geographicalShippingCode?: string;
  phone1Publish?: string;
  attributes?: JavaUtilMapEntry[];
  country?: string;
  userDataField?: PersonSingleContactUserDataField[];
}
export interface PersonPersonContextAttribute {
  attributeName: string;
  attributeValue: PersonPersonContextAttributeAttributeValue[];
}
export interface PersonIdentifierTypeExternalIdentifier {
  identifier?: string;
}
export interface PersonIdentifierType {
  distinguishedName?: string;
  uniqueID?: string;
  externalIdentifier?: PersonIdentifierTypeExternalIdentifier;
}
export interface ReceiveEmailPreference {
  storeID?: string;
  value: string;
}
export interface ReceiveSMSPreference {
  storeID?: string;
  value: string;
}
export interface UserDataField {
  key: string;
  value?: string;
}
export interface Person {
  accountStatus?: "Enabled" | "Disabled";
  addressId?: string;
  addressLine?: string[];
  addressType?: string;
  attributes?: PersonPersonAttributes[];
  bestCallingTime?: string;
  businessTitle?: string;
  challengeQuestion?: string;
  resourceId?: string;
  resourceName?: string;
  checkoutProfileUrl?: string;
  contactUrl?: string;
  city?: string;
  companyName?: string;
  contact?: PersonSingleContact[];
  contextAttribute?: PersonPersonContextAttribute[];
  country?: string;
  dateOfBirth?: string;
  departmentNumber?: string;
  description?: string;
  displayName?: string;
  distinguishedName?: string;
  email1?: string;
  email2?: string;
  employeeID?: string;
  employeeType?: string;
  fax1?: string;
  fax2?: string;
  firstName?: string;
  gender?: "Male" | "Female" | "Unspecified";
  geographicalShippingCode?: string;
  geographicalTaxCode?: string;
  hobbies?: string;
  /** @format int32 */
  householdSize?: string;
  // income?: ComIbmCommerceMemberFacadeDatatypesIncomeAmountType;
  internalOfficeAddress?: string;
  language?: string;
  lastName?: string;
  lastUpdate?: string;
  logonId?: string;
  manager?: string;
  maritalStatus?: string;
  middleName?: string;
  mobilePhone1?: string;
  mobilePhone1Country?: string;
  nickName?: string;
  /** @format int32 */
  numberOfChildren?: string;
  organizationDistinguishedName?: string;
  organizationIdentifier?: OrganizationIdentifierType;
  organizationName?: string;
  organizationUnitName?: string;
  orgizationId?: string;
  passwordExpired?: string;
  personIdentifier?: PersonIdentifierType;
  personTitle?: string;
  phone1?: string;
  phone1Publish?: string;
  phone1Type?: string;
  phone2?: string;
  phone2Publish?: string;
  phone2Type?: string;
  photoURI?: string;
  preferredCommunication?: string;
  preferredCurrency?: string;
  preferredDelivery?: string;
  preferredLanguage?: string;
  primary?: string;
  profileType?: "C" | "B";
  receiveEmailPreference?: ReceiveEmailPreference[];
  receiveSMSNotification?: string;
  receiveSMSPreference?: ReceiveSMSPreference[];
  registrationApprovalStatus?: string;
  registrationDateTime?: string;
  registrationStatus?: "Guest" | "RegisteredPerson";
  /** The name of the registrant's secretary or administrative assistant. */
  secretary?: string;
  state?: string;
  userDataField?: UserDataField[];
  userId?: string;
  zipCode?: string;
  x_findPhonesSelfcare?: {
    code?: string;
    message?: string;
    primaryPhone?: string;
    additionalPhone?: string;
  };
}
