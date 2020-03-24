const express = require('express');
const OngController = require('./controllers/OngController');
const IncedentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionControlle');
const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.post('/ongs',OngController.create);
routes.get('/ongs', OngController.index);

routes.get('/profile',ProfileController.index);

routes.post('/incidents',IncedentsController.create);
routes.get('/incidents',IncedentsController.index);
routes.delete('/incidents/:id',IncedentsController.delete);
module.exports= routes;