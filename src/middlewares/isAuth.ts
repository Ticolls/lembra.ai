import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface User {
    email: string,
    role: string
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({message: "você não está autenticado."}); // Forbidden
  }

  const secret = process.env.JWT_SECRET || "superSecret"
  try {
    const user = jwt.verify(token, secret) as User;
    req.user = user
    next()
  } catch (e) {
    console.error('Erro na verificação do token:', e);
    return res.sendStatus(403); 
  }
}