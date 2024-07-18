const mongoose = require('mongoose');
// Importando o validator para validar os dados.
const validator = require('validator');
// Importando o bcryptjs
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.messages = [];
        this.user = null;
    }

    // Fathers

    // method if register
    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        await this.emailAvaiable();
        if(this.errors.length > 0) return;        
        this.messages.push(`Sua conta com e-mail ${this.body.emailnew} foi criada com sucesso.`);
        // Usando o bcrypt para criar o hash de senha
        console.log(`Senha anterior ao bcrypt ${this.body.passwordnew}`);
        // Criando salt pro bcrypt
        const salt = bcryptjs.genSaltSync();
        // Abaixo seria para atualizar um campo já existente no body.
        // this.body.passwordnew = bcryptjs.hashSync(this.body.emailnew, salt);
        const hashedPassword = bcryptjs.hashSync(this.body.passwordnew, salt);
        console.log(`Senha após ao bcrypt ${this.body.passwordnew}`);
        var resultado = this.user = await LoginModel.create({
            email: this.body.emailnew,
            password: hashedPassword
        });
        console.log(resultado);
        console.log(this.messages);
        return this.messages;
        
    }

    // method of login

    async login(){
        console.log("Logando");
        //this.valida();
        if(this.errors.length > 0) return;
        // Busando o usuário na base de dados.
        try{
            this.user = await LoginModel.findOne({email: this.body.emaillogin});
            console.log(this.user);
            if(this.user == null){
                this.errors.push(`Usuário ou senha erradas!`);
                console.log(`user null`);
                return this.errors;
            }else{
                (bcryptjs.compareSync(this.body.passwordlogin, this.user.password)) ? this.messages.push(`Logado com sucesso`) : this.errors.push(`Falha ao realizar o login.`);
            }            
        }catch(e){
            console.log(e);
            return this.errors.push(`O usuário não existe.`);
        }        
        return true;
    }

    // Childrens

    async emailAvaiable(){
        try{
            console.log('Validei');
            const result = await LoginModel.findOne({email: this.body.emailnew})
            console.log(result);
            if(result) this.errors.push(`O e-mail ${this.body.emailnew} já existe cadastrado no sistema, tente recuperar sua conta.`)
        }catch(e){
            console.log(e);
            return false;
        }
    }   

    valida(){
        this.cleanUp();        
        // validação
        // O email precisa ser válido, a senha tbm.
        if(!validator.isEmail(this.body.emailnew)) this.errors.push('E-mail invalido.');

        if(this.body.passwordnew.length < 3 || this.body.passwordnew.length >= 50) this.errors.push('A senha precisa ter mais que 4 caracteres e ser menor que 50 caracteres.')
        //if(this.body.passwordnew.length < 3 || this.body.passwordnew.length >= 50) this.messages.push('A senha precisa ter mais que 4 caracteres e ser menor que 50 caracteres.')
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            emailnew: this.body.emailnew,
            passwordnew: this.body.passwordnew
        };
    }
}


module.exports = Login;