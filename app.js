require('dotenv').config();

const port = process.env.PORTPROJECT;

const path = require('path');

// Carregando o express.
const express = require('express');

// Trabalhando com session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
// Im
const helmet = require('helmet');
// CSRF
const csrf = require('csurf');

// Importando o Router.
const routes = require('./routes');

// Middleware
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

const app = express();

// Montando a conexão com DB.
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING).then(conection => {
    console.log("Banco de dados conectado.");
    // Emitindo um sinal após a conexão!
    app.emit('pronto');
    //console.log(conection);
}).catch(err => {
    console.log("Falha ao conectar no banco de dados!");
    console.log(err);
})

// Criando as opções da sessions e seu secret.
const sessionsOptions = session({
    secret: process.env.SECRETSESSION,    
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
})

const globalMiddleware = [
    middlewareGlobal,
    checkCsrfError,
    csrfMiddleware
]

// Importando as opções das sessões e uso de msgs flashs.
app.use(sessionsOptions);
app.use(flash());

// helmet
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        //scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        // Adicione outras diretivas conforme necessário
      }
    }
  }));

// Importando as views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Setando arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));

// Para porder usar o conteudo do Body é necessário dizer pro express a tratar o body para uso, fazemos dessa forma.
app.use(express.urlencoded({extended: true}));

// Usando o CSRF
app.use(csrf());

// Importando o Middleware
app.use(globalMiddleware);

// Falando pro express utilizar a routes.
app.use(routes);

// Servir arquivos estáticos a partir da pasta public
app.use(express.static(path.join(__dirname, 'public')));

app.on('pronto', () => {
    app.listen(port, () => {
        console.log(`Servidor rodando: http://localhost:${port}`)
    })
})
