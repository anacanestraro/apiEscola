import server from "../server";
import request from "supertest";
import bcrypt from 'bcrypt';
import { Aluno } from "../models/Aluno";
import { Professor } from "../models/Professor";
import jwt from 'jsonwebtoken';

let alunoTeste: any;
let professorTeste: any;
const JWT_SECRET = process.env.JWT_SECRET || 'senha-secreta';
describe('Testes de Login - Integração Real', () => {

    beforeAll(async () => {
        // Cria usuários de teste no banco de dados real
        const senhaCriptografada = await bcrypt.hash('senha123', 10);
        const senhaErradaCriptografada = await bcrypt.hash('senhaErrada', 10);

        // Aluno para testes de sucesso
        alunoTeste = await Aluno.create({
            nome: "Aluno Teste",
            matricula: "MAT123",
            senha: senhaCriptografada,
            email: "aluno.teste@email.com",
            turmaId: 1
        });

        // Professor para testes de sucesso
        professorTeste = await Professor.create({
            nome: "Professor Teste",
            siape: "SIAPE123",
            senha: senhaCriptografada,
            email: "prof.teste@email.com"
        });

        // Professor com senha errada
        await Professor.create({
            nome: "Professor Senha Errada",
            siape: "SIAPE456",
            senha: senhaErradaCriptografada,
            email: "prof.senhaerrada@email.com"
        });
    });

    afterAll(async () => {
        // Limpa os dados de teste
        await Aluno.destroy({ where: { matricula: alunoTeste.matricula }, force: true });
        await Professor.destroy({ where: { siape: ["SIAPE123", "SIAPE456"] }, force: true });
    });

    it('🟢 Login bem-sucedido como aluno → status 200 + token', async () => {
        const response = await request(server)
            .post('/login')
            .send({
                identificador: alunoTeste.matricula,
                senha: 'senha123'
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();

        // Verifica se o token é válido
        const decoded = jwt.verify(response.body.token, JWT_SECRET) as any;
        expect(decoded.id).toBe(alunoTeste.id);
        expect(decoded.nome).toBe(alunoTeste.nome);
        expect(decoded.tipo).toBe('aluno');
    });

    it('🟢 Login bem-sucedido como professor → status 200 + token', async () => {
        const response = await request(server)
            .post('/login')
            .send({
                identificador: professorTeste.siape,
                senha: 'senha123'
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.message).toBe('Usuario logado com sucesso.');

        // Verifica se o token é válido
        const decoded = jwt.verify(response.body.token, JWT_SECRET) as any;
        expect(decoded.id).toBe(professorTeste.id);
        expect(decoded.nome).toBe(professorTeste.nome);
        expect(decoded.tipo).toBe('professor');
    });

    it('🔴 Login com senha incorreta → status 401', async () => {
        const response = await request(server)
            .post('/login')
            .send({
                identificador: professorTeste.siape,
                senha: 'senhaErrada'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Senha inválida');
    });

    it('🔴 Login com usuário inexistente → status 400', async () => {
        const response = await request(server)
            .post('/login')
            .send({
                identificador: 'INEXISTENTE',
                senha: 'senha123'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Identificador inválido');
    });

    it('🔴 Login com professor que tem senha errada → status 401', async () => {
        const response = await request(server)
            .post('/login')
            .send({
                identificador: 'SIAPE456',
                senha: 'senha123' // Senha correta seria 'senhaErrada'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Senha inválida');
    });
});