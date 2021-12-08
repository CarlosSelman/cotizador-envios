'use strict'

const mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var regionSchema = Schema ({
    nombre: String,
    descripcion: String,
})

//Exportando
module.exports = mongoose.model('Region', regionSchema);