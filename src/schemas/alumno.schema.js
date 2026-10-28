const { z } = require('zod');

const alumnoSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres')
});

module.exports = alumnoSchema;