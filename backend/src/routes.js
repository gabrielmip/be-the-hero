const express = require('express');

const NgoController = require('./controllers/ngos.controller');
const IncidentController = require('./controllers/incidents.controller');
const ProfileController = require('./controllers/profile.controller');
const SessionController = require('./controllers/session.controller');

const routes = express.Router();


routes.post('/sessions', SessionController.create);

routes.get('/ngos', NgoController.index);
routes.post('/ngos', NgoController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;
