import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { Op } from "sequelize";

// 🔹 Listar todos os alunos
export const listarAlunos = async (req: Request, res: Response) => {
    try {
        const alunos = await Aluno.findAll({
            where: {
                deletedAt: {
                    [Op.ne]: null, // Busca apenas os alunos que têm deletedAt preenchido
                },
            },
            paranoid: false, // Permite acessar registros "soft deleted"
        });

        return res.json(alunos);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar alunos deletados" });
    }
};


// 🔹 Cadastrar um novo aluno
export const cadastrarAluno = async (req: Request, res: Response) => {
    const { nome, email, matricula } = req.body;

    // 🔹 Criando o aluno sem verificações adicionais
    let novoAluno = await Aluno.create({ nome, email, matricula });

    res.status(201).json({
        message: "Aluno cadastrado com sucesso.",
        novoAluno
    });
};


export const atualizarAluno = async (req: Request, res: Response) => {

    try {
        const {alunoId} = req.params
        const dadosAtualizados = req.body
    
        const aluno = await Aluno.findByPk(alunoId);

        if(!aluno){
            return res.status(400).json({message: "Aluno não encontrado"})
        }
        await aluno.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
    
        
    } catch (error) {
        return res.status(400).json({message: "Erro do sistema"})
    }
   
}


export const deletarAluno = async (req: Request, res: Response) => {

    try {
        const {alunoId} = req.params    
        const aluno = await Aluno.findByPk(alunoId);

        if(!aluno){
            return res.status(400).json({message: "Aluno não encontrado"})
        }
        await aluno.destroy()
    
        
    } catch (error) {
        return res.status(400).json({message: "Erro do sistema"})
    }
   
}

export const buscarAluno = async (req: Request, res: Response) => {
    const { alunoId } = req.params;
    const aluno = await Aluno.findByPk(alunoId);

    if (aluno) {
        return res.json(aluno);
    }

    return res.status(404).json({ error: "Aluno não encontrado." });
};