import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";
import { AlunoDisciplina } from "./AlunoDisciplina";
import { Turma } from "./Turma";
import { Curso } from "./Curso";
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


console.log("✅ Relações entre models configuradas!");

