const { z } = require('zod');

const cursoSchema = z.object({
    titulo: z.string().min(2, 'El título debe tener al menos 2 caracteres.')
});

module.exports = cursoSchema;