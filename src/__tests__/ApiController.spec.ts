import request from "supertest";
import server from "../server";

describe("Testes da API", () => {

describe("Testes de Cadastro de  Aluno", () => {
  it("Deve cadastrar um novo aluno na rota /cadastrarAluno", async () => {
    const novoAluno = {
      nome: "Luccas Kayure Crisanto",
      email: "lukinhas.silva@example.com",
      matricula: "123466516519875",
    };

    const response = await request(server)
      .post("/cadastrarAluno")
      .send(novoAluno);

    // Verifica se o status é 201 (Created)
    expect(response.status).toBe(201);
    // Verifica se a resposta contém a mensagem de sucesso
    expect(response.body.message).toBe("Aluno cadastrado com sucesso.");
    // Verifica se a resposta contém o aluno com as mesmas propriedades
    expect(response.body.novoAluno).toHaveProperty("nome", novoAluno.nome);
    expect(response.body.novoAluno).toHaveProperty("email", novoAluno.email);
    expect(response.body.novoAluno).toHaveProperty(
      "matricula",
      novoAluno.matricula
    );
  });
});

describe("Testes da Listagem de alunos", () => {
  it("Deve listar todos os alunos na rota /listarTodosAlunos", async () => {
    const response = await request(server).get("/listarTodosAlunos");

    // Verifica se a resposta tem o status 200
    expect(response.status).toBe(200);
    // Verifica se a resposta contém um array de alunos
    expect(Array.isArray(response.body)).toBe(true);
    // Verifica se o array de alunos contém ao menos um aluno
    expect(response.body.length).toBeGreaterThan(0);
  });
});