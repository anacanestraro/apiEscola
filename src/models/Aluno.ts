import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

// 🔹 Criamos a classe `Aluno`, que estende `Model`.
// Essa classe serve apenas para definir a estrutura dos dados que essa entidade terá no TypeScript.
// Ou seja, define a tipagem dos atributos, mas ainda não os conecta ao Sequelize.
export class Aluno extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public matricula!: string;
}

// 🔹 Aqui é onde realmente informamos ao Sequelize como a tabela "alunos" deve ser criada no banco de dados.
// 1️⃣ O primeiro parametro define os atributos da tabela e suas regras (tipos, se são únicos, se podem ser nulos, etc.).
// 2️⃣ O segundo parametro configurações gerais da tabela, como nome e timestamps.
Aluno.init(
  {
    // 🔹 Definição dos atributos da tabela no banco de dados
    id: {
      type: DataTypes.INTEGER, // Define como um número inteiro
      primaryKey: true, // Define como chave primária
      autoIncrement: true, // Faz o ID ser gerado automaticamente pelo banco
    },
    nome: {
      type: DataTypes.STRING, // Define como string (VARCHAR no banco)
      allowNull: false, // O nome não pode ser nulo
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // O email deve ser único
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      unique: true, // A matrícula também deve ser única
      allowNull: false,
    },
  },
  {
    sequelize, // 🔹 Aqui passamos a instância do Sequelize, conectando essa model ao banco
    tableName: "alunos", // Define o nome da tabela no banco de dados
    paranoid:true,
    timestamps: true, // Como não queremos colunas de "createdAt" e "updatedAt", desativamos timestamps
  }
);
