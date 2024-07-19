const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const dashboardController = require('./src/controllers/dashboardController');
const contatoController = require('./src/controllers/contatoController');

// Importando o middleware para proteger a rota.

const { loginRequired } = require('./src/middlewares/middleware');


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
// Logout
router.get('/login/logout', loginController.logout)

// Rotas do Dashboard
router.get('/dashboard', dashboardController.index)

// Rotas do contato
router.get('/contato/index', loginRequired, contatoController.index);
router.post('/contato/register', loginRequired, contatoController.register);

// Rota de Edit
router.get('/contato/index/:id', loginRequired, contatoController.editIndex);
//router.get('/contato', contatoController.paginaInicial);

module.exports = router;