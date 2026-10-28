const express = require('express');
const router = express.Router({ mergeParams: true });
const ErrorHTTP = require('../controllers/ErrorHTTP');
const alumnoSchema = require('../schemas/alumno.schema');
const validar = require('../middlewares/validar');
const alumnosModel = require('../models/alumnos.model');
const cursosModel = require('../models/cursos.model');

router.get('/', (req, res, next) => {
    try {
        //Guardamos el id del curso dentro del que se está buscando
        const cursoId = Number(req.params.cursoId);

        //Por si el usuario introduce un id inválido
        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const curso = cursosModel.cursos.find(curso => curso.id === cursoId);

        if (!curso) {
            return next(new ErrorHTTP(404, 'Curso no encontrado.'));
        }

        //Filtramos los alumnos del curso en el que estamos mirando
        const alumnosDelCurso = alumnosModel.alumnos.filter(
        alumno => alumno.cursoId === cursoId
        );

        //Devolvemos los alumnos del curso
        res.json(alumnosDelCurso);

    } catch (error) {
        
        next(error);
        
    } 
});

router.get('/:id', (req, res, next) => {
    try {
        //Guardamos el id del curso dentro del que se está buscando
        const cursoId = Number(req.params.cursoId);
        //Guardamos también el id del alumno que se busca
        const alumnoId = Number(req.params.id);

        //Por si el usuario introduce un id de curso inválido
        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const curso = cursosModel.cursos.find(curso => curso.id === cursoId);

        if (!curso) {
            return next(new ErrorHTTP(404, 'Curso no encontrado.'));
        }

        if (!Number.isInteger(alumnoId) || alumnoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del alumno no es válido.'));
        }

        //Filtramos los alumnos del curso en el que estamos mirando y encontramos el alumno del id introducido
        const alumno = alumnosModel.alumnos.find(
            alumno =>
                alumno.id === alumnoId &&
                alumno.cursoId === cursoId
        );

        //Si no existe un alumno con dicho id
        if (!alumno) {
            return next (new ErrorHTTP(404, 'Alumno no encontrado.'));
        }

        //Devolvemos el alumno
        res.json(alumno);

    } catch (error) {
        
        next(error);
        
    }
});

router.post('/', validar(alumnoSchema), (req, res, next) => { 
    try {

        const cursoId = Number(req.params.cursoId);
        
        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const curso = cursosModel.cursos.find(curso => curso.id === cursoId);

        if (!curso) {
            return next(new ErrorHTTP(404, 'Curso no encontrado.'));
        }

        const nuevo = {
            id: alumnosModel.siguienteId++,
            nombre: req.body.nombre,
            cursoId
        };

        alumnosModel.alumnos.push(nuevo);
        res.status(201).json(nuevo);

    } catch (error) {
        next(error);
    }
});

//Reemplazo total
router.put('/:id', validar(alumnoSchema), (req, res, next) => { 
    try {
        const cursoId = Number(req.params.cursoId);
        const alumnoId = Number(req.params.id);

        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const curso = cursosModel.cursos.find(curso => curso.id === cursoId);

        if (!curso) {
            return next(new ErrorHTTP(404, 'Curso no encontrado.'));
        }

        if (!Number.isInteger(alumnoId) || alumnoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del alumno no es válido.'));
        }

        const index = alumnosModel.alumnos.findIndex(
            alumno => alumno.id === alumnoId && alumno.cursoId === cursoId
        );

        if (index === -1) {
            return next(new ErrorHTTP(404, 'Alumno no encontrado.'));
        }

        alumnosModel.alumnos[index] = {
            id: alumnoId,
            nombre: req.body.nombre,
            cursoId
        };
        
        res.json(alumnosModel.alumnos[index]);
    } catch (error) {
        next(error);
    } 
});

router.patch('/:id', validar(alumnoSchema), (req, res, next) => {
    try {
        const cursoId = Number(req.params.cursoId);
        const alumnoId = Number(req.params.id);

        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const curso = cursosModel.cursos.find(curso => curso.id === cursoId);

        if (!curso) {
            return next(new ErrorHTTP(404, 'Curso no encontrado.'));
        }

        if (!Number.isInteger(alumnoId) || alumnoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del alumno no es válido.'));
        }

        const index = alumnosModel.alumnos.findIndex(
            alumno => alumno.id === alumnoId && alumno.cursoId === cursoId
        );

        if (index === -1) {
            return next(new ErrorHTTP(404, 'Alumno no encontrado.'));
        }

        alumnosModel.alumnos[index] = {
            id: alumnoId,
            nombre: req.body.nombre,
            cursoId
        };
        
        res.json(alumnosModel.alumnos[index]);
    } catch (error) {
        next(error);
    }    
});

router.delete('/:id', (req, res, next) => {
    try {
        const cursoId = Number(req.params.cursoId);
        const alumnoId = Number(req.params.id);

        if (!Number.isInteger(cursoId) || cursoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del curso no es válido.'));
        }

        const curso = cursosModel.cursos.find(curso => curso.id === cursoId);

        if (!curso) {
            return next(new ErrorHTTP(404, 'Curso no encontrado.'));
        }

        if (!Number.isInteger(alumnoId) || alumnoId <= 0) {
            return next(new ErrorHTTP(400, 'El id del alumno no es válido.'));
        }

        //Comprobamos que el alumno exista
        const index = alumnosModel.alumnos.findIndex(
        alumno => alumno.id === alumnoId && alumno.cursoId === cursoId
        );

        if (index === -1) {
            return next(new ErrorHTTP(404, 'Alumno no encontrado.'));
        }

        //Lo eliminamos
        const alumnoEliminado = alumnosModel.alumnos.splice(index, 1)[0];
        res.status(200).json({
            mensaje: 'Alumno eliminado con éxito.',
            alumno: alumnoEliminado,
            alumnos: alumnosModel.alumnos
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;