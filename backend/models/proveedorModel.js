import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    nombre: {   
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    
    telefono: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('proveedor', proveedorSchema, 'proveedores'); // The third argument is the name of the collection in the database. If it is not specified, it will be the plural of the first argument. In this case, it would be 'products'.