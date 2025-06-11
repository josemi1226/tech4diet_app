const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const DietaSchema = Schema(
    {
        objetivo: {
            type: String,
            required: true,
        },
        tipoDieta: {
            type: [String],
            required: true,
        },
        restricciones: {
            type: [String],
        },
        numeroComidas: {
            type: Number,
            required: true,
        },
        grasas: {
            type: Number,
            //required: true,
        },
        hidratos: {
            type: Number,
            //required: true,
        },
        proteinas: {
            type: Number,
            //required: true,
        },
        alimentosFavoritos: {
            type: String,
        },
        alimentosEliminados: {
            type: String,
        },
        idUsuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
        dietaTexto: { type: String, required: true }, // Aquí guardas el texto generado
    },
    { collection: 'dietas' }
);

DietaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Dieta', DietaSchema);