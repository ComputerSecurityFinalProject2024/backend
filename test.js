const RSA = require('./lib/rsa');

const rsa = new RSA();

const message = "Hello, RSA";

// Mã hóa thông điệp
const encryptedMessage = rsa.encrypt(message);
console.log("Encrypted Message:", encryptedMessage);

// Giải mã thông điệp
const decryptedMessage = rsa.decrypt(encryptedMessage);
console.log("Decrypted Message:", decryptedMessage);
