const as = require('./lib/AuthenticationServer.js');
const tgs = require('./lib/TicketGrantingServer.js');
const ss = require('./lib/ServiceServer.js');
const hasher = require('./lib/HashHandler.js');

let username = 'viet';
let as_message = as.authenticateUser(username);
console.log('as_message: ', as_message);

let tgs_session_key = hasher.decrypt(as_message.tgs_session_key, process.env.CLIENT_SECRET_KEY);
let authenticator = hasher.encrypt(username + "//" + (Date.now() + 1000 * 60 * 60).toString(), tgs_session_key);

let req_message = {
    tgt: as_message.tgt,
    service_id: 'service_id',
}

let tgs_message = tgs.validateTGT(req_message, authenticator);
console.log('tgs_message: ', tgs_message);

let client_to_server_ticket = tgs_message.client_to_server_ticket;

authenticator = hasher.encrypt(username + "//" + (Date.now() + 1000 * 60 * 60).toString(), tgs_message.client_server_session_key);

let ss_message = ss.validateClientToServerTicket(client_to_server_ticket, authenticator);
console.log('ss_message: ', ss_message);