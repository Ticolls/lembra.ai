import { Request, Response } from "express";
import { validateOrReject, ValidationError } from "class-validator";
import { userService } from "../services/userService";
import { AppError } from "../errors/AppError";
import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { UpdateUserDto } from "../dtos/user/UpdateUserDto";

export const userController = {
    async create(req: Request, res: Response) {
        try {
            const createUserDto = new CreateUserDto(req.body)
            await validateOrReject(createUserDto)
            const result = await userService.create(createUserDto)
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

    async list(req: Request, res: Response) {
        try {
            const users = await userService.list()
            
            res.status(200).json(users)
        } catch (e: any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const id = req.params["id"]
            const user = await userService.getById(id)

            res.status(200).json(user)
        } catch (e: any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },

    async update(req: Request, res: Response) {
        try {
            const id = req.params["id"]
            const updateUserDto = new UpdateUserDto(req.body)
            await validateOrReject(updateUserDto)
            const user = await userService.update(id, updateUserDto)
            
            res.status(200).json(user)
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

    async delete(req: Request, res: Response) {
        try {
            const id = req.params["id"]
            const user = await userService.delete(id)

            res.status(200).json(user)
        } catch (e:any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },
}