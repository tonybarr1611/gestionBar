import producto from '../models/productoModel.js';
import recibo from '../models/reciboModel.js';
import reciboDetalle from '../models/reciboDetalleModel.js';
import mesaD from '../models/mesaDetalleModel.js';
import mongoose from 'mongoose';


export const getTableTotal = async (req, res) => {
    try {
        const mesaDetalles = await mesaD.find({ idMesa: req.params.idMesa });
        let total = 0;
        for (let i = 0; i < mesaDetalles.length; i++) {
            total += mesaDetalles[i].total;
        }
        res.status(200).json({ total });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const transMesaRecibo = async (req, res) => {
    req.params.idMesa = req.params.idMesa;
    try {
        const mesaDetalles = await mesaD.find({ idMesa: req.params.idMesa });
        let total = 0;
        for (let i = 0; i < mesaDetalles.length; i++) {
            total += mesaDetalles[i].total;
        }
        var maxIDRecibo;
        if ((await recibo.countDocuments()) === 0) {
            maxIDRecibo = 0;
        } else {
            maxIDRecibo = (await recibo.find().sort({ idRecibo: -1 }).limit(1))[0].idRecibo;
        }
        const newRecibo = new recibo({
            _id: new mongoose.Types.ObjectId(),
            idRecibo: maxIDRecibo + 1,
            fecha: req.body.fecha,
            monto: total,
            estado: req.body.estado,
            comprador: req.body.comprador
        });
        await newRecibo.save();

        for (let i = 0; i < mesaDetalles.length; i++) {
            const newReciboDetalle = new reciboDetalle({
                _id: new mongoose.Types.ObjectId(),
                idRecibo: newRecibo.idRecibo,
                idProducto: mesaDetalles[i].idProducto,
                cantidad: mesaDetalles[i].cantidad,
                precio: mesaDetalles[i].precio,
                total: mesaDetalles[i].total
            })
            await newReciboDetalle.save();
        }
        await mesaD.deleteMany({ idMesa: req.params.idMesa });
        res.status(201).json(newRecibo);
    } catch (error) {
        console.error('Error creating recibo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const montoTotal = async (req, res) => {

    try {
        const recibos = await recibo.find();
       
        let total = 0; 
        
        for (let i = 0; i < recibos.length; i++) {
            
            

            const detalles = await reciboDetalle.find({ idRecibo: recibos[i].idRecibo });
            for (let j = 0; j < detalles.length; j++) {
                console.log(detalles[j]);
                total += detalles[j].total;
            }
        }
        res.status(200).json({ total });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const cantidadTotal = async (req, res) => {

    try {
        const recibos = await recibo.find();
       
        let total = 0; 
        
        for (let i = 0; i < recibos.length; i++) {
            
            

            const detalles = await reciboDetalle.find({ idRecibo: recibos[i].idRecibo });
            for (let j = 0; j < detalles.length; j++) {
                console.log(detalles[j]);
                total += detalles[j].cantidad;
            }
        }
        res.status(200).json({ total });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const resumenProductos = async (req, res) => {
    try {
        const productos = await producto.find();
        let resumen = [];
        for (let i = 0; i < productos.length; i++) {
            const detalles = await reciboDetalle.find({ idProducto: productos[i].idProducto });
            let cantidad = 0;
            let total = 0;
            for (let j = 0; j < detalles.length; j++) {
                total += detalles[j].total;
                cantidad += detalles[j].cantidad;
            }
            resumen.push({ nombre: productos[i].nombre, cantidad, total });
            
        }
        res.status(200).json(resumen);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default { montoTotal, cantidadTotal, resumenProductos, transMesaRecibo, getTableTotal };