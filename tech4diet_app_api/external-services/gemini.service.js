const axios = require('axios');
const { base_url, api_key } = require('../config/gemini.config');

const generarDieta = async (datosUsuario) => {
    try {
        const prompt = `
Genera una dieta personalizada basada en los siguientes datos:
- Objetivo: ${datosUsuario.objetivo}
- Tipo de dieta: ${datosUsuario.tipoDieta.join(', ')}
- Restricciones: ${datosUsuario.restricciones.join(', ')}
- Número de comidas: ${datosUsuario.numeroComidas}
- Macronutrientes: Grasas (${datosUsuario.grasas}%), Hidratos (${datosUsuario.hidratos}%), Proteínas (${datosUsuario.proteinas}%)
- Alimentos favoritos: ${datosUsuario.alimentosFavoritos}
- Alimentos eliminados: ${datosUsuario.alimentosEliminados}
- Peso actual: ${datosUsuario.pesoActual}
        `;

        const response = await axios.post(
            `${base_url}?key=${api_key}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error al generar la dieta:', error.response?.data || error.message);
        throw new Error('No se pudo generar la dieta');
    }
};

module.exports = { generarDieta };
