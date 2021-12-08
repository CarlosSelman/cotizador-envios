'use strict'

// Importaciones
const express = require("express");
const RegionControlador = require("../controladores/region.controlador");

// RUTES
var api = express.Router();
    api.get('/obtenerRegiones', RegionControlador.obtenerRegiones);
    api.post('/crearRegion',  RegionControlador.crearRegion);
    api.get('/obtenerRegion/:idRegion', RegionControlador.obtenerRegion);
    api.put('/editarRegion/:idRegion',  RegionControlador.editarRegion);
    api.delete('/eliminarRegion/:idRegion',  RegionControlador.eliminarRegion);
module.exports = api;