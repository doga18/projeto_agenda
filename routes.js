const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
//const contatoController = require('./src/controllers/contatoController');


// function meuMiddleware(req, res, next) {
//     console.log('Passei no middleware');
//     next();
// }

// Rotas do home
router.get('/', homeController.index)
//router.post('/received', homeController.trataPost);

// Rota de Login
router.get('/login/index', loginController.index)
router.post('/login/register', loginController.register)
router.post('/login/login', loginController.login)
// Rotas do contato
//router.get('/contato', contatoController.paginaInicial);

module.exports = router;