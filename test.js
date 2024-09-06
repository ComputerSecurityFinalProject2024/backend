const as = require('./lib/AuthenticationServer.js');
const tgs = require('./lib/TicketGrantingServer.js');
const ss = require('./lib/ServiceServer.js');
const hasher = require('./lib/HashHandler.js');

const tgt = 'viet//wPWkODvBBJmxzqQg//' + (Date.now() + 1000 * 60 * 60).toString();
const encryptedTgt = hasher.encrypt(tgt, 'AbcdefGhijklmnop');
const authenticator = hasher.encrypt('viet//' + (Date.now() + 1000 * 60 * 60).toString(), 'wPWkODvBBJmxzqQg');
console.log(tgt);   
console.log(encryptedTgt);
console.log(authenticator);