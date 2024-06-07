import mongoose from 'mongoose';

const reciboSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    idRecibo : {
        type: Number,
        required: true,
        unique : true
    },
    fecha: {
        type: Date,
        required: true,
    },
    monto: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    comprador: {
        type: String,
        required: true,
    },
  });

  export default mongoose.model('recibo', reciboSchema, 'recibos'); // The third argument is the name of the collection in the database. If it is not specified, it will be the plural of the first argument. In this case, it would be 'products'.