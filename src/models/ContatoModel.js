const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    name: {type: String, require: true},
    lastname: {type: String, require: false, default: ''},
    tel: {type: Number, require: false, default: ''},
    email: {type: String, require: false, default: ''},
    createdAt: {type: Date, default: Date.now},
    
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function(){
    this.valida();

    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);

    console.log(`Contato criado ${this.contato}`)

};

Contato.prototype.valida = function(){
    console.log(`valor vindo do e-mail ${this.body.email}`)
    this.cleanUp();
    // validação
    // O nome e o sobrenome precisam ser String.
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido.');
    if(!this.body.name ) this.errors.push(`Nome é um campo obrigatório`);
    if(!this.body.email && !this.body.tel) this.errors.push(`O telefone ou e-mail precisa ser informado ao salvar o contato!`);    
}

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        lastname: this.body.lastname,
        tel: this.body.tel,
        email: this.body.email        
    };
}

// Methods não instanciados

// Busca de todos os contatos

Contato.listAll = async function(){
    var allcontacts = [];

    try{
        allcontacts = await ContatoModel.find({});
        console.log(allcontacts);
        return allcontacts
    }catch(e){

    }
}

// Busca por contato específico

Contato.buscaPorId =  async function(id){
    const user = await ContatoModel.findById(id);
    return user;
}


module.exports = Contato;