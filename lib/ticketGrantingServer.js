const crypto = require('crypto');

class TicketGrantingServer {
    constructor() {
        this.serviceTickets = {};
    }

    generateST(tgt, service) {
        const serviceSessionKey = crypto.randomBytes(16).toString('hex');
        const serviceTicket = {
            sessionKey: serviceSessionKey,
            username: tgt.username,
            service: service,
            validUntil: Date.now() + 1000 * 60 * 60,
        };
        this.serviceTickets[service] = serviceTicket;
        return serviceTicket;
    }

    validateTGT(tgt) {
        if (tgt.validUntil > Date.now()) {
            return true;
        } else {
            throw new Error('TGT lifetime expired');
        }
    }
}

module.exports = TicketGrantingServer;