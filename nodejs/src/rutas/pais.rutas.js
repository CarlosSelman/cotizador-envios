'use strict'

// Importaciones
const express = require("express");
const paisControlador = require("../controladores/pais.controlador");

// RUTES
var api = express.Router();

    api.get('/obtenerPaises', paisControlador.obtenerPaises);
    api.get('/obtenerPaisesT', paisControlador.obtenerPaisesT);
    api.get('/obtenerPaisesRegion/:idRegion', paisControlador.obtenerPaisesRegion);
    api.post('/crearPais', paisControlador.crearPais);
    api.get('/obtenerPais/:idPais', paisControlador.obtenerPais);
    api.put('/editarPais/:idPais', paisControlador.editarPais);
    api.delete('/eliminarPais/:idPais', paisControlador.eliminarPais);

module.exports = api;