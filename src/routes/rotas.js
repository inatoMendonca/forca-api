const express = require('express');
const colaboradorController = require('../controller/colaborador');
const clienteController = require('../controller/cliente');
const obraController = require('../controller/obra');

const router = express();

console.log('Enabling CORS');
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.status(200).send();
    } else {
        next();
    }
};

router.use(allowCrossDomain);

//endpoints Fornecedor
router.get('/colaboradores/:id', colaboradorController.buscarUm);
router.get('/colaboradores', colaboradorController.buscarTodos);
router.post('/colaboradores', colaboradorController.criar);
router.put('/colaboradores/:id', colaboradorController.atualizar);
router.delete('/colaboradores/:id', colaboradorController.excluir);

//endpoints Cliente
router.get('/clientes/:id', clienteController.buscarUm);
router.get('/clientes', clienteController.buscarTodos);
router.post('/clientes', clienteController.criar);
router.put('/clientes/:id', clienteController.atualizar);
router.delete('/clientes/:id', clienteController.excluir);

//endpoints Obra
router.get('/obras/:id', obraController.buscarUm);
router.get('/obras/nome/:name', obraController.buscarNome);
router.get('/obras/data/:data', obraController.buscarData);
router.get('/obras', obraController.buscarTodos);
router.post('/obras', obraController.criar);
router.put('/obras/:id', obraController.atualizar);
router.delete('/obras/:id', obraController.excluir);

module.exports = router;