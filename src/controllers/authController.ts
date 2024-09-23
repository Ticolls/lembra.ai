import { Request, Response } from "express";
import { RegisterDto } from "../dtos/auth/RegisterDto";
import { validateOrReject } from "class-validator";
import { authService } from "../services/authService";
import { LoginDto } from "../dtos/auth/LoginDto";
import { AppError } from "../errors/AppError";

export const authController = {
    async register(req: Request, res: Response) {
        try {
            const registerDto = new RegisterDto(req.body)
            await validateOrReject(registerDto)
            const result = await authService.register(registerDto)
            res.status(200).json({msg: "Usuário criado com sucesso!", data: result})
        } catch (e) {
            console.log(e)
            if (e instanceof AppError) {
                res.status(e.code).json({error: e.message})
            }
        }
    },

    async login(req: Request, res: Response) {
        try {
            const loginDto = new LoginDto(req.body)
            await validateOrReject(loginDto)
            const token = await authService.login(loginDto)
            
            res.cookie('token', token, { httpOnly: true })
            res.status(200).json({msg: "Login feito com sucesso!"})
        } catch (e) {
            console.log(e)
            if (e instanceof AppError) {
                res.status(e.code).json({error: e.message})
            }
        }
    }
}