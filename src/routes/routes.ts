import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController'
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController'
import * as CursoController from "../controllers/CursoController";
import * as TurmaController from "../controllers/TurmaController";
import * as ProfessorController from "../controllers/ProfessorController";
import * as NotaController from "../controllers/NotaController";

const router = Router();

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/buscarAlunoId/:alunoId', AlunoController.buscarAluno)

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController.deletarDisciplina);
router.get('/buscarDisciplina/:disciplinaId', DisciplinaController.buscarDisciplina);

router.post("/vincularAlunoADisciplina", AlunoDisciplinaController.vincularAlunoADisciplina);
router.get("/listarDisciplinasDoAluno/:alunoId", AlunoDisciplinaController.listarDisciplinasDoAluno);
router.put("/atualizarVinculoAlunoDisciplina/:vinculoId", AlunoDisciplinaController.atualizarVinculoAlunoDisciplina);
router.delete("/deletarVinculoAlunoDisciplina/:vinculoId", AlunoDisciplinaController.deletarVinculoAlunoDisciplina);

router.get('/listarTodosCursos', CursoController.listarCursos);
router.post('/cadastrarCurso', CursoController.cadastrarCurso);
router.put('/atualizarCurso/:cursoId', CursoController.atualizaCurso);
router.delete('/deletarCurso/:cursoId', CursoController.deletarCurso);
router.get('/buscarCurso/:cursoId', CursoController.buscarCurso);

router.get('/listarTodasTurmas', TurmaController.listarTurmas);
router.post('/cadastrarTurma', TurmaController.cadastrarTurma);
router.put('/atualizarTurma/:turmaId', TurmaController.atualizarTurma);
router.delete('/deletarTurma/:turmaId', TurmaController.deletarTurma);
router.get('/buscarTurma/:turmaId', TurmaController.buscarTurma);

router.get('/listarTodosProfessores', ProfessorController.listarProfessores);
router.post('/cadastrarProfessor', ProfessorController.cadastrarProfessor);
router.put('/atualizarProfessor/:professorId', ProfessorController.atualizarProfessor);
router.delete('/deletarProfessor/:professorId', ProfessorController.deletarProfessor);
router.get('/buscarProfessor/:professorId', ProfessorController.buscarProfessor);

router.get('/listarTodasNotas', NotaController.listarNotas);
router.post('/cadastrarNota', NotaController.cadastrarNotas);
router.put('/atualizarNota/:notaId', NotaController.atualizarNota);
router.delete('/deletarNota/:notaId', NotaController.deletarNota);


export default router;


