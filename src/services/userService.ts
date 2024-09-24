import { PlanStatus } from "@prisma/client";
import { prisma } from "../configs/database";
import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { UpdateUserDto } from "../dtos/user/UpdateUserDto";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs"


export const userService = {
    async create(createUser: CreateUserDto) {
        try {
            const emailExists = await prisma.user.findUnique({
                where: {
                    email: createUser.email
                }
            })
            if (emailExists) {
                throw new AppError("Email já cadastrado.", 400)
            }
            

            const hashedPassword = await bcrypt.hash(createUser.password, Number(process.env.SALT))
            const createdUser = prisma.user.create({
                data: {
                    name: createUser.name,
                    email: createUser.email,
                    hashedPassword,
                    appPlanId: createUser.appPlanId,
                    status: createUser.status,
                    isEmailVerified: createUser.isEmailVerified,
                    blocked: createUser.blocked
                }
            })
    
            return createdUser
        } catch(e) {
            console.log(e)
            throw e
        }
    },

    async list() {
        try {
            const users = await prisma.user.findMany({})
            return users
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async getById(id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            if (!user) {
                throw new AppError("Usuário não encontrado", 400)
            }

            return user
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async update(id: string, updateUser: UpdateUserDto) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            if (!user) {
                throw new AppError("Usuário não encontrado", 400)
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id
                },
                data: updateUser
            })

            return updatedUser
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async delete(id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            if (!user) {
                throw new AppError("Usuário não encontrado", 400)
            }

            const deletedUser = await prisma.user.delete({
                where: {
                    id
                }
            })

            return deletedUser
        } catch (e) {
            console.log(e)
            throw e
        }
    },
}