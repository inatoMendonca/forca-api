const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Colaborador = sequelize.define('colaboradores', {
    idColaborador: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeColaborador: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    foneColaborador: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    funcaoColaborador: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    obsColaborador: {
        allowNull: true,
        type: Sequelize.STRING(255)
    }
});

module.exports = Colaborador;