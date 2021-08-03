const routes = require('express').Router();
const authMiddleware = require('./app/middleware/auth');
const SessionController = require('./app/controllers/sessionController');



routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});



// rotas

module.exports = routes;