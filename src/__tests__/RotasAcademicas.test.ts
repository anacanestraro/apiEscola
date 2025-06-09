import server from "../server";
import request from "supertest";
import jwt from "jsonwebtoken";
import { response } from "express";


const JWT_SECRET = process.env.JWT_SECRET || "senha-secreta";

describe('Testes de funcionalidades ', () => {
    const tokenProfessor = jwt.sign({tipo: "professor"}, JWT_SECRET);
    const tokenAluno = jwt.sign({tipo: "aluno"}, JWT_SECRET);

    it('NotasPorAluno - deve retornar notas de um aluno', async () =>{
        const response = await request(server)
        .get('/notasPorAluno/1')
        .set('Authorization', `Bearer ${tokenProfessor}`);
        expect(response.status).toBe(200);
    });
    it('NotasPorAluno - deve retornar erro aluno inexistente', async () =>{
        const response = await request(server)
        .get('/notasPorAluno/91299239')
        .set('Authorization', `Bearer ${tokenProfessor}`);
        expect(response.status).toBe(404);
    }); 

    it('PresencasPorAluno - deve retornar as presencas de uma aluno', async () =>{
        const response = await request(server)
        .get('/presencasPorAluno/1')
        .set('Authorization', `Bearer ${tokenProfessor}`);
        expect(response.status).toBe(200);
    });

    it('PresencasPorAluno - deve retornar erro aluno inexistente', async () =>{
        const response = await request(server)
        .get('/presencasPorAluno/928393')
        .set('Authorization', `Bearer ${tokenProfessor}`);
        expect(response.status).toBe(404);
    });

    it('SituacaoPorAluno - deve retornar a situação de um aluno', async() => {
        const response = await request(server)
        .get('/situacaoPorAluno/1')
        .set('Authorization', `Bearer ${tokenProfessor}`);
        expect(response.status).toBe(200);
    })

    it('SituacaoPorAluno - deve retornar erro aluno inexistente', async() => {
        const response = await request(server)
        .get('/situacaoPorAluno/39898439')
        .set('Authorization', `Bearer ${tokenProfessor}`);
        expect(response.status).toBe(404);
    })

});