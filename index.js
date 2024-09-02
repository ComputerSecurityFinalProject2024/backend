const express = require('express');
const bodyParser = require('body-parser');
const AuthenticationServer = require('./lib/authenticationServer');
const TicketGrantingServer = require('./lib/ticketGrantingServer');

const app = express();
const port = 3000;

const AS = new AuthenticationServer();
const TGS = new TicketGrantingServer();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Kerberos KDC server!');
  });
  

app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  try {
    const tgt = AS.authenticateUser(username, password);
    res.status(200).json({ tgt });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

app.post('/getServiceTicket', (req, res) => {
  const { tgt, service } = req.body;
  try {
    if (TGS.validateTGT(tgt)) {
      const serviceTicket = TGS.generateServiceTicket(tgt, service);
      res.status(200).json({ serviceTicket });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`KDC running on http://localhost:${port}`);
});