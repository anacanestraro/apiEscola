import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";
import { AlunoDisciplina } from "./AlunoDisciplina";
import { Turma } from "./Turma";
import { Curso } from "./Curso";
import { Professor } from "./Professor";
import { Nota } from "./Nota";
import { Presenca } from "./Presenca";
Aluno.belongsToMany(Disciplina, { 
    through: AlunoDisciplina,
    foreignKey: "alunoId" 
});

Disciplina.belongsToMany(Aluno, { 
    through: AlunoDisciplina, 
    foreignKey: "disciplinaId" 
});

// TURMA/CURSO
Curso.hasMany(Turma, {
    foreignKey: "cursoId"
});
Turma.belongsTo(Curso, {
    foreignKey: "cursoId"
});

// TURMA/ALUNO
Turma.hasMany(Aluno, {
    foreignKey: "turmaId"
});
Aluno.belongsTo(Turma, {
    foreignKey: "turmaId"
});

// PROFESSOR/DISCIPLINA
Professor.hasMany(Disciplina, {
    foreignKey: "professorId"
});
Disciplina.belongsTo(Professor, {
    foreignKey: "professorId"
});

// NOTA/ALUNO/DISCIPLINA
Aluno.hasMany(Nota, {
    foreignKey: "alunoId"
});
Disciplina.hasMany(Nota, {
    foreignKey: "disciplinaId"
});
Nota.belongsTo(Aluno, {
    foreignKey: "alunoId"
});
Nota.belongsTo(Disciplina, {
    foreignKey: "alunoId"
});

// PRESENÇA/ALUNO/DISCIPLINA
Aluno.hasMany(Presenca, {
    foreignKey: "alunoId"
});
Disciplina.hasMany(Presenca, {
    foreignKey: "disciplinaId"
});
Presenca.belongsTo(Aluno, {
    foreignKey: "alunoId"
});
Presenca.belongsTo(Disciplina, {
    foreignKey: "alunoId"
});

console.log("✅ Relações entre models configuradas!");

