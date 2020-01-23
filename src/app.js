const http = require("http");
const express = require('express');
const rotas = require('./routes/rotas');
const sequelize = require('./database/database');
const status = require('http-status');

const app = express();

const hostname = "127.0.0.1"; //Localhost

app.use(express.json());

app.use('/api', rotas);// endereço raiz de todas as rotas da aplicação (prefixo)

// middleware que retorna um 404 caso de erro na requisição
app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send("Página não encontrada! (Erro 404)");
});

// middleware que trata erros globais na aplicação
app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({error});
});

// Todas as vezes que subir a API, esse método é executado, recriando as tables todas as vezes que iniciado
sequelize.sync({force: false}).then(() => {
    const port = process.env.PORT || 3000;

    app.set("port", port);

    const server = http.createServer(app);

    server.listen(port);
});// O objeto pega o banco que existe e cria uma table de acordo com os campos do model