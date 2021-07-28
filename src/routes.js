const routes = require('express').Router();
const { User } = require('./app/models');

User.create({name: 'Igor', email:'igor.federizi@gmail.com', password_hash:'31321561318'});


// rotas

module.exports = routes;