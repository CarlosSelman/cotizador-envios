'use strict'

//VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// IMPORTACION RUTAS
const pais_ruta = require("./src/rutas/pais.rutas");
const region_ruta = require("./src/rutas/region.rutas");
const descuento_ruta = require("./src/rutas/descuento.rutas");

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// CABECERAS
app.use(cors());

// CARGA DE RUTAS
app.use('/api', region_ruta,pais_ruta,descuento_ruta);

//EXPORTAR
module.exports = app;