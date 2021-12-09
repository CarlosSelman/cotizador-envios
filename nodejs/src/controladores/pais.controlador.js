'use strict'

const paisModelo = require("../modelos/pais.modelo");
const Pais = require("../modelos/pais.modelo");
const regionModelo = require("../modelos/region.modelo");
const Region = require("../modelos/region.modelo");

function obtenerPaises(req,res){

    paisModelo.find().populate('idRegion', 'nombre').exec((err, paisesEncontrados)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de paises' });
        if(!paisesEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los paises' });
        return res.status(200).send({ paisesEncontrados });
    })
}

function obtenerPaisesT(req,res){
    paisModelo.find((err,paisesEncontrados)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar los paises'});
            return res.status(200).send(paisesEncontrados);
    })
}


function crearPais(req,res){
    var paisModelo = new Pais();
    var params = req.body;

    if (params.nombre) {
        paisModelo.nombre = params.nombre;
        paisModelo.idRegion = params.idRegion;
        paisModelo.tarifa = params.tarifa

        Pais.find({
            $or: [
                { nombre: paisModelo.nombre }
            ]
        }).exec((err, paisesEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del pais' })

            if (paisesEncontrados && paisesEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El país ya existe' })
            } else {
                paisModelo.save((err, paisGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el país' })

                    //Guardando el país
                    if (paisGuardado) {
                        res.status(200).send(paisGuardado)
                        //Mostrando todos los datos del país
                        console.log(params); 
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el país' })
                    }
                }) 
            }
        })
    }
}

function obtenerPais(req, res) {
    var idPais = req.params.idPais
    
    paisModelo.findById(idPais).populate('idRegion').exec((err, paisEncontrado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del país' })
        if (!paisEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del país' })
        console.log(paisEncontrado.nombre);
        return res.status(200).send({ paisEncontrado })
    })
}

function editarPais(req, res) {
    var idPais = req.params.idPais;
    var params = req.body;

    paisModelo.findByIdAndUpdate(idPais, params, { new: true }, (err, paisActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!paisActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el país' });
            return res.status(200).send({ paisActualizado });
    })   
}

function eliminarPais(req, res) {
    const idPais = req.params.idPais;

    paisModelo.findByIdAndDelete(idPais, (err, paisEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!paisEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el país.' });

        return res.status(200).send({ paisEliminado });
    })
}

function obtenerPaisesRegion (req, res){
    var idRegion = req.params.idRegion

    Pais.find({idRegion : idRegion},(err, paisesObtenidos)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!paisesObtenidos) return res.status(500).send({ mensaje: 'No se ha podido traer los paises' });
        return res.status(200).send({ paisesObtenidos });
    })
}

module.exports = {
    obtenerPaises,
    crearPais,
    obtenerPais,
    editarPais,
    eliminarPais,
    obtenerPaisesRegion,
    obtenerPaisesT
}