exports.middlewareGlobal = (req, res, next) => {    
    console.log('Cheguei no middleware');
    // if(req.body.name){
    //     console.log(`Cliente ${req.body.name} tentando acessar o sistema!`)
    //     next();
    // }
    // Injetar dados na rota.
    res.locals.umaVariavelLocal = "Este é o valor da variavel local!"
    //
    res.locals.errors = req.flash('errors')
    res.locals.messages = req.flash('messages')
    res.locals.user = req.session.user;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    console.log('Cheguei no error CsrfError')
    if(err && 'EBADCSRFTOKEN' === err.code ){
        console.log(`Erro no middleware: ${err}`)
        return res.render('404');
    }else{
        console.log("erro");
        return
    }
}

exports.csrfMiddleware = (req, res, next) => {
    console.log('Cheguei no csrfMiddleware')
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa estar logado para acessar esta página.')
        req.session.save(() => res.redirect('/login/index'));
        return;
    }

    next();
}