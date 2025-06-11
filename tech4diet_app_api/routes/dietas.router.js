const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');
const { createDieta } = require('../controllers/dietas.controller');

const router = Router();

router.post('/', [
    validarJWT,
    check('objetivo', 'El objetivo es obligatorio').not().isEmpty(),
    check('tipoDieta', 'El tipo de dieta es obligatorio').isArray({ min: 1 }),
    check('numeroComidas', 'El número de comidas es obligatorio y debe ser numérico').isNumeric(),
    validarCampos,
], createDieta);

module.exports = router;