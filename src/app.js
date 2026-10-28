const express = require('express');
const app = express();
const cors = require('cors');
const cursosRouter = require('./routes/cursos.routes');
const alumnosRouter = require('./routes/alumnos.routes');
const logger = require('./middlewares/logger');

app.use(express.json());

//Aplicamos el CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

//Middleware propio
app.use(logger);

//Rutas
app.get('/', (req, res) => res.send('API funcionando'));
app.use('/cursos', cursosRouter);
app.use('/cursos/:cursoId/alumnos', alumnosRouter);

//En el final
app.use(require('./middlewares/manejadorErrores'));
module.exports = app;