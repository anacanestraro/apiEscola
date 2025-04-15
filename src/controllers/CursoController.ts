import {Request, Response} from "express";
import {Curso} from "../models/Curso";
import { json, Op } from "sequelize";
import { Turma } from "../models/Turma";

export const listarCursos = async (req: Request, res: Response) => {
    try {
        const cursos = await Curso.findAll({
            where: {
                deletedAt: {
                    [Op.ne]: null,
                },
            },
            paranoid: false,
        });
        return res.json(cursos);
    }catch(error) {
        return res.status(500).json({message: "Erro ao buscar cursos deletados"})
    }
};

export const cadastrarCurso = async (req: Request, res: Response) => {
    const {nome, descricao} = req.body;
    let novoCurso = await Curso.create({nome, descricao});

    res.status(201).json({
        message: "Curso cadastrado com sucesso.",
        novoCurso
    });
};

export const atualizaCurso = async (req: Request, res: Response) => {
    try {
        const {cursoId} = req.params;
        const dadosAtualizados = req.body;

        const curso = await Curso.findByPk(cursoId);

        if(!curso) {
            return res.status(400).json({message: "Curso não encontrado."});
        }
        const cursoAtualizado = await curso.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});
        res.status(200).json({message: "Curso atualizado com sucesso.", cursoAtualizado});
    }catch(error){
        return res.status(400).json({message: "Erro do sistema."});
    }
};

export const deletarCurso = async (req: Request, res: Response) => {
    try {
        const {cursoId} = req.params;

        const turmasVinculadas = await Turma.count({
            where: {cursoId}
        });

        if(turmasVinculadas > 0){
            return res.status(400).json({error: "Curso não pode ser deletado pois possui turmas vinculadas."});
        }

        const curso = await Curso.findByPk(cursoId);
        
        if(!curso) {
            res.status(404).json({error: "Curso não encontrado."});
            return;
        }
    
        await curso.destroy();
        res.status(200).json({message: "Curso deletado com sucesso."});
    }catch(error) {
        res.status(400).json({error: "Erro no servidor."});
    }
};

export const buscarCurso = async (req: Request, res: Response) => {
    const {cursoId} = req.params;
    const curso = await Curso.findByPk(cursoId);

    if(curso) {
        return res.json(curso);
    }
    return res.status(404).json({error: "Curso não encontrado."});
};