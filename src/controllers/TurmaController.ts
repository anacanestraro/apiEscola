import {Request, Response} from "express";
import { Turma } from "../models/Turma";
import { Op } from "sequelize";
import { Aluno } from "../models/Aluno";

export const listarTurmas = async (req: Request, res: Response) => {
    try {
        const turmas = await Turma.findAll();
        return res.json(turmas);
    }catch(error) {
        return res.status(500).json({error: "Erro ao buscar turmas deletadas."})
    }
};

export const cadastrarTurma = async (req: Request, res: Response) => {
    try{
        const{nome, periodo, cursoId} = req.body;
        let novaTurma = await Turma.create({nome, periodo, cursoId});
    
        res.status(201).json({
            message: "Turma cadastrada com sucesso.",
            novaTurma
        });
    }catch(error){ 
        return res.status(400).json({error: "Erro ao cadastrar turma"});

    }
};

export const atualizarTurma = async (req: Request, res: Response) => {
    try{
        const {turmaId} = req.params;
        const dadosAtualizados = req.body;
        const turma = await Turma.findByPk(turmaId);
        if(!turma){
            return res.status(404).json({error: "Turma não encontrada."});
        }
        const turmaAtualizada = await turma.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});
        return res.status(200).json({message: "Turma atualizada com sucesso.", turmaAtualizada});
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
};

export const deletarTurma = async (req: Request, res: Response) => {
    try {
        const {turmaId} = req.params;

        const alunosVinculados = await Aluno.count({
            where: {turmaId}
        });

        if(alunosVinculados > 0){
            return res.status(400).json({error: "Turma não pode ser deletada pois possui alunos vinculados."});
        }

        const turma = await Turma.findByPk(turmaId);

        if(!turma) {
            return res.status(404).json({error:"Turma não encontrada."});
        }

        await turma.destroy();
        return res.status(200).json({message: "Turma deletada com sucesso."});
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
};

export const buscarTurma = async (req:Request, res: Response) => {
    try {
        const {turmaId} = req.params;
        const turma = await Turma.findByPk(turmaId);
    
        if(!turma) {
            return res.status(404).json({error: "Turma não encontrada."});
        }
        return res.json(turma);
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
        
};