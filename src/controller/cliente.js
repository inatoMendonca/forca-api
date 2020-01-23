const Cliente = require("../model/cliente");
const status = require('http-status');

exports.buscarUm = (request, response, next) => {//Método que busca um cliente pelo ID
    const id = request.params.id;

    Cliente.findByPk(id).then(cliente => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(cliente) {
            response.send(cliente);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarTodos = (request, response, next) => { // Método que busca todos os clientes
    let limite = parseInt(request.query.limite || 0); // Parâmetro que vem da URL convertido em inteiro
    let pagina = parseInt(request.query.pagina || 0);
    
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.NOT_FOUND).send(); //Retorna bad request indicando que algum parâmetro está errado
    }

    const ITENS_POR_PAGINA = 10;// Calcula a quantidade de itens por página

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Cliente.findAll({limit: limite, offset: pagina}).then(clientes => { // Busca vários registros no banco que recebe um objeto com limit e offset, paginando os itens
        response.send(clientes);
    }).catch(error => next(error));
};

exports.criar = (request, response, next) => {

    const nomeCliente = request.body.nomeCliente; // Captura os atributos do json
    const foneCliente = request.body.foneCliente;
    const sexoCliente = request.body.sexoCliente;
    const obsCliente = request.body.obsCliente;

    Cliente.create({ // Chama o metodo do Cliente, passando o objeto montado;
        nomeCliente: nomeCliente,
        foneCliente: foneCliente,
        sexoCliente: sexoCliente,
        obsCliente: obsCliente
    }).then(() => {
        response.status(status.OK).send();// Retorna se a inserção for success
    }).catch(error => next(error));
};

exports.atualizar = (request, response, next) => { // Quando atualizamos, enviamos o ID pela url e capturamos para fazer a alteração
    const id = request.params.id;

    const nomeCliente = request.body.nomeCliente; // Captura os atributos do json
    const foneCliente = request.body.foneCliente;
    const sexoCliente = request.body.sexoCliente;
    const obsCliente = request.body.obsCliente;


    Cliente.findByPk(id).then(cliente => { // Combinamos os métodos findById e Update, validando se o ID para a alteração do registro existe
        if(cliente) {
            Cliente.update({ // Recebe dois parâmetros - 1 - recebe os dados novos e atribuem ao json para registro
                nomeCliente: nomeCliente,
                foneCliente: foneCliente,
                sexoCliente: sexoCliente,
                obsCliente: obsCliente
                },{where: {idCliente: id} } // 2 - Cláusula que relaciona o ID do parâmetro com o ID registrado no banco
            ).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}

exports.excluir = (request, response, next) => { //Método que deleta uma inserção
    const id = request.params.id;
    Cliente.findByPk(id).then(cliente => { // Busca pelo ID recebido do parâmetro do cliente aberto
        
        if(cliente) {
            Cliente.destroy({ // Relaciona o ID do parâmetro com o ID do banco e faz o delete
                where: {idCliente: id}
            }).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}
