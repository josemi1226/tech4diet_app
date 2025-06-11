const Dieta = require('../models/dieta.model');
const { response } = require('express');

const createDieta = async (req, res = response) => {
    const { uid } = req; // El middleware validarJWT añade el uid del usuario al request
    const { grasas = 0, hidratos = 0, proteinas = 0, ...data } = req.body;

    // Validar que la suma de grasas, hidratos y proteínas no exceda 100
    if (grasas + hidratos + proteinas > 100) {
        return res.status(400).json({
            ok: false,
            msg: 'La suma de grasas, hidratos y proteínas no puede exceder 100.',
        });
    }

    try {
        // Crea una nueva dieta con el idUsuario del token
        const nuevaDieta = new Dieta({ ...data, idUsuario: uid });
        await nuevaDieta.save();

        res.status(201).json({
            ok: true,
            msg: 'Dieta creada correctamente',
            dieta: nuevaDieta,
        });
    } catch (error) {
        console.error('Error al crear la dieta:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la dieta',
        });
    }
};

module.exports = {
    createDieta,
};