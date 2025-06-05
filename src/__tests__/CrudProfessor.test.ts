import server from '../server';
import request from 'supertest';

describe('Testes dos professores', () => {
    let professorId: number;
    const novoProfessor = {
        nome: "Professor Teste",
        email: `Professor${Date.now()}@teste.com`,
        senha: "senha123",
        siape: Date.now()
    }

    const professorAtualizado = {
        nome: "Professor teste atualizado"
    }

    it('Deve cadastrar um professor', async() => {
        const response = await request(server).post("/cadastrarProfessor").send(novoProfessor);

        expect(response.status).toBe(201);
        professorId = response.body.novoProfessor.id;
    });

    it('Deve atualizar um professor', async() => {
        const response = await request(server).put(`/atualizarProfessor/${professorId}`).send(professorAtualizado);
        expect(response.status).toBe(200);
        expect(response.body.professorAtualizado).toHaveProperty("nome", professorAtualizado.nome);
    });

    it("Deve deletar um aluno", async () => {
        const response = await request(server).delete(`/deletarProfessor/${professorId}`);
        expect(response.status).toBe(200);
    })
})
