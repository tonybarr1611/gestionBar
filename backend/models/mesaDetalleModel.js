import mongoose from 'mongoose';

const mesaDetalleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    idMesa: {
        type: Number,
        required: true,
    },
    idProducto: {
        type: Number,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    
});

export default mongoose.model('mesaDetalle', mesaDetalleSchema, 'mesasDetalles'); // The third argument is the name of the collection in the database. If it is not specified, it will be the plural of the first argument. In this case, it would be 'products'.