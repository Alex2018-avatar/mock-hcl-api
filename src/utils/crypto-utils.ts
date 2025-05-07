/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2025.
 */

import { CRYPTO_IV } from "@constants/crypto";

export const encryptAES = async (plainText: string) => {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(process.env.KEY_CRYPTO);
  const ivBytes = encoder.encode(CRYPTO_IV);
  const data = encoder.encode(plainText);
  const params = { name: "AES-CBC" };
  // Derive key e IV
  const hashedKey = await crypto.subtle.digest("SHA-256", keyBytes);
  const hashedIV = await crypto.subtle.digest("SHA-256", ivBytes);
  const iv = new Uint8Array(hashedIV).slice(0, 16);

  const key = await crypto.subtle.importKey("raw", hashedKey, params, false, [
    "encrypt",
  ]);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { ...params, iv },
    key,
    data
  );

  // convert ArrayBuffer to hex string
  const byteArray = new Uint8Array(encryptedBuffer);
  const hex = [...byteArray]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex;
};

const generateIVFromText = async (ivText: string): Promise<Uint8Array> => {
  const encoder = new TextEncoder();
  const ivData = encoder.encode(ivText);
  const hash = await crypto.subtle.digest("SHA-256", ivData);
  return new Uint8Array(hash).slice(0, 16); // cut to 16 bytes
};

export const decryptAES = async (cipherHex: any) => {
  const iv = await generateIVFromText(CRYPTO_IV);
  const params = { name: "AES-CBC" };
  const encoder = new TextEncoder();
  const keyData = encoder.encode(process.env.KEY_CRYPTO);
  const hashBuffer = await crypto.subtle.digest("SHA-256", keyData);

  const key = await crypto.subtle.importKey("raw", hashBuffer, params, false, [
    "decrypt",
  ]);

  const cipherBytes = new Uint8Array(
    cipherHex.match(/.{2}/g).map((byte: any) => parseInt(byte, 16))
  );

  try {
    const decrypted = await crypto.subtle.decrypt(
      { ...params, iv },
      key,
      cipherBytes
    );

    const decoder = new TextDecoder();
    const plainText = decoder.decode(decrypted);
    return plainText;
  } catch (e) {
    console.error("Error al desencriptar:", e);
    return null;
  }
};

export const encrypt = (textToEncrypt: string) => {
  const enable = process.env.ENABLE_ENCRYPTION === "true";
  return enable ? encryptAES(textToEncrypt) : textToEncrypt;
};

export const decrypt = (textToDecrypt: string) => {
  const enable = process.env.ENABLE_ENCRYPTION === "true";
  return enable ? decryptAES(textToDecrypt) : textToDecrypt;
};
