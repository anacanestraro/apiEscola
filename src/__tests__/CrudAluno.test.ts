import server from "../server";
import request  from "supertest";


describe("Testes dos alunos", () =>{
    let alunoId: number;
    const novoAluno = {
        nome: "Aluno teste",
        email: `teste${Date.now()}@teste.com`,
        matricula: Date.now(),
        senha: "senha123",
        turmaId: 1
    };

        const alunoAtualizado = {
        email: `teste${Date.now()}@teste.com`,
    };
    it("Deve cadastrar um aluno", async() =>{
        const response = await request(server).post("/cadastrarAluno").send(novoAluno);

        expect(response.status).toBe(201);
        expect(response.body.novoAluno).toHaveProperty("id");
        alunoId = response.body.novoAluno.id;

        console.log(alunoId);
        

    });
    it("Deve buscar um aluno pelo id", async() =>{
        const response = await request(server).get(`/buscarAluno/${alunoId}`);

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe(novoAluno.nome);
    });

    
    it("Deve atualizar um aluno", async () => {

        const response = await request(server).put(`/atualizarAluno/${alunoId}`).send(alunoAtualizado);

        expect(response.status).toBe(200);
        expect(response.body.alunoAtualizado).toHaveProperty("email", alunoAtualizado.email);        
    });

    it("Deve deletar um aluno", async () => {
        const response = await request(server).delete(`/deletarAluno/${alunoId}`);

        expect(response.status).toBe(200);
    });
});