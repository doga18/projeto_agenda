const Contato = require('../models/ContatoModel')

exports.paginaInicial = (req, res) => {
    res.send('Contato numero 33231232131');
};

exports.index = (req, res) => {
    contato = null;
    res.render('contato', {
        contato
    });
};

exports.register = async (req, res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() =>  res.redirect('/contato/index'));
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

        res.render('contato', {
            contato: contato_id
        });
    }catch(e){
        console.log(e);
    }    
}

exports.edit = async function(req, res){
    console.log(`enviado para o form edit`)
    if(!req.params.id) return res.render('404');

    try{
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() =>  res.redirect('back'));
            return;
        }
    
        req.flash('messages', 'Contato Editado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.delete = async function(req, res){
    console.log('Tentando deletar um contato!')
    // Evitando deletar o contato sem informar o ID
    console.log(req.body);
        
    try{        
        const contato_del = Contato.delete(req.body.user_delete);
        if(!contato_del){
            req.flash('errors', 'Falha ao deletar o contato!');
            req.session.save( () => res.redirect('back'));
            return;
        }

        req.flash('messages', 'Contato deletado com sucesso.');
        req.session.save(() => res.redirect('back'));
        return;

    }catch(e){
        console.log(e);
        console.log(`Falha ao deletar o contato!`)
    }
}