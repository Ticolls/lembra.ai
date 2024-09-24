import { Request, Response } from "express";
import { RegisterDto } from "../dtos/auth/RegisterDto";
import { validateOrReject, ValidationError } from "class-validator";
import { authService } from "../services/authService";
import { LoginDto } from "../dtos/auth/LoginDto";
import { AppError } from "../errors/AppError";

export const authController = {
    async register(req: Request, res: Response) {
        try {
            const registerDto = new RegisterDto(req.body)
            await validateOrReject(registerDto)
            const result = await authService.register(registerDto)
            res.status(200).json({message: "Usuário criado com sucesso!", data: result})
        } catch (e: any) {    

            console.log(e)
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }
            if (e.length > 0 && e[0] instanceof ValidationError) {
                console.log(e)
                return res.status(400).json({error: e[0].constraints})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },

    async login(req: Request, res: Response) {
        try {
            const loginDto = new LoginDto(req.body)
            await validateOrReject(loginDto)
            const token = await authService.login(loginDto)
            
            res.cookie('token', token, { httpOnly: true })
            res.status(200).json({message: "Login feito com sucesso!"})
        } catch (e: any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }
            if (e.length > 0 && e[0] instanceof ValidationError) {
                console.log(e)
                return res.status(400).json({error: e[0].constraints})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },

    async logout(req: Request, res: Response) {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout realizado com sucesso!' });
    }
}