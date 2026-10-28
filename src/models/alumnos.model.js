const alumnos = [
    { id: 1, nombre: 'Fernando Ruiz', cursoId: 1 },
    { id: 2, nombre: 'Joel Montes', cursoId: 1 },
    { id: 3, nombre: 'Marta Del Ojo', cursoId: 2 }
];

let siguienteId = alumnos.length + 1;

module.exports = {
    alumnos,
    siguienteId
};