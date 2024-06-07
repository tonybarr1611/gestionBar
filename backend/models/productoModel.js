import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    idProducto: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {   
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    cantidadDispo: {
        type: Number,
        required: true,
    }

});

export default mongoose.model('product', productSchema, 'productos'); // The third argument is the name of the collection in the database. If it is not specified, it will be the plural of the first argument. In this case, it would be 'products'.