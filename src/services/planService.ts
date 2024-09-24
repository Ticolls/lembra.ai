import { prisma } from "../configs/database";
import { CreatePlanDto } from "../dtos/plan/CreatePlanDto";
import { UpdatePlanDto } from "../dtos/plan/UpdatePlanDto";
import { AppError } from "../errors/AppError";

export const planService = {
    async create(userId: string, createPlan: CreatePlanDto) {
        try {
            const planExists = await prisma.plan.findUnique({
                where: {
                    name: createPlan.name,
                    userId
                }
            })
            if (planExists) {
                throw new AppError("Plano com esse nome já foi cadastrado.", 400)
            }
            
            const createdPlan = prisma.plan.create({
                data: {
                    ...createPlan,
                    userId
                }
            })
    
            return createdPlan
        } catch(e) {
            console.log(e)
            throw e
        }
    },

    async list(userId: string) {
        try {
            const plans = await prisma.plan.findMany({
                where:{
                    userId
                }
            })
            return plans
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async getById(userId: string, id: string) {
        try {
            const plan = await prisma.plan.findUnique({
                where: {
                    id,
                    userId
                }
            })
            if (!plan) {
                throw new AppError("Plano não encontrado", 400)
            }

            return plan
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async update(userId: string, id: string, updatePlan: UpdatePlanDto) {
        try {
            const plan = await prisma.plan.findUnique({
                where: {
                    id,
                    userId
                }
            })
            if (!plan) {
                throw new AppError("Plano não encontrado", 400)
            }

            const updatedPlan = await prisma.plan.update({
                where: {
                    id,
                    userId
                },
                data: updatePlan
            })

            return updatedPlan
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async delete(userId: string, id: string) {
        try {
            const plan = await prisma.plan.findUnique({
                where: {
                    id,
                    userId
                }
            })
            if (!plan) {
                throw new AppError("Plano não encontrado", 400)
            }

            const deletedPlan = await prisma.plan.delete({
                where: {
                    id,
                    userId
                }
            })

            return deletedPlan
        } catch (e) {
            console.log(e)
            throw e
        }
    },
}