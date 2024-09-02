
class hasher {
  constructor() {
  }

  // Mã hóa thông điệp
  encrypt(message, key) {
    for (let i = 0; i < message.length; i++) {
      message[i] = String.fromCharCode(message[i].charCodeAt(0) + key[i % key.length].charCodeAt(0));
    }
    return message;
  }

  decrypt(encryptedMessage, key) {
    for (let i = 0; i < encryptedMessage.length; i++) {
      encryptedMessage[i] = String.fromCharCode(encryptedMessage[i].charCodeAt(0) - key[i % key.length].charCodeAt(0));
    }
    return encryptedMessage;
  }
}

module.exports = hasher;
