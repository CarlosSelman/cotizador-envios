'use strict'

// Importaciones
const express = require("express");
const DescuentoControlador = require("../controladores/descuento.controlador");

// RUTES
var api = express.Router();
    api.get('/obtenerDescuentos', DescuentoControlador.obtenerDescuentos);
    api.get('/obtenerDescuentosT', DescuentoControlador.obtenerDescuentosT);
    api.post('/crearDescuento',  DescuentoControlador.crearDescuento);
    api.get('/obtenerDescuento/:idDescuento', DescuentoControlador.obtenerDescuento);
    api.put('/editarDescuento/:idDescuento',  DescuentoControlador.editarDescuento);
    api.delete('/eliminarDescuento/:idDescuento',  DescuentoControlador.eliminarDescuento);
module.exports = api;