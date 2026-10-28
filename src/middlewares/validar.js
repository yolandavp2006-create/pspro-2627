function validar(esquema) {
    return (req, res, next) => {
        const resultado = esquema.safeParse(req.body);
        
        if(!resultado.success) {
            return res.status(400).json({ errores: resultado.error.issues.map(i => i.message) });
        }
        req.body = resultado.data;
        next();
    };
}

module.exports = validar;