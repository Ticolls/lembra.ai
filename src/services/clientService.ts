import { prisma } from "../configs/database";
import { CreateClientDto } from "../dtos/client/CreateClientDto";
import { UpdateClientDto } from "../dtos/client/UpdateClientDto";
import { AppError } from "../errors/AppError";

export const clientService = {
    async create(userId: string, createClient: CreateClientDto) {

        try {
            const clientExists = await prisma.client.findUnique({
                where: {
                    email: createClient.email,
                    userId
                }
            })
            if (clientExists) {
                throw new AppError("Cliente com esse email já foi cadastrado.", 400)
            }
            
            const createdClient = prisma.client.create({
                data: {
                    ...createClient,
                    userId
                }
            })
    
            return createdClient
        } catch(e) {
            console.log(e)
            throw e
        }
    },

    async list(userId: string) {
        try {
            const clients = await prisma.client.findMany({
                where:{
                    userId
                }
            })
            return clients
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async getById(userId: string, id: string) {
        try {
            const client = await prisma.client.findUnique({
                where: {
                    id,
                    userId
                }
            })
            if (!client) {
                throw new AppError("Cliente não encontrado", 400)
            }

            return client
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async update(userId: string, id: string, updateClient: UpdateClientDto) {
        try {
            const client = await prisma.client.findUnique({
                where: {
                    id,
                    userId
                }
            })
            if (!client) {
                throw new AppError("Cliente não encontrado", 400)
            }

            const updatedClient = await prisma.client.update({
                where: {
                    id,
                    userId
                },
                data: updateClient
            })

            return updatedClient
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async delete(userId: string, id: string) {
        try {
            const client = await prisma.client.findUnique({
                where: {
                    id,
                    userId
                }
            })
            if (!client) {
                throw new AppError("Cliente não encontrado", 400)
            }

            const deletedClient = await prisma.client.delete({
                where: {
                    id,
                    userId
                }
            })

            return deletedClient
        } catch (e) {
            console.log(e)
            throw e
        }
    },
}