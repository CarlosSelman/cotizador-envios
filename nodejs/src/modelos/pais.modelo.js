'use strict'

const mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var paisSchema = Schema ({
    nombre: String,
    idRegion: {type: Schema.Types.ObjectId, ref : 'Region'}, 
    tarifa: Number,
})

//Exportando
module.exports = mongoose.model('Pais', paisSchema);