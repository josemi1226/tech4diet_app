const { generarDieta } = require('../external-services/gemini.service');
const Dieta = require('../models/dieta.model');
const Usuario = require('../models/usuario.model'); // Importa el modelo Usuario
const { response } = require('express');

const createDieta = async (req, res = response) => {
    const { uid } = req; // El middleware validarJWT añade el uid del usuario al request
    const datosFormulario = req.body; // Datos del formulario de Generador de Dietas
    const { grasas = 0, hidratos = 0, proteinas = 0 } = req.body;

    // Validar que la suma de grasas, hidratos y proteínas no exceda 100
    if (grasas + hidratos + proteinas > 100) {
        return res.status(400).json({
            ok: false,
            msg: 'La suma de grasas, hidratos y proteínas no puede exceder 100.',
        });
    }

    try {
        // Validación de campos obligatorios del formulario
        if (!datosFormulario.numeroComidas || !datosFormulario.objetivo) {
            return res.status(400).json({
                ok: false,
                msg: 'Faltan campos obligatorios como numeroComidas u objetivo.',
            });
        }

        // Busca los datos del usuario en la tabla Usuario
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado.',
            });
        }

        // Construye los datos para el prompt
        const datosUsuario = {
            ...datosFormulario,
            pesoActual: usuario.pesoActual,
            nivelActividad: usuario.plan.nivelActividad,
            altura: usuario.altura,
            sexo: usuario.sexo,
            caloriasDiarias: usuario.plan.caloriasDiarias,
            carbosDiarios: usuario.plan.carbosDiarios || 50, // Valor predeterminado si es null
            proteinasDiarias: usuario.plan.proteinasDiarias || 20, // Valor predeterminado si es null
            grasasDiarias: usuario.plan.grasasDiarias || 30, // Valor predeterminado si es null
        };

        // Generar dieta desde Gemini
        const respuestaGenerada = await generarDieta(datosUsuario);

        // Guardar dieta en la base de datos
        const nuevaDieta = new Dieta({
            ...datosFormulario,
            idUsuario: uid,
            dietaTexto: respuestaGenerada.resultado || respuestaGenerada, // según tu API
        });

        await nuevaDieta.save();

        // Responder con la dieta generada
        res.status(201).json({
            ok: true,
            msg: 'Dieta generada y guardada correctamente',
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