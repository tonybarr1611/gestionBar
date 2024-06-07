import moongose from 'mongoose';

const mesaSchema = new moongose.Schema({
    idMesa: {
        type: Number,
        required: true,
        unique : true
    },
    status: {
        type: String,
        required: true,
    },
    
});

export default moongose.model('mesa', mesaSchema, 'mesas'); // The third argument is the name of the collection in the database. If it is not specified, it will be the plural of the first argument. In this case, it would be 'products'.