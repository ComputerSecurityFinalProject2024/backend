const hasher = require('./HashHandler.js');
require('dotenv').config();

const TGS_session_key = 'ChZhsEICUudpLpBX';
const TGS_secret_key = 'TFxTQGRDOfjXXUBR';
const Service_secret_key = 'CZNeygLFKKLhpArK';

class ServiceServer {
    constructor() {
    }

    validateClientToServerTicket(client_to_server_ticket, authenticator) {
        console.log('client_to_server_ticket:', client_to_server_ticket);
        ///TODO: Get Service_secret_key from database
        let tmp_obj = hasher.decrypt(client_to_server_ticket, Service_secret_key);
        client_to_server_ticket = tmp_obj.split('//');
        client_to_server_ticket = {
            username: client_to_server_ticket[0],
            valid_until: parseInt(client_to_server_ticket[1]),
            session_key: client_to_server_ticket[2],
        };

        // console.log('client_to_server_ticket: ', client_to_server_ticket);

        tmp_obj = hasher.decrypt(authenticator, client_to_server_ticket.session_key);
        authenticator = tmp_obj.split('//');
        authenticator = {
            username: authenticator[0],
            valid_until: parseInt(authenticator[1]),
        };

        console.log('client_to_server_ticket:', client_to_server_ticket, client_to_server_ticket.valid_until - Date.now());
        console.log('authenticator:', authenticator, authenticator.valid_until - Date.now());


        if (client_to_server_ticket.username == authenticator.username && (authenticator.valid_until - Date.now() >= 0) && (client_to_server_ticket.valid_until - Date.now() >= 0)) {
            return authenticator.valid_until;
        } else {
            return null;
        }
    }
}

module.exports = new ServiceServer();