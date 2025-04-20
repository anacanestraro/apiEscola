import {Request, Response} from "express";
import { Presenca } from "../models/Presenca";
export const listarPresencas = async (req: Request, res: Response) => {
    try {
        const presenca = await Presenca.findAll();
        return res.json(presenca);
    }catch(error) {
        return res.status(500).json({error: "Erro ao buscar presença."});
    }
};

export const cadastrarPresenca = async (req: Request, res: Response) => {
    try {
        const {alunoId, disciplinaId, data, presente} = req.body;
        let novaPresenca = await Presenca.create({alunoId, disciplinaId, data, presente});

        res.status(201).json({message: "Presença cadastrada com sucesso.", novaPresenca});
    }catch(error){
        return res.status(400).json({error: "Erro ao cadastrar Presenca."});
    }
};

export const atualizarPresenca = async(req: Request, res: Response) => {
    try {
        const {presencaId} = req.params;
        const dadosAtualizados = req.body;
        const presenca = await Presenca.findByPk(presencaId);

        if(!presenca) {
            return res.status(404).json({error: "presenca não encontrada."});
        }
        const presencaAtualizada = await presenca.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});
        return res.status(200).json({message: "Presenca atualizada com sucesso.", presencaAtualizada});
    }catch(error) {
        return res.status(400).json({error: "Erro no servidor."});
    }
};

export const deletarPresenca = async(req: Request, res: Response) => {
    try {
        const {presencaId} = req.params;
        const presenca = await Presenca.findByPk(presencaId);

        if(!presenca) {
            return res.status(404).json({error: "Presenca não encontrada."});
        }

        await presenca.destroy();
        return res.status(200).json({message: "Presenca deletada com sucesso."});
    }catch(error) {
        return res.status(400).json({error: "Erro no sistema."})
    }
};