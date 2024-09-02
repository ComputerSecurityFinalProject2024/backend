const NodeRSA = require('node-rsa');

class RSA {
  constructor() {
    // Tạo cặp khóa RSA
    this.key = new NodeRSA({ b: 2048 });
  }

  // Mã hóa thông điệp
  encrypt(message) {
    return this.key.encrypt(message, 'base64');
  }

  // Giải mã thông điệp
  decrypt(encryptedMessage) {
    return this.key.decrypt(encryptedMessage, 'utf8');
  }
}

module.exports = RSA;
