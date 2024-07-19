const Contato = require('../models/ContatoModel')

exports.paginaInicial = (req, res) => {
    res.send('Contato numero 33231232131');
};

exports.index = (req, res) => {
    res.render('contato');
};

exports.register = async (req, res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() =>  res.redirect('back'));
            return;
        }

        req.flash('messages', 'Contato Salvo com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    }catch(e){
        console.log(e)
    }
};

exports.listContats = async (req, res) => {
    try{
        const contato = new Contato();
        await contato.listAll();
    }catch(e){
        console.log(e)
    }
}

exports.editIndex = async function(req, res){
    if(!req.params.id) return res.render('404');

    try{
        const contato_id = await Contato.buscaPorId(req.params.id);

        res.render('contatoEdit', {
            contato: contato_id
        });
    }catch(e){
        console.log(e);
    }

    
}