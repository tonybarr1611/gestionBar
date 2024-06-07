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

export const fetchMD = async (req, res) => {
    try {
        const MesaDetalles = await MesaD.find();
        res.status(200).json(MesaDetalles);
    } catch (error) {
        console.error('Error fetching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateMD = async (req, res) => {
    try {
        const id = req.params.idMesa; // El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const mesaDet = await mesaD.findOne({ idMesa: id }); // Buscar el producto por su nombre en lugar de por su ID
        if (!mesaDet) {
            return res.status(404).json({ error: 'mesa not found' });
        }
        
        mesaDet.idProducto = req.body.idProducto;
        mesaDet.cantidad = req.body.cantidad;
        mesaDet.precio = req.body.precio;
        mesaDet.total = req.body.cantidad * req.body.precio;
        await mesaDet.save();
        res.status(200).json(mesaDet);
    } catch (error) {
        console.error('Error updating mesad:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
export default {fetchMD , createMD, updateMD , eraseMD }; // This is the function that will be called in the route file.