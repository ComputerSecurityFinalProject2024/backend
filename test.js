const as = require('./lib/AuthenticationServer.js');
const tgs = require('./lib/TicketGrantingServer.js');
const ss = require('./lib/ServiceServer.js');
const hasher = require('./lib/HashHandler.js');

const TGS_secret_key = hasher.generateKey();
const Service_secret_key = hasher.generateKey();
const TGS_session_key = hasher.generateKey() + "//" + (Date.now() + 1000 * 60 * 60 * 24 * 7).toString();

const tgt = hasher.encrypt("viet//" + TGS_session_key, TGS_secret_key);
const authenticator = hasher.encrypt("viet//" + (Date.now() + 1000 * 60 * 60 * 24 * 7).toString(), "qLlCfXLRXwvlwefr");

console.log('tgt:', tgt);
console.log('authenticator:', authenticator);
console.log('TGS_session_key:', TGS_session_key);
console.log('TGS_secret_key:', TGS_secret_key);
console.log('Service_secret_key:', Service_secret_key);

