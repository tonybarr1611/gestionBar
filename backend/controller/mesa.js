import mongoose from 'mongoose';

import mesa from '../models/mesaModel.js';



export const fetchM = async (req, res) => {
    try {
        const mesas = await mesa.find();
        res.status(200).json(mesas);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createM = async (req, res) => {
    console.log(req.body);
    try {
        const newMesa = new mesa({
            _id: new mongoose.Types.ObjectId(),
            idMesa: req.body.idMesa,
            status: 1
        });
        await newMesa.save();
        res.status(201).json(newMesa);
    } catch (error) {
        console.error('Error creating mesa :', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteM = async (req, res) => {

    try {
        const mesaId = req.params.idMesa;
        const Dmesa = await mesa.findOne({ idMesa: mesaId });
        if (!Dmesa) {
            return res.status(404).json({ error: 'mesa not found' });
        }
        await mesa.findByIdAndDelete(Dmesa._id);
        res.status(200).json(Dmesa);
    } catch (error) {
        console.error('Error deleting mesa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const cambiarEstado = async (req, res) => {
    try {
        const mesaId = req.params.idMesa; // El nombre del producto a actualizar se obtiene de los parámetros de la solicitud
        const Dmesa = await mesa.findOne({ idMesa: mesaId }); // Buscar el producto por su nombre en lugar de por su ID
        if (!Dmesa) {
            return res.status(404).json({ error: 'product not found' });
        }
        console.log(Dmesa);
        if (Dmesa.status === '1') {
            console.log('entro al if');
            Dmesa.status = '0';
        } else {
            Dmesa.status = '1';
        }
        await Dmesa.save();
        res.status(200).json(Dmesa);
        }
    catch (error) {
        console.error('Error updating mesa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default { fetchM, cambiarEstado , deleteM, createM}; // This is the function that will be called in the route file.