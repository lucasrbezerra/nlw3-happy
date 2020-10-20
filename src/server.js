// Importar libs/dependencias
const express = require('express');
const path = require('path');
const pages = require('./pages.js');

//iniciando biblioteca
const server = express();

server
    // utilizar body do req
    .use(express.urlencoded({ extended: true }))
    // utilizando os arquivos estáticos
    .use(express.static('public'))

    // configurar template engine
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')
    // criar rotas da aplicação
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .get('/edit-orphanage', pages.loadOrphanage)
    .get('/delete-orphanage', pages.deleteOrphanage)
    .post('/edit-orphanage', pages.editOrphanage)
    .post('/save-orphanage', pages.saveOrphanage)

// Ligar o servidor
server.listen(5500);