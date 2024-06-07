import mongoose from 'mongoose';
import reciboD from '../models/reciboDetalleModel.js';
import recibo from '../models/reciboModel.js';
import reciboDetalle from './reciboDetalle.js';

export const createR = async (req, res) => {
    try {
        
        const newRecibo = new recibo({
            _id: new mongoose.Types.ObjectId(),
            idRecibo: req.body.idRecibo,
            fecha: req.body.fecha,
            monto: req.body.monto,
            tipo: req.body.tipo,
            comprador: req.body.comprador,
        
        });
        
        await newRecibo.save();
        res.status(201).json(newRecibo);
}   catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const fetchR = async (req, res) => {
    try {
        const recibos = await recibo.find().sort({ fecha: -1 });
        res.status(200).json(recibos);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateR = async (req, res) => {
    try {
        const reciboId = req.params.idRecibo; // El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const reciboU = await recibo.findOne({ idRecibo: reciboId }); // Buscar el producto por su nombre en lugar de por su ID
        if (!reciboU) {
            return res.status(404).json({ error: 'Product not found' });
        }
        reciboU.fecha = req.body.fecha;
        reciboU.monto = req.body.monto;
        reciboU.estado = req.body.estado;
        reciboU.comprador = req.body.comprador;
        await reciboU.save();
        res.status(200).json(reciboU);
    }   catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; 

export const updateState = async (req, res) => {
    try {
        const reciboId = req.params.idRecibo; // El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const reciboU = await recibo.findOne({ idRecibo: reciboId }); // Buscar el producto por su nombre en lugar de por su ID
        if (!reciboU) {
            return res.status(404).json({ error: 'Product not found' });
        }
        reciboU.estado = req.body.estado;
        await reciboU.save();
        res.status(200).json(reciboU);
    }   catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const eraseR = async (req, res) => {
    try {
        const reciboId = req.params.idRecibo;
        const reciboE = await recibo.findOne({ idRecibo : reciboId });
        if (!reciboE) {
            return res.status(404).json({ error: 'Recibo not found' });
        }
        console.log(reciboE.idRecibo);
        
        await reciboD.deleteMany({ idRecibo: reciboE.idRecibo })
        await recibo.findByIdAndDelete(reciboE._id);
        
        res.status(204).end();
    }   catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default {fetchR , createR, updateR, updateState, eraseR}; // This is the function that will be called in the route file.