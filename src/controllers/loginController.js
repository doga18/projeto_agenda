// Importando o model para tratar os dados enviados pelo formulário.
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
     res.render('login');
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length >= 1) {
            req.flash('errors', login.errors);
            await req.session.save();
            return res.redirect('/login/index');
        }

        
        req.flash('messages', login.messages);
        await req.session.save();
        return res.redirect('back');        
        
        //return  res.redirect('/');
        //return res.send(login.user);
    }catch(e){
        console.log(e);
        return res.render('404')
    }
}

exports.login = async (req, res) => {
    try {
        // Capturando os dados do EJS para enviar para o model.
        const login = new Login(req.body);
        await login.login();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            await req.session.save();
            return res.redirect('/login/index');
        }

        req.flash('messages', login.messages);
        await req.session.save();
        return res.redirect('/');
        
    }catch(e){
        console.log(e);
        return res.render('404');
    }
    
}