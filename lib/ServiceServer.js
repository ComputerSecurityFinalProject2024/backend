const hasher = require('./HashHandler.js');

class ServiceServer {
    constructor() {
    }

    validateClientToServerTicket(client_to_server_ticket, authenticator) {
        client_to_server_ticket = hasher.decrypt(client_to_server_ticket, ENV('SERVICE_SECRET_KEY'));
        client_to_server_ticket = client_to_server_ticket.split('//');
        client_to_server_ticket = {
            username: client_to_server_ticket[0],
            valid_until: Date.parse(client_to_server_ticket[1]),
            session_key: client_to_server_ticket[2],
        };

        authenticator = hasher.decrypt(authenticator, client_to_server_ticket.session_key);
        authenticator = authenticator.split('//');
        authenticator = {
            username: authenticator[0],
            valid_until: Date.parse(authenticator[1]),
        };

        if (client_to_server_ticket.username == authenticator.username && authenticator.valid_until > Date.now() && client_to_server_ticket.valid_until > Date.now()) {
            return authenticator.valid_until;
        } else {
            throw new Error('Client_to_server_ticket lifetime expired');
        }
    }
}