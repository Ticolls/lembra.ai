import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, email: string, role: string) => {
    const secret = process.env.JWT_SECRET || "superSecret"
    return jwt.sign({ id: userId, email, role }, secret, { expiresIn: '1h' });
};