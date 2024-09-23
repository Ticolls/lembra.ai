import jwt from 'jsonwebtoken';

export const generateToken = (email: string, role: string) => {
    const secret = process.env.JWT_SECRET || "superSecret"
    return jwt.sign({ email, role }, secret, { expiresIn: '1h' });
};