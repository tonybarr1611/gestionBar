import mongoose from 'mongoose';
import mesaD from '../models/mesaDetalleModel.js';
import product from '../models/productoModel.js';

export const createMD = async (req, res) => {
    try {
        const newMesaD = new mesaD({
            _id: new mongoose.Types.ObjectId(),
            idMesa: req.body.idMesa,
            idProducto: req.body.idProducto,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            
            total: req.body.cantidad * req.body.precio,
            
        });
        await newMesaD.save();

        //eliminar cantidad de producto en la base de datos
        console.log(newMesaD.idProducto);
        const producto = await product.findOne({ idProducto :  newMesaD.idProducto});
        if (!producto) {
            return res.status(404).json({ error: 'product not found' });
        }
        producto.cantidadDispo = producto.cantidadDispo - newMesaD.cantidad;
        await producto.save();

        res.status(201).json(newMesaD);
    } catch (error) {
        console.error('Error creating mesaDetalle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// BE CAREFUL
export const fetchMD = async (req, res) => {
    try {
        const MesaDetalles = await mesaD.find();
        res.status(200).json(MesaDetalles);
    } catch (error) {
        console.error('Error fetching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const fetchOneMD = async (req, res) => {
    try {
        const id = req.params.idMesa;
        const MesaDetalles = await mesaD.find({idMesa: id});
        res.status(200).json(MesaDetalles);
    } catch (error) {
        console.error('Error fetching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// USE WHEN UPDATING QUANTITY OF PRODUCT
export const updateMD = async (req, res) => {
    try {
        const id = req.params.idMesa; // El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        var mesaDet = await mesaD.find({ idProducto: req.body.idProducto }); // Buscar el producto por su nombre en lugar de por su ID
        mesaDet = mesaDet.find(mesaDet => mesaDet.idMesa == id);
        if (!mesaDet) {
            return res.status(404).json({ error: 'mesa not found' });
        }
        // Actualizar cantidad de producto en la base de datos
        const producto = await product.findOne({ idProducto :  mesaDet.idProducto});
        if (!producto) {
            return res.status(404).json({ error: 'product not found' });
        }
        producto.cantidadDispo = producto.cantidadDispo - req.body.cantidad;

        await producto.save();
        mesaDet.cantidad = mesaDet.cantidad + req.body.cantidad;
        mesaDet.total = mesaDet.cantidad * mesaDet.precio;
        if (mesaDet.cantidad == 0) {
            console.log('mesaDet.cantidad == 0');
            await mesaD.findByIdAndDelete(mesaDet._id);
        }else{
            await mesaDet.save();
        }
        res.status(200).json(mesaDet);
    } catch (error) {
        console.error('Error updating mesad:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// DO NOT USE, NOT NECESSARY
export const eraseMD = async (req, res) => {
    try {
        const id = req.params._id;
        const mesaDet = await product.findOne({ _id : id });
        if (!mesaDet) {
            return res.status(404).json({ error: 'mesa not found' });
        }
        await product.findByIdAndDelete(mesaDet._id);
        res.status(204).end();
    }
    catch (error) {
        console.error('Error deleting mesad:', error); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default {fetchMD , fetchOneMD, createMD, updateMD , eraseMD }; // This is the function that will be called in the route file.