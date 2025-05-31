import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'senha-secreta';

interface MeuPayload extends JwtPayload {
    id: number,
    nome: string,
    tipo: "professor" | "aluno"
}

export const autenticarToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        res.status(401).json({error: 'Token não fornecido'});
        return;
    }

    try {
        console.log('validando')
        const decoded = jwt.verify(token, JWT_SECRET) as MeuPayload;
        (req as Request & {user: MeuPayload}).user = decoded
        next()
    } catch (erro) {
        res.status(403).json({error: 'Token inválido'})
    }
}

export const autenticarProfessor = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try{
    if(!token) {
        res.status(401).json({error: 'Token não fornecido'});
        return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as MeuPayload;
    if(!decoded.tipo){
        res.status(403).json({error: 'Token inválido: tipo de usuário não fornecido'});
        return;
    }

    if(decoded.tipo !== "professor") {
        res.status(403).json({error: 'Acesso negado'});
        return;
    }

    next();

    }catch(error){
        res.status(403).json({error: 'Token inválido'});
        return;
    }   
}

export const autenticarAluno = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try{
        if(!token) {
            res.status(401).json({error: 'Token não fornecido'});
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as MeuPayload;
        if(!decoded.tipo){
            res.status(403).json({error: "Acesso negado"});
            return;
        }

        if(decoded.tipo !== "aluno"){
            res.status(403).json({error: 'Acesso negado'});
            return;
        }
    }catch(error){
        res.status(403).json({error: 'Token inválido'});
        return;
    }
}