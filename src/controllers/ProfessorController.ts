import {Request, Response} from "express";
import { Professor } from "../models/Professor";
import jwt from 'jsonwebtoken';
import { Aluno } from "../models/Aluno";

const JWT_SECRET = process.env.JWT_SECRET || 'senha-secreta';

export const listarProfessores = async (req: Request, res: Response) => {
    try {
        const professores = await Professor.findAll();
        return res.json(professores);
    }catch(error){
        return res.status(500).json({message: "Erro ao buscar professores deletados"});
    }
};

export const cadastrarProfessor = async (req: Request, res: Response) => {
    try {
        const {nome, email, senha, matricula} = req.body;
        let novoProfessor = await Professor.create({nome, email, senha, matricula});
    
        res.status(201).json({
            message: "Professor cadastrado com sucesso.",
            novoProfessor
        });
    }catch(error) {
        return res.status(400).json({error: "Erro ao cadastrar profe    ssor."})
    }
};

export const atualizarProfessor = async (req: Request, res: Response) => {
    try {
        const {professorId} = req.params;
        const dadosAtualizados = req.body;
        const professor = await Professor.findByPk(professorId);

        if(!professor){
            return res.status(404).json({message: "Professor não encontrado."});
        }
        const professorAtualizado = await professor.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});
        return res.status(200).json({message: "Professor atualizado com sucesso.", professorAtualizado});
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
};

export const deletarProfessor = async (req: Request, res: Response) => {
    try {
        const {professorId} = req.params;

        const professor = await Professor.findByPk(professorId);

        if(!professor){
            return res.status(404).json({error: "Professor não encontrado."});
        }
        await professor.destroy();
        res.status(200).json({message: "Professor deletado com sucesso."});
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
}

export const buscarProfessor = async (req:Request, res: Response) => {
    try{
        const {professorId} = req.params;
        const professor = await Professor.findByPk(professorId);
    
        if(professor) {
            return res.json(professor);
        }
        return res.status(404).json({error: "Professor não encontrado."});
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
};

export const loginProfessor = async (req: Request, res: Response): Promise<any> => {
    const { matricula, senha } = req.body;

    console.log('Requisição de login recebida');
    console.log('Dados recebidos', {matricula, senha});

    if(!matricula || !senha) {
        console.warn('Senha ou matricula não informados');
        return res.status(400).json({error: 'Informe senha e matrícula'});
    }

    try{
        console.log('Buscando professor no banco de dados...');
        const professor = await  Professor.findOne({where: { matricula, senha}});

        if(!professor) {
            console.warn('Professor não encontrado ou dados inválidos');
            return res.status(401).json({error: 'Professor não encotrado ou dados inválidos'})
        }

        console.log('Professor encontrado:', professor.dataValues)

        const payload = {
            id: professor.id,
            nome: professor.nome,
            matricula: professor.matricula,
            senha: professor.senha,
        }

        console.log('Gerando token com payload:', payload)
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'})

        console.log('Token gerado com sucesso')
        return res.json({
            token, 
            mensagem: 'Professor logado com sucesso'
        });
    }catch(error) {
        return res.status(500).json({error: 'Erro ao realizar login'});
    }
}