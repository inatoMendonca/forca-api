const Obra = require("../model/obra");
const status = require('http-status');


exports.buscarNome = (request, response, next) => {
    const name = request.params.name;


    Obra.findAll({where: {clienteObra: `${name}`}, order: [['dataCadObra']]}).then(obra => {
        if(obra) {
            response.send(obra);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    })
}

exports.buscarData = (request, response, next) => {
    const data = request.params.data;
    
    Obra.findAll({where: {dataCadObra: `${data}`}, order: [['dataCadObra']]}).then(obra => {
        if(obra) {
            response.send(obra);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    })
}

exports.buscarUm = (request, response, next) => {//Método que busca um obra pelo ID
    const id = request.params.id;

    Obra.findByPk(id).then(obra => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(obra) {
            response.send(obra);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarTodos = (request, response, next) => { // Método que busca todos os obras
    let limite = parseInt(request.query.limite || 0); // Parâmetro que vem da URL convertido em inteiro
    let pagina = parseInt(request.query.pagina || 0);
    
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.NOT_FOUND).send(); //Retorna bad request indicando que algum parâmetro está errado
    }

    const ITENS_POR_PAGINA = 500;// Calcula a quantidade de itens por página

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Obra.findAll({limit: limite, offset: pagina, order: [['dataCadObra']]}).then(obras => { // Busca vários registros no banco que recebe um objeto com limit e offset, paginando os itens
        response.send(obras);
    }).catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const clienteObra = request.body.clienteObra; // Captura os atributos do json
    const enderecoObra = request.body.enderecoObra;
    const foneObra = request.body.foneObra;
    const pedreiroObra = request.body.pedreiroObra;
    const eletricistaObra = request.body.eletricistaObra;
    const vendedorObra = request.body.vendedorObra;
    const dataCadObra = request.body.dataCadObra;
    const andamentoObra = request.body.andamentoObra;
    const obsObra = request.body.obsObra;

    Obra.create({ // Chama o metodo do Obra, passando o objeto montado;
        clienteObra: clienteObra,
        enderecoObra: enderecoObra,
        foneObra: foneObra,
        pedreiroObra: pedreiroObra,
        eletricistaObra: eletricistaObra,
        vendedorObra: vendedorObra,
        dataCadObra: dataCadObra,
        andamentoObra: andamentoObra,
        obsObra: obsObra
    }).then(() => {
        response.status(status.OK).send();// Retorna se a inserção for success
    }).catch(error => next(error));
};

exports.atualizar = (request, response, next) => { // Quando atualizamos, enviamos o ID pela url e capturamos para fazer a alteração
    const id = request.params.id;

    const clienteObra = request.body.clienteObra; // Captura os atributos do json
    const enderecoObra = request.body.enderecoObra;
    const foneObra = request.body.foneObra;
    const pedreiroObra = request.body.pedreiroObra;
    const eletricistaObra = request.body.eletricistaObra;
    const vendedorObra = request.body.vendedorObra;
    const dataCadObra = request.body.dataCadObra;
    const andamentoObra = request.body.andamentoObra;
    const obsObra = request.body.obsObra;

    Obra.findByPk(id).then(obra => { // Combinamos os métodos findById e Update, validando se o ID para a alteração do registro existe
        if(obra) {
            Obra.update({ // Recebe dois parâmetros - 1 - recebe os dados novos e atribuem ao json para registro
                clienteObra: clienteObra,
                enderecoObra: enderecoObra,
                foneObra: foneObra,
                pedreiroObra: pedreiroObra,
                eletricistaObra: eletricistaObra,
                vendedorObra: vendedorObra,
                dataCadObra: dataCadObra,
                andamentoObra: andamentoObra,
                obsObra: obsObra
                },{where: {idObra: id} } // 2 - Cláusula que relaciona o ID do parâmetro com o ID registrado no banco
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
    Obra.findByPk(id).then(obra => { // Busca pelo ID recebido do parâmetro do obra aberto
        
        if(obra) {
            Obra.destroy({ // Relaciona o ID do parâmetro com o ID do banco e faz o delete
                where: {idObra: id}
            }).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}