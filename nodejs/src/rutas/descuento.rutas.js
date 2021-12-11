'use strict'

// Importaciones
const express = require("express");
const DescuentoControlador = require("../controladores/descuento.controlador");

// RUTES
var api = express.Router();

    api.post('/validar', DescuentoControlador.validar);
    api.get('/obtenerDescuentos', DescuentoControlador.obtenerDescuentos);
    api.get('/obtenerDescuentosT', DescuentoControlador.obtenerDescuentosT);
    api.post('/crearDescuento',  DescuentoControlador.crearDescuento);
    api.get('/obtenerDescuento/:idDescuento', DescuentoControlador.obtenerDescuento);
    api.get('/obtenerDescuentoC', DescuentoControlador.obtenerDescuentoC);
    api.put('/editarDescuento/:idDescuento',  DescuentoControlador.editarDescuento);
    api.delete('/eliminarDescuento/:idDescuento',  DescuentoControlador.eliminarDescuento);
    
module.exports = api;