const express = require('express');
const router = express.Router();
const controller = require('../controllers/professorController');

router.get('/', controller.listarTodos);

router.get('/departamento/:departamento', controller.listarPorDepartamento);

router.get('/:id', controller.buscarPorId);

router.get('/:id/turmas', controller.listarTurmasDoProfessor);

router.post('/:id/turmas', controller.adicionarTurma);

router.put('/:id', controller.atualizarProfessor);

router.delete('/:id', controller.removerProfessor);

module.exports = router;