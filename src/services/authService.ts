import { prisma } from "../configs/database";
import { LoginDto } from "../dtos/auth/LoginDto";
import { RegisterDto } from "../dtos/auth/RegisterDto";
import bcrypt from "bcryptjs"
import { AppError } from "../errors/AppError";
import { generateToken } from "../utils/generateToken";


export const authService = {
    async register(registerUser: RegisterDto) {
        try {
            const emailExists = await prisma.user.findUnique({
                where: {
                    email: registerUser.email
                }
            })
            if (emailExists) {
                throw new AppError("Email já cadastrado.", 400)
            }

            const hashedPassword = await bcrypt.hash(registerUser.password, Number(process.env.SALT))

            const createdUser = prisma.user.create({
                data: {
                    name: registerUser.name,
                    email: registerUser.email,
                    hashedPassword,
                    appPlanId: registerUser.appPlanId
                }
            })
    
            return createdUser
        } catch(e) {
            console.log(e)
            throw e
        }
    },

    async login(loginUser: LoginDto) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: loginUser.email
                }
            })
            if (!user) {
                throw new AppError("Credenciais inválidas.", 400)
            }
            const isMatch = await bcrypt.compare(loginUser.password, user.hashedPassword);
            if (!isMatch) {
                throw new AppError("Credenciais inválidas.", 400)
            }

            const token = generateToken(user.email, user.role)
            return token
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}