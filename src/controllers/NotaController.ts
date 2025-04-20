import {Request, Response} from "express";
import { Nota } from "../models/Nota";
import { Aluno } from "../models/Aluno";
import { Disciplina } from "../models/Disciplina";

export const listarNotas = async (req: Request, res: Response) => {
    try {
        const notas = await Nota.findAll();
        return res.json(notas);
    }catch(error) {
        return res.status(500).json({error: "Erro ao buscar notas."});
    }
};

export const cadastrarNotas = async (req: Request, res: Response) => {
    try {
        const {alunoId, disciplinaId, nota, dataAvaliacao} = req.body;
        let novaNota = await Nota.create({alunoId, disciplinaId, nota, dataAvaliacao});

        res.status(201).json({message: "Nota cadastrada com sucesso.", novaNota});
    }catch(error){
        return res.status(400).json({error: "Erro ao cadastrar nota."});
    }
};

export const atualizarNota = async(req: Request, res: Response) => {
    try {
        const {notaId} = req.params;
        const dadosAtualizados = req.body;
        const nota = await Nota.findByPk(notaId);

        if(!nota) {
            return res.status(404).json({error: "Nota não encontrada."});
        }
        const notaAtualizada = await nota.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});
        return res.status(200).json({message: "Nota atualizada com sucesso.", notaAtualizada});
    }catch(error) {
        return res.status(400).json({error: "Erro no servidor."});
    }
};

export const deletarNota = async(req: Request, res: Response) => {
    try {
        const {notaId} = req.params;
        const nota = await Nota.findByPk(notaId);

        if(!nota) {
            return res.status(404).json({error: "Nota não encontrada."});
        }

        await nota.destroy();
        return res.status(200).json({message: "Nota deletada com sucesso."});
    }catch(error) {
        return res.status(400).json({error: "Erro no sistema."})
    }
};