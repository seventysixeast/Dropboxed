/*import CryptoJS from 'crypto-js';

export function encryptToken(token, secretKey) {
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  return encryptedToken;
}

export function decryptToken(encryptedToken, secretKey) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
}
*/
import { fromByteArray, toByteArray } from 'base64-js';

export function encryptToken(token) {
  // Convert token to Uint8Array
  const tokenBytes = new TextEncoder().encode(token);
  // Encode token to Base64
  const encodedToken = fromByteArray(tokenBytes);
  return encodedToken;
}

export function decryptToken(encodedToken) {
  // Decode Base64 to Uint8Array
  const tokenBytes = toByteArray(encodedToken);
  // Convert Uint8Array to token string
  const token = new TextDecoder().decode(tokenBytes);
  return token;
}
