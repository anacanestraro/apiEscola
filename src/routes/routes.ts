import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController'
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController'
import * as CursoController from "../controllers/CursoController";
import * as TurmaController from "../controllers/TurmaController";

const router = Router();

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/buscarAlunoId/:alunoId', AlunoController.buscarAluno)

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.post("/vincularAlunoADisciplina", AlunoDisciplinaController.vincularAlunoADisciplina);
router.get("/listarDisciplinasDoAluno/:alunoId", AlunoDisciplinaController.listarDisciplinasDoAluno);

router.get('/listarTodosCursos', CursoController.listarCursos);
router.post('/cadastrarCurso', CursoController.cadastrarCurso);
router.put('/atualizarCurso/:cursoId', CursoController.atualizaCurso);
router.delete('/deletarCurso/:cursoId', CursoController.deletarCurso);
router.get('/buscarCurso/:cursoId', CursoController.buscarCurso);

router.get('/listarTodasTurmas', TurmaController.listarTurmas);
router.post('/cadastrarTurma', TurmaController.cadastrarTurma);
export default router;


