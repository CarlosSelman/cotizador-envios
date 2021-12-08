'use strict'

const mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var descuentoSchema = Schema ({
    codigo: String,
    descuento: Number, 
})

//Exportando
module.exports = mongoose.model('Descuento', descuentoSchema);