import mongoose from 'mongoose';

import reciboD from '../models/reciboDetalleModel.js';

export const createRD = async (req, res) => {
    
    try {
        const newDetalle = new reciboD({
            _id: new mongoose.Types.ObjectId(),
            idRecibo: req.body.idRecibo,
            idProducto: req.body.idProducto,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            total: req.body.cantidad * req.body.precio,
            
        });
        await newDetalle.save();
        res.status(201).json(newDetalle);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const fetchRD = async (req, res) => {
    try {
        const detalles = await reciboD.find();
        res.status(200).json(detalles);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateRD = async (req, res) => {
    try {
        const name = req.params.nombre; // El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const product = await reciboD.findOne({ nombre: name }); // Buscar el producto por su nombre en lugar de por su ID
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        product.nombre = req.body.nombre;
        product.precio = req.body.precio;
        product.cantidad = req.body.cantidad;
        product.total = req.body.cantidad * req.body.precio;
        await product.save();
        res.status(200).json(product);
    
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default {fetchRD , createRD, updateRD }; // This is the function that will be called in the route file