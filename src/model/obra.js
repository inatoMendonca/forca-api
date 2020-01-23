const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Obra = sequelize.define('obras', {
    idObra: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    clienteObra: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    enderecoObra: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    foneObra: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    pedreiroObra: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    eletricistaObra: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    vendedorObra: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    dataCadObra: {
        allowNull: false,
        type: Sequelize.DATEONLY
    },
    andamentoObra: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    obsObra: {
        allowNull: false,
        type: Sequelize.STRING(5000)
    }
});

module.exports = Obra;