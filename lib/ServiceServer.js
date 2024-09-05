const hasher = require('./HashHandler.js');
require('dotenv').config();

class ServiceServer {
    constructor() {
    }

    validateClientToServerTicket(client_to_server_ticket, authenticator) {
        console.log('client_to_server_ticket:', client_to_server_ticket);
        let tmp_obj = hasher.decrypt(client_to_server_ticket, process.env.SERVICE_SECRET_KEY);
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


        if (client_to_server_ticket.username == authenticator.username && (authenticator.valid_until - Date.now() >= 0) && (client_to_server_ticket.valid_until - Date.now() >= 0)) {
            return authenticator.valid_until;
        } else {
            throw new Error('Client_to_server_ticket lifetime expired');
        }
    }
}

module.exports = new ServiceServer();