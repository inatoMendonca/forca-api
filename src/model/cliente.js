const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Cliente = sequelize.define('clientes', {
    idCliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeCliente: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    foneCliente: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    sexoCliente: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    obsCliente: {
        allowNull: true,
        type: Sequelize.STRING(255)
    }
});

module.exports = Cliente;