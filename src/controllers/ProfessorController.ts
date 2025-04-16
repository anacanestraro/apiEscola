import {Request, Response} from "express";
import { Turma } from "../models/Turma";
import { Op } from "sequelize";
import { Professor } from "../models/Professor";

export const listarProfessores = async (req: Request, res: Response) => {
    try {
        const professores = await Professor.findAll({
            where: {
                deletedAt: {
                    [Op.ne]: null,
                },
            },
            paranoid: false,
        });
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
        return res.status(200).json({message: "Professor atualizado com sucesso."});
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
    const {professorId} = req.params;
    const professor = await Professor.findByPk(professorId);

    if(professor) {
        return res.json(professor);
    }
    return res.status(404).json({error: "Professor não encontrado."});
};