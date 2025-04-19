import { Request, Response } from "express";
import { Op } from "sequelize";
import { Disciplina } from "../models/Disciplina";
import { AlunoDisciplina } from "../models/AlunoDisciplina";

export const listarDisciplinas = async (req: Request, res: Response) => {
    try {
        const disciplinas = await Disciplina.findAll();
        return res.json(disciplinas);

    }catch(error){
        return res.status(500).json({error: "Erro ao buscar disciplinas."});
    }
}

export const cadastrarDisciplina = async (req: Request, res: Response) => {
    const { nome, professorId } = req.body;

    if (nome) {
        let disciplinaExistente = await Disciplina.findOne({ where: { nome } });
        if (!disciplinaExistente) {
            let novaDisciplina = await Disciplina.create({ nome, professorId });

            res.status(201);
            return res.json({
                message: "Disciplina cadastrada com sucesso.",
                novaDisciplina
            });
        } else {
            return res.status(400).json({ error: "Nome da disciplina já existe." });
        }
    }

    return res.status(400).json({ error: "Erro no servidor." });
};

export const atualizarDisciplina = async (req: Request, res: Response) => {

    try {
        const {disciplinaId} = req.params
        const dadosAtualizados = req.body
    
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if(!disciplina){
            return res.status(400).json({message: "Disciplina não encontrado"})
        }
        const disciplinaAtualizada = await disciplina.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
        return res.status(200).json({message: "Disciplina atualizada com sucesso."});
        
        
    } catch (error) {
        return res.status(400).json({message: "Erro do sistema"})
    }
   
}

export const deletarDisciplina = async (req: Request, res: Response) => {
    try {
        const {disciplinaId} = req.params;
        const alunosVinculados = await AlunoDisciplina.count({
            where: {disciplinaId}
        });

        if(alunosVinculados> 0) {
            return res.status(400).json({error: "Disciplina não pode ser deletada pois possui alunos vinculados."});
        }
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if(!disciplina){
            return res.status(404).json({error: "Disciplina não encontrada."});
        }

        await disciplina.destroy();
        return res.status(200).json({message: "Disciplina deletada com sucesso"});
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
};

export const buscarDisciplina = async (req: Request, res: Response) => {
    try {
        const {disciplinaId} = req.params;
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if(!disciplina){
            return res.status(404).json({error: "Disciplina não encontrada."});
        }
        
        return res.json(disciplina);

    }catch(error){
        return res.status(400).json({error: "Erro no servidor."})
    }
}