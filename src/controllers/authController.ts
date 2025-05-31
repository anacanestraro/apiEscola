import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { Aluno } from '../models/Aluno';
import { Professor } from '../models/Professor';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'senha-secreta';

export const login = async (req: Request, res: Response) => {
    try {
        const {identificador, senha} = req.body;

        console.log('Requisição de login recebida');
        console.log('Dados recebidos', {identificador, senha});
        
        if(!identificador || !senha) {
            return res.status(400).json({message: 'Informe o identificador e a senha'});
        }

        const aluno = await Aluno.findOne({where: {matricula: identificador}});
        const professor = await Professor.findOne({where: {siape: identificador}});

        // Declarando uma variável que pode ser reatribuída
        let usuario: Aluno | Professor | null = null;
        let tipo: string | null = null;
        
        if(aluno) {
            usuario = aluno;
            tipo = 'aluno'

        }else if(professor) {
            usuario = professor;
            tipo = 'professor'
        }else {
            return res.status(400).json({message: "Identificador inválido"})
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida){
            return res.status(401).json({message: 'Senha inválida'});
        }   

        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            tipo,
        }

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            {expiresIn: "2h"}
        );
        
        return res.json({token, message: 'Usuario logado com sucesso.'});
    }catch (error) {
        return res.status(400).json({error: 'Erro no servidor'})
    }

}