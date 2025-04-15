import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";
import { AlunoDisciplina } from "./AlunoDisciplina";

// 🔹 Criando a relação muitos-para-muitos entre Aluno e Disciplina
// Um aluno pode estar matriculado em várias disciplinas
// E uma disciplina pode ter vários alunos

Aluno.belongsToMany(Disciplina, { 
    through: AlunoDisciplina, // Tabela intermediária (tabela de junção)
    foreignKey: "alunoId" // Chave estrangeira que referencia a tabela alunos
});

Disciplina.belongsToMany(Aluno, { 
    through: AlunoDisciplina, // Tabela intermediária (tabela de junção)
    foreignKey: "disciplinaId" // Chave estrangeira que referencia a tabela disciplinas
});

console.log("✅ Relações entre models configuradas!");

