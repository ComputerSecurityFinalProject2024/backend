
class HashHandler {
  constructor() {
  }

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

  generateKey() {
    let key = '';
    for (let i = 0; i < 17; i++) {
      key += String.fromCharCode(Math.floor(Math.random() * 256));
    }
    return key;
  }
}

module.exports = new HashHandler;
