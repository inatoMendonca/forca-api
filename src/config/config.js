module.exports = {//exportando o JSON para a aplicação
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: 'forcadevendas',
            dialect: 'mysql',
            user: 'root',
            password: ''
        }
    },
    production: {
        database: {
            host: 'us-cdbr-iron-east-05.cleardb.net',
            port: process.env.PORT,
            name: 'heroku_3c05be6f918c8ef',
            dialect: 'mysql',
            user: 'be7ede38e1572a',
            password: '8ec9cc97'
        }
    }
}