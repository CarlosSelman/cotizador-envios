'use strict'

const descuentoModelo = require("../modelos/descuento.modelo");
const Descuento = require("../modelos/descuento.modelo");
const bcrypt = require("bcrypt-nodejs");

function obtenerDescuentos(req,res){

    descuentoModelo.find((err, descuentosEncontrados)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de descuentos' });
        if(!descuentosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los descuentos' });
        return res.status(200).send({ descuentosEncontrados });
    })
}

function crearDescuento(req,res){
    var descuentoModelo = new Descuento();
    var params = req.body;

    if (params.codigo) {
        descuentoModelo.codigo = params.codigo;
        descuentoModelo.descuento = params.descuento;
    
        Descuento.find({
            $or: [
                { codigo: descuentoModelo.codigo }
            ]
        }).exec((err, codigosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los descuentos' })

            if (codigosEncontrados && codigosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El código de descuento ya existe' })
            } else {
                descuentoModelo.save((err, descuentoGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el descuento' })

                    //Guardando el descuento
                    if (descuentoGuardado) {
                        res.status(200).send(descuentoGuardado)
                        //Mostrando todos los datos del descuento
                        console.log(params); 
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el descuento' })
                    }
                }) 
            }
        })
    }
}


function obtenerDescuento(req, res) {
    var idDescuento = req.params.idDescuento
    
    descuentoModelo.findById(idDescuento, (err, descuentoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del descuento' })
        if (!descuentoEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del descuento' })
        console.log(descuentoEncontrado.codigo);
        return res.status(200).send({ descuentoEncontrado })
    })
}

function obtenerDescuentoC(req, res) {
    var codigo = req.params.codigo
    
    descuentoModelo.find(codigo, (err, descuentoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del descuento' })
        if (!descuentoEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del descuento' })
        //console.log(descuentoEncontrado);
        return res.status(200).send({ descuentoEncontrado })
    })
}

function obtenerDescuentosT(req,res){
    descuentoModelo.find((err,descuentosEncontrados)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar las regiones'});
            return res.status(200).send(descuentosEncontrados);
    })
}

function editarDescuento(req, res) {
    var idDescuento = req.params.idDescuento;
    var params = req.body;

    descuentoModelo.findByIdAndUpdate(idDescuento, params, { new: true }, (err, descuentoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!descuentoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el descuento' });
            return res.status(200).send({ descuentoActualizado });
    })   
}

function eliminarDescuento(req, res) {
    const idDescuento = req.params.idDescuento;

    descuentoModelo.findByIdAndDelete(idDescuento, (err, descuentoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!descuentoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el descuento.' });

        return res.status(200).send({ descuentoEliminado });
    })
}



function validar(req,res){
    var params = req.body;
        
    descuentoModelo.findOne({ codigo : params.codigo}, (err, descuentoEncontrado)=>{
        if(err) return res.status(404).send({ report: 'Error  al validar cupón'});
        if(!descuentoEncontrado) return res.status(404).send({ report: 'El cupón no existe'});

       if(descuentoEncontrado){
           if(params.codigo === descuentoEncontrado.codigo){
            
            return res.status(200).send({ descuentoEncontrado });
           } else{
            return res.status(500).send({ mensaje: 'Cupón no válido' });
           }
       }
    })
}

module.exports = {
    obtenerDescuentos,
    crearDescuento,
    obtenerDescuento,
    editarDescuento,
    eliminarDescuento,
    obtenerDescuentosT,
    obtenerDescuentoC,
    validar
}