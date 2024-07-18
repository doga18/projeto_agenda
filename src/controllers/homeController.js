const HomeModel = require('../models/HomeModel');

// HomeModel.create({
//     titulo: "Um titulo de testes",
//     descricao: "qualquer coisa criada."
// }).then(dados => {
//     console.log(dados);
// }).catch(err => {
//     console.log(err);
// })

// HomeModel.find({    
// }).then(dados => {
//     console.log(dados);
// }).catch(err => {
//     console.log(err);
// })

// exports.paginaInicial = (req, res) => {
//     // res.send(`
//     //     <form action="/received" method="POST">
//     //     Insira seu nome: <input type="text" name="nome">
//     //     <button> Enviando! </button>
//     //     </form>
//     //     `);
//     //req.session.usuario = { nome: 'luiz', idade: 12};
//     //console.log(req.session.usuario);
//     // req.flash('info', 'Olá mundo');
//     // req.flash('error', 'asdadsad');
//     // req.flash('success', 'blaaaasss');
//     //console.log(req.flash('error'), req.flash('info'), req.flash('success'))
//     res.render('index', {
//         titulo: "Este titulo sera exibido.",
//         numeros: [0,1,2,3,4,5,6,7,8,9]
//     });
// }

exports.index = (req, res) => {
    res.render('index');
}

exports.trataPost = (req, res) => {
    res.send("Sou sua nova rota de post.");
    console.log(req.body);
}