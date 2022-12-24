import CryptoJS from 'crypto-js';

function encrypt(string, password) {
  return CryptoJS.AES.encrypt(string, password).toString();
}

function decrypt(string, password) {
  return CryptoJS.AES.decrypt(string, password).toString(CryptoJS.enc.Utf8);
}

function generateHash(string) {
  return CryptoJS.SHA256(string).toString();
}

function verifyHash(string, hash) {
  return generateHash(string) === hash;
}

export { encrypt, decrypt, generateHash, verifyHash };
