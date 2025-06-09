import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController'
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController'
import * as CursoController from "../controllers/CursoController";
import * as TurmaController from "../controllers/TurmaController";
import * as ProfessorController from "../controllers/ProfessorController";
import * as NotaController from "../controllers/NotaController";
import * as PresencaController from "../controllers/PresencaController";
import * as auth from "../controllers/authController";

import { autenticarAluno, autenticarProfessor, autenticarToken } from '../middlewares/auth';

const router = Router();

router.get('/listarTodosAlunos', autenticarProfessor, AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/buscarAluno/:alunoId', AlunoController.buscarAluno);
router.get('/notasPorAluno/:alunoId', AlunoController.notasPorAlunos);
router.get('/presencasPorAluno/:alunoId', AlunoController.presencasPorAluno);
router.get('/situacaoPorAluno/:alunoId', autenticarProfessor, AlunoController.situacaoAluno);

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController.deletarDisciplina);
router.get('/buscarDisciplina/:disciplinaId', DisciplinaController.buscarDisciplina);
// router.get('/listarAlunosReprovados/:disciplinaId', DisciplinaController.listarAlunosReprovados);

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

router.get('/listarTodosProfessores', autenticarToken, ProfessorController.listarProfessores);
router.post('/cadastrarProfessor', ProfessorController.cadastrarProfessor);
router.put('/atualizarProfessor/:professorId', ProfessorController.atualizarProfessor);
router.delete('/deletarProfessor/:professorId', ProfessorController.deletarProfessor);
router.get('/buscarProfessor/:professorId', autenticarToken, ProfessorController.buscarProfessor);

router.get('/listarTodasNotas', NotaController.listarNotas);
router.post('/cadastrarNota', NotaController.cadastrarNotas);
router.put('/atualizarNota/:notaId', NotaController.atualizarNota);
router.delete('/deletarNota/:notaId', NotaController.deletarNota);

router.get('/listarTodasPresencas', PresencaController.listarPresencas);
router.post('/cadastrarPresenca', PresencaController.cadastrarPresenca);
router.put('/atualizarPresenca/:presencaId', PresencaController.atualizarPresenca);
router.delete('/deletarPresenca/:presencaId', PresencaController.deletarPresenca);

router.post('/login', auth.login);

export default router;


