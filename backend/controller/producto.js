import mongoose from 'mongoose';

import product from '../models/productoModel.js';

export const createP = async (req, res) => {
    try {
        const producto = new product({
            _id: new mongoose.Types.ObjectId(),
            idProducto: req.body.idProducto,
            nombre: req.body.nombre,
            precio: req.body.precio,
            cantidadDispo: req.body.cantidadDispo,
            
        });
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const fetchP = async (req, res) => {
    try {
        const products = await product.find().sort({ idProducto: 1 });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateP = async (req, res) => {
    try {
        const id = req.params.idProducto// El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const producto = await product.findOne({ idProducto : id}); // Buscar el producto por su nombre en lugar de por su ID
        if (!producto) {
            return res.status(404).json({ error: 'product not found' });
        }
        producto.nombre = req.body.nombre;
        producto.precio = req.body.precio;
        producto.cantidadDispo = req.body.cantidadDispo;
        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const eraseP = async (req, res) => {
    try {
        const id = req.params.idProducto// El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const producto = await product.findOne({ idProducto : id}); // Buscar el producto por su nombre en lugar de por su ID
        if (!producto) {
            return res.status(404).json({ error: 'producto not found' });
        }
        await product.findByIdAndDelete(producto._id);
        console.log(producto);
        console.log(producto._id);
        console.log(id);
        res.status(204).end();
    }
    catch (error) {
        console.error('Error deleting producto:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default {fetchP , createP, updateP , eraseP }; // This is the function that will be called in the route file.