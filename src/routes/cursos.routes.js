const express = require('express');
const router = express.Router();
const ErrorHTTP = require('../controllers/ErrorHTTP');
const cursoSchema = require('../schemas/curso.schema');
const validar = require('../middlewares/validar');
const cursosModel = require('../models/cursos.model');

router.get('/', (req, res, next) => {
    try {
        res.json(cursosModel.cursos);

    } catch (error) {
        
        next(error);
        
    } 
});

router.get('/:id', (req, res, next) => {
    try {
        //Guardamos el id del curso
        const cursoId = Number(req.params.id);

        //Por si el usuario introduce un id de curso inválido
        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const curso = cursosModel.cursos.find(curso => curso.id === cursoId);

        //Si no existe un curso con dicho id
        if (!curso) {
            return next (new ErrorHTTP(404, 'Curso no encontrado.'));
        }

        //Devolvemos el alumno
        res.json(curso);

    } catch (error) {
        
        next(error);
        
    }
});

router.post('/', validar(cursoSchema), (req, res, next) => { 
    try {
        const nuevo = {
            id: cursosModel.siguienteId++,
            titulo: req.body.titulo
        };

        cursosModel.cursos.push(nuevo);
        res.status(201).json(nuevo);

    } catch (error) {
        next(error);
    }
});

//Reemplazo total
router.put('/:id', validar(cursoSchema), (req, res, next) => { 
  try {

    const cursoId = Number(req.params.id);
    
    if(!Number.isInteger(cursoId) || cursoId <= 0) {
      return next(new ErrorHTTP(400, 'El id introducido no es válido.'));
    }

    const curso = cursosModel.cursos.find(curso => curso.id === cursoId);
    
    if (!curso) {
      return next(new ErrorHTTP(404, 'Curso no encontrado.'));
    }
    
    const index = cursosModel.cursos.findIndex(curso => curso.id === cursoId);

    cursosModel.cursos[index] = {
    id: cursoId,
    titulo: req.body.titulo
    };

    res.json(cursosModel.cursos[index]);

  } catch (error) {
      next(error);
  }
});

router.patch('/:id', validar(cursoSchema), (req, res, next) => {
  try {

    const cursoId = Number(req.params.id);
    
    if(!Number.isInteger(cursoId) || cursoId <= 0) {
      return next(new ErrorHTTP(400, 'El id introducido no es válido.'));
    }

    const curso = cursosModel.cursos.find(curso => curso.id === cursoId);
    
    if (!curso) {
      return next(new ErrorHTTP(404, 'Curso no encontrado.'));
    }
    
    const index = cursosModel.cursos.findIndex(curso => curso.id === cursoId);

    cursosModel.cursos[index] = {
    id: cursoId,
    titulo: req.body.titulo
    };

    res.json(cursosModel.cursos[index]);

  } catch (error) {
      next(error);
  } 
});

router.delete('/:id', (req, res, next) => {
    try {
        const cursoId = Number(req.params.id);

        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const index = cursosModel.cursos.findIndex(
            curso => curso.id === cursoId
        );

        if (index === -1) {
          return next(new ErrorHTTP(404, 'Curso no encontrado.'))
        }

        const cursoEliminado = cursosModel.cursos.splice(index, 1)[0];

        res.status(200).json({
            mensaje: 'Curso eliminado con éxito.',
            curso: cursoEliminado,
            cursos: cursosModel.cursos
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;