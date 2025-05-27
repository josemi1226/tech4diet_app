const Dieta = require('../models/dieta.model');
const { response } = require('express');

const createDieta = async (req, res = response) => {
    const { uid } = req; // El middleware validarJWT añade el uid del usuario al request
    const { ...data } = req.body;

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