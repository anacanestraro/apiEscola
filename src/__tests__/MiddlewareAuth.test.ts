import server from "../server";
import request  from "supertest";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'senha-secreta';

describe ('Rotas', () => {
    const tokenProfessor = jwt.sign({ id: 1, nome: 'Prof', tipo: 'professor' }, JWT_SECRET);
    const tokenAluno = jwt.sign({ id: 1, nome: 'Aluno', tipo: 'aluno' }, JWT_SECRET);
    const tokenInvalido = 'token-invalido-123';

    it('🟢 Token válido Professor → acesso permitido (403)', async () =>{
        const res = await request(server).get('/listarTodosAlunos').set('Authorization', `Bearer ${tokenProfessor}`);
        expect(res.statusCode).toBe(200);
    })

    it('🔴 Token inválido → acesso negado (403)', async () =>{
        const res = await request(server).get('/listarTodosAlunos').set('Authorization', `Bearer ${tokenAluno}`);
        expect(res.statusCode).toBe(403);
    })

    it('🔴 Token ausente → acesso negado (401)', async () =>{
        const res = await request(server).get('/listarTodosAlunos');
        expect(res.statusCode).toBe(401);
    })

    it('🔴 Token inválido (string qualquer) → acesso negado (403)', async () => {
        const res = await request(server)
            .get('/listarTodosAlunos')
            .set('Authorization', `Bearer ${tokenInvalido}`);
        expect(res.statusCode).toBe(403);
    });

})