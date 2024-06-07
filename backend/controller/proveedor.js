import mongoose from 'mongoose';

import proveedor from '../models/proveedorModel.js';

export const createS = async (req, res) => {
    try {
        console.log(req.body);
        const newProveedor = new proveedor({
            idProveedor: req.body.idProveedor,
            nombre: req.body.nombre,
            correo: req.body.correo,
            telefono: req.body.telefono,
            
        });
        await newProveedor.save();
        res.status(201).json(newProveedor);
    } catch (error) {
        console.error('Error creating proveedor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const fetchS = async (req, res) => {
    try {
        const proveedores = await proveedor.find();
        res.status(200).json(proveedores);
    } catch (error) {
        console.error('Error fetching proveedores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateS = async (req, res) => {
    try {
        const id = req.params.idProveedor; // El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const proveedorn = await proveedor.findOne({ idProveedor: id }); // Buscar el producto por su nombre en lugar de por su ID
        if (!proveedorn) {
            return res.status(404).json({ error: 'proveedor not found' });
        }
        proveedorn.nombre = req.body.nombre;
        proveedorn.correo = req.body.correo;
        proveedorn.telefono = req.body.telefono;
        await proveedorn.save();
        res.status(200).json(proveedorn);
    } catch (error) {
        console.error('Error updating proveedor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const eraseS = async (req, res) => {
    try {
        const id = req.params.idProveedor;
        const proveedore = await proveedor.findOne({ idProveedor : id });
        if (!proveedore) {
            return res.status(404).json({ error: 'proveedor not found' });
        }
        await proveedor.findByIdAndDelete(proveedore._id);
        res.status(204).end();
    }
    catch (error) {
        console.error('Error deleting proveedor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default {fetchS , createS, updateS , eraseS }; // This is the function that will be called in the route file