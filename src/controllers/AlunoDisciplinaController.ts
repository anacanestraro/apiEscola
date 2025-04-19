import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { Disciplina } from "../models/Disciplina";
import { AlunoDisciplina } from "../models/AlunoDisciplina";

export const listarDisciplinasDoAluno = async (req: Request, res: Response) => {
    const { alunoId } = req.params;

    const aluno = await Aluno.findByPk(alunoId, {
        include: { model: Disciplina },
    });

    if (aluno) {
        return res.json(aluno);
    }

    return res.status(404).json({ error: "Aluno não encontrado." });
};

export const vincularAlunoADisciplina = async (req: Request, res: Response) => {
    const { alunoId, disciplinaId } = req.body;

    const aluno = await Aluno.findByPk(alunoId);
    const disciplina = await Disciplina.findByPk(disciplinaId);

    if (!aluno || !disciplina) {
        return res.status(404).json({ error: "Aluno ou disciplina não encontrada." });
    }
    await (aluno as any).addDisciplina(disciplina);

    return res.json({ message: "Aluno vinculado à disciplina com sucesso!" });
};

export const atualizarVinculoAlunoDisciplina = async (req: Request, res: Response) => {
    try {
        const {vinculoId} = req.params;
        const dadosAtualizados = req.body;
        const vinculo = await AlunoDisciplina.findByPk(vinculoId);
        if(!vinculo) {
            return res.status(404).json({error: "Vinculo não encontrado."});
        }

        const vinculoAtualizado = vinculo.update(dadosAtualizados, {fields:Object.keys(dadosAtualizados)});
        return res.status(200).json({message: "Vinculo atualizado com sucesso."})

    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
}

export const deletarVinculoAlunoDisciplina = async (req:Request, res: Response) => {
    try{
        const {vinculoId} = req.params;
        const vinculo = await AlunoDisciplina.findByPk(vinculoId);
    
        if(!vinculo){
            return res.status(404).json({error: "Vinculo não encontrado."});
        }

        await vinculo.destroy();
        return res.status(200).json({message: "Vinculo deletado com sucesso."});
    }catch(error){
        return res.status(400).json({error: "Erro no servidor."});
    }
};