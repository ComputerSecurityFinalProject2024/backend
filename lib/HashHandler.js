
class HashHandler {
  constructor() {
  }

  rotateRight(x, y) {
    if (x == '/') return '%';
    
    let m = 26, l = 1, r = 1;
    let xv = x.charCodeAt(0), yv = y.charCodeAt(0);
    if (xv >= '0'.charCodeAt(0) && xv <= '9'.charCodeAt(0)) {
      l = '0'.charCodeAt(0);
      r = '9'.charCodeAt(0);
      m = 10;
    } else if (xv >= 'a'.charCodeAt(0) && xv <= 'z'.charCodeAt(0)) {
      l = 'a'.charCodeAt(0);
      r = 'z'.charCodeAt(0);
    } else if (xv >= 'A'.charCodeAt(0) && xv <= 'Z'.charCodeAt(0)) {
      l = 'A'.charCodeAt(0);
      r = 'Z'.charCodeAt(0);
    }

    let t = xv + (yv % m);

    return String.fromCharCode(l + (t - l) % m);
  }

  rotateLeft(x, y) {
    if (x == '%') return '/';
    
    let m = 26, l = 1, r = 1;
    let xv = x.charCodeAt(0), yv = y.charCodeAt(0);
    if (xv >= '0'.charCodeAt(0) && xv <= '9'.charCodeAt(0)) {
      l = '0'.charCodeAt(0);
      r = '9'.charCodeAt(0);
      m = 10;
    } else if (xv >= 'a'.charCodeAt(0) && xv <= 'z'.charCodeAt(0)) {
      l = 'a'.charCodeAt(0);
      r = 'z'.charCodeAt(0);
    } else if (xv >= 'A'.charCodeAt(0) && xv <= 'Z'.charCodeAt(0)) {
      l = 'A'.charCodeAt(0);
      r = 'Z'.charCodeAt(0);
    }

    let t = xv - (yv % m);
    return String.fromCharCode(t + m * (t < l));
  }

  encrypt(message, key) {
    let ret = ''
    for (let i = 0; i < message.length; i++) {
      ret += this.rotateRight(message[i], key[i % key.length]);
    }
    return ret;
  }

  decrypt(encryptedMessage, key) {
    let ret = ''
    for (let i = 0; i < encryptedMessage.length; i++) {
      ret += this.rotateLeft(encryptedMessage[i], key[i % key.length]);
    }
    return ret;
  }

  generateKey() {
    let key = '';
    for (let i = 0; i < 16; ++i) {
      let t = Math.round(Math.random() * 2) % 2;
      if (t != 0) {
        key += String.fromCharCode(Math.round(Math.random() * 26) % 26 + 'a'.charCodeAt(0));
      } else {
        key += String.fromCharCode(Math.round(Math.random() * 26) % 26 + 'A'.charCodeAt(0));
      }
    }
    return key;
  }
}

module.exports = new HashHandler;
