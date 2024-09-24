import { Request, Response } from "express";
import { validateOrReject, ValidationError } from "class-validator";
import { clientService } from "../services/clientService";
import { AppError } from "../errors/AppError";
import { CreateClientDto } from "../dtos/client/CreateClientDto";
import { UpdateClientDto } from "../dtos/client/UpdateClientDto";

export const clientController = {
    async create(req: Request, res: Response) {
        try {
            const userId = req.user?.id
            if (!userId) return res.status(401).json({message: "Você não está autenticado."})
            const createClientDto = new CreateClientDto(req.body)
            await validateOrReject(createClientDto)
            const result = await clientService.create(userId, createClientDto)
            res.status(200).json({message: "Cliente criado com sucesso!", data: result})
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
            const userId = req.user?.id
            if (!userId) return res.status(401).json({message: "Você não está autenticado."})

            const clients = await clientService.list(userId)
            
            res.status(200).json({message: "Listagem de Clientes feita com sucesso!", clients})
        } catch (e: any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const userId = req.user?.id
            if (!userId) return res.status(401).json({message: "Você não está autenticado."})

            const id = req.params["id"]
            const client = await clientService.getById(userId, id)

            res.status(200).json({message: "Cliente recuperado com sucesso!", client})
        } catch (e: any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },

    async update(req: Request, res: Response) {
        try {
            const userId = req.user?.id
            if (!userId) return res.status(401).json({message: "Você não está autenticado."})

            const id = req.params["id"]
            const updateClientDto = new UpdateClientDto(req.body)
            await validateOrReject(updateClientDto)
            const client = await clientService.update(userId, id, updateClientDto)
            
            res.status(200).json({message: "Cliente atualizado com sucesso!", client})
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
            const userId = req.user?.id
            if (!userId) return res.status(401).json({message: "Você não está autenticado."})

            const id = req.params["id"]
            const client = await clientService.delete(userId, id)

            res.status(200).json({message: "Cliente deletado com sucesso!", client})
        } catch (e:any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },
}