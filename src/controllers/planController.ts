import { Request, Response } from "express";
import { validateOrReject, ValidationError } from "class-validator";
import { planService } from "../services/planService";
import { AppError } from "../errors/AppError";
import { CreatePlanDto } from "../dtos/plan/CreatePlanDto";
import { UpdatePlanDto } from "../dtos/plan/UpdatePlanDto";

export const planController = {
    async create(req: Request, res: Response) {
        try {
            const userId = req.user?.id
            if (!userId) return res.status(401).json({message: "Você não está autenticado."})
            const createPlanDto = new CreatePlanDto(req.body)
            await validateOrReject(createPlanDto)
            const result = await planService.create(userId, createPlanDto)
            res.status(200).json({message: "Plano criado com sucesso!", data: result})
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

            const plans = await planService.list(userId)
            
            res.status(200).json({message: "Listagem de planos feita com sucesso!", plans})
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
            const plan = await planService.getById(userId, id)

            res.status(200).json({message: "Plano recuperado com sucesso!", plan})
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
            const updatePlanDto = new UpdatePlanDto(req.body)
            await validateOrReject(updatePlanDto)
            const plan = await planService.update(userId, id, updatePlanDto)
            
            res.status(200).json({message: "Plano atualizado com sucesso!", plan})
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
            const plan = await planService.delete(userId, id)

            res.status(200).json({message: "Plano deletado com sucesso!", plan})
        } catch (e:any) {
            if (e instanceof AppError) {
                return res.status(e.code).json({error: e.message})
            }

            res.status(500).json({error: "erro inesperado."})
        }
    },
}