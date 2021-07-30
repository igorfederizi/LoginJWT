const routes = require('express').Router();
const SessionController = require('./app/controllers/sessionController');



routes.post('/sessions', SessionController.store);



// rotas

module.exports = routes;