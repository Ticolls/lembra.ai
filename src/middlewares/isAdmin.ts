import { NextFunction, Request, Response } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user
  if (!user) {
    return res.status(403).json({message: "Você não está autenticado."})
  }

  if (user.role !== "ADMIN") {
    return res.status(403).json({message: "Você não tem autoridade para isso."})
  }
  next()
}