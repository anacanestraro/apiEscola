import { Request, Response } from "express";
import { Disciplina } from "../models/Disciplina";
import { AlunoDisciplina } from "../models/AlunoDisciplina";
import { Sequelize } from "sequelize";
import { Presenca } from "../models/Presenca";
import { Aluno } from "../models/Aluno";
import { Nota } from "../models/Nota";

export const listarDisciplinas = async (req: Request, res: Response) => {
    try {
        const disciplinas = await Disciplina.findAll();
        return res.json(disciplinas);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar disciplinas." });
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
        const { disciplinaId } = req.params
        const dadosAtualizados = req.body

        const disciplina = await Disciplina.findByPk(disciplinaId);

        if (!disciplina) {
            return res.status(400).json({ message: "Disciplina não encontrado" })
        }
        const disciplinaAtualizada = await disciplina.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
        return res.status(200).json({ message: "Disciplina atualizada com sucesso." });


    } catch (error) {
        return res.status(400).json({ message: "Erro do sistema" })
    }

}

export const deletarDisciplina = async (req: Request, res: Response) => {
    try {
        const { disciplinaId } = req.params;
        const alunosVinculados = await AlunoDisciplina.count({
            where: { disciplinaId }
        });

        if (alunosVinculados > 0) {
            return res.status(400).json({ error: "Disciplina não pode ser deletada pois possui alunos vinculados." });
        }
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }

        await disciplina.destroy();
        return res.status(200).json({ message: "Disciplina deletada com sucesso" });
    } catch (error) {
        return res.status(400).json({ error: "Erro no servidor." });
    }
};

export const buscarDisciplina = async (req: Request, res: Response) => {
    try {
        const { disciplinaId } = req.params;
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }

        return res.json(disciplina);

    } catch (error) {
        return res.status(400).json({ error: "Erro no servidor." })
    }
}

export const listarAlunosReprovados = async (req: Request, res: Response) => {
    try {
        const { disciplinaId } = req.params;
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada" });
        }

        const alunos = await Aluno.findAll({
            include: [{
                model: Aluno,
                where: { id: disciplinaId },
                attributes: [],
            },
            ],
            attributes: ["id", "nome"],
        });

        const resultados = await Promise.all(
            alunos.map(async (aluno) => {
                const totalAulas = await Presenca.count({
                    where: {
                        disciplinaId: disciplina.id
                    }
                });

                const totalPresencas = await Presenca.count({
                    where: {
                        alunoId: aluno.id,
                        disciplinaId: disciplina.id,
                        presente: true
                    }
                });

                const percentual = totalAulas > 0
                    ? (totalPresencas / totalAulas) * 100
                    : 0;

                let statusPresenca;
                if (percentual < 75) {
                    statusPresenca = "Reprovado por falta"
                } else if (percentual >= 75) {
                    statusPresenca = "Aprovado"
                } else {
                    statusPresenca = "Sem presença"
                }

                const mediaResultado = await Nota.findOne({
                    where: {
                        alunoId: aluno.id,
                        disciplinaId: disciplina.id
                    },
                    attributes: [[Sequelize.fn("AVG", Sequelize.col("nota")), "media"]],
                    raw: true
                }) as { media: string | null } | null;

                const media = mediaResultado?.media ? parseFloat(mediaResultado.media) : null;

                let statusNota = "Sem notas";
                if (media !== null) {
                    if (media < 6) {
                        statusNota = "Reprovado por nota";
                    } else {
                        statusNota = "Aprovado";
                    }
                }

                return {
                    disciplinaId: disciplina.id,
                    disciplina: disciplina.nome,
                    totalAulas,
                    totalPresencas,
                    percentual: `${percentual.toFixed(2)}%`,
                    statusPresenca,
                    media,
                    statusNota,
                    reprovado: statusPresenca === "Reprovado por falta" || statusNota === "Reprovado por nota"

                };

            })
        );
        const alunosReprovados = resultados.filter(aluno => aluno.reprovado);

        return res.status(200).json({
            disciplina: {
                id: disciplina.id,
                nome: disciplina.nome
            },
            totalAlunos: alunos.length,
            totalReprovados: alunosReprovados.length,
            alunosReprovados
        });

    } catch (error) {
        console.error("Erro ao listar alunos reprovados:", error);
        return res.status(500).json({ error: "Erro interno do servidor ao listar alunos reprovados" });
    }
};