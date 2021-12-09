'use strict'

const regionModelo = require("../modelos/region.modelo");
const Region = require("../modelos/region.modelo");

function obtenerRegiones(req,res){

    regionModelo.find((err, regionesEncontradas)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de regiones' });
        if(!regionesEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las regiones' });
        return res.status(200).send({ regionesEncontradas });
    })
}

function obtenerRegionesT(req,res){
    regionModelo.find((err,regionesEncontradas)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar las regiones'});
            return res.status(200).send(regionesEncontradas);
    })
}

function crearRegion(req,res){
    var regionModelo = new Region();
    var params = req.body;

    if (params.nombre && params.descripcion) {
        regionModelo.nombre = params.nombre;
        regionModelo.descripcion = params.descripcion;
    
        Region.find({
            $or: [
                { nombre: regionModelo.nombre },
                { descripcion: regionModelo.descripcion }
            ]
        }).exec((err, regionesEncontradas) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de las regiones' })

            if (regionesEncontradas && regionesEncontradas.length >= 1) {
                return res.status(500).send({ mensaje: 'La región ya existe' })
            } else {
                regionModelo.save((err, regionGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar la region' })

                    //Guardando la región
                    if (regionGuardada) {
                        res.status(200).send(regionGuardada)
                        //Mostrando todos los datos de la región
                        console.log(params); 
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar la región' })
                    }
                }) 
            }
        })
    }
}


function obtenerRegion(req, res) {
    var idRegion = req.params.idRegion
    
    regionModelo.findById(idRegion, (err, regionEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la región' })
        if (!regionEncontrada) return res.status(500).send({ mensaje: 'Error en obtener los datos de la región' })
        console.log(regionEncontrada.nombre);
        return res.status(200).send({ regionEncontrada })
    })
}

function editarRegion(req, res) {
    var idRegion = req.params.idRegion;
    var params = req.body;

    regionModelo.findByIdAndUpdate(idRegion, params, { new: true }, (err, regionActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!regionActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la región' });
            return res.status(200).send({ regionActualizada });
    })   
}

function eliminarRegion(req, res) {
    const idRegion = req.params.idRegion;

    regionModelo.findByIdAndDelete(idRegion, (err, regionEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!regionEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la región.' });

        return res.status(200).send({ regionEliminada });
    })
}


module.exports = {
    obtenerRegiones,
    crearRegion,
    obtenerRegion,
    editarRegion,
    eliminarRegion,
    obtenerRegionesT
}