import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { AlunoDisciplina } from "../models/AlunoDisciplina";
import { Disciplina } from "../models/Disciplina";
import { Nota } from "../models/Nota";
import { Sequelize } from "sequelize";

export const listarAlunos = async (req: Request, res: Response) => {
    try {
        const alunos = await Aluno.findAll();
        return res.json(alunos);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar alunos deletados" });
    }
};

export const cadastrarAluno = async (req: Request, res: Response) => {
    try {
        const { nome, email, matricula, senha, turmaId } = req.body;
        let novoAluno = await Aluno.create({ nome, email, matricula, senha, turmaId });

        res.status(201).json({
            message: "Aluno cadastrado com sucesso.",
            novoAluno
        });
    } catch (error) {
        return res.status(400).json({ error: "Erro ao cadastrar Aluno." })
    }
};

export const atualizarAluno = async (req: Request, res: Response) => {
    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;
        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            res.status(404).json({ error: "Aluno não encontrado." });
            return;

        }
        const alunoAtualizado = await aluno.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
        res.status(200).json({ message: "Aluno atualizado com sucesso.", alunoAtualizado });
        return;
    } catch (error) {
        res.status(400).json({ error: "Erro no servidor" });
        return;
    }
};

export const deletarAluno = async (req: Request, res: Response) => {
    try {
        const { alunoId } = req.params;
        const aluno = await Aluno.findByPk(alunoId);

        const alunoDisciplina = await AlunoDisciplina.findByPk(alunoId);

        if (alunoDisciplina) {
            res.status(400).json({ error: "Aluno possui disciplinas, não pode ser deletado!" });
            return;
        }

        if (!aluno) {
            res.status(404).json({ error: "Aluno não encontrado." });
            return;
        }
        await aluno.destroy();
        res.status(200).json({ message: "Aluno deletado com sucesso" });
        return;
    } catch (error) {

        res.status(400).json({ error: "Erro no servidor" });
        return;
    }
};

export const buscarAluno = async (req: Request, res: Response) => {
    try {
        const { alunoId } = req.params;
        const aluno = await Aluno.findByPk(alunoId);

        if (aluno) {
            return res.json(aluno);
        }

        return res.status(404).json({ error: "Aluno não encontrado." });
    } catch (error) {
        return res.status(400).json({ error: "Erro no servidor." });
    }
};

export const notasPorAlunos = async (req: Request, res: Response): Promise<Response> => {
    try{
        const {alunoId} = req.params;
        const aluno = await Aluno.findByPk(alunoId);

        if(!aluno){
            return res.status(404).json({error: "Aluno não encontrado."});
        }

        const disciplinas = await Disciplina.findAll({
            include: [
                {
                    model: Aluno,
                    where: {id: alunoId},
                    attributes: [],
                    through: { attributes: [] },
                }
            ],
            attributes: ["id", "nome"]
        });

        const notas = await Promise.all(
            disciplinas.map(async (disciplina) => {
                const mediaResultado = await Nota.findOne({
                    where: {
                      alunoId,
                      disciplinaId: disciplina.id
                    },
                    attributes: [[Sequelize.fn("AVG", Sequelize.col("nota")), "media"]],
                    raw: true
                }) as {media: string | null} | null;

                const media = mediaResultado?.media ? parseFloat(mediaResultado.media) : null;

                return {
                    disciplinaId: disciplina.id,
                    disciplina: disciplina.nome,
                    media: media !== null ? `${media.toFixed(2)} pontos` : "Sem nota"
                };
            })
        );

        if (notas.length === 0) {
            return res.status(404).json({
                message: "Nenhuma disciplina encontrada para este aluno.",
            });
        }
        
        return res.status(200).json({
            aluno: {
                id: aluno.id,
                nome: aluno.nome,
                email: aluno.email,
            },
            notas: notas,
        });
        
    }catch(error) {
        return res.status(400).json({error: "Erro no servidor."});
    }
};