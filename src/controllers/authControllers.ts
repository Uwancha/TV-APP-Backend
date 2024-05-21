import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWTSECRET as string;

export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userExists = await prisma.user.findUnique({where: { email }});

        if (userExists) {
            return res.status(409).json({error: "User already exists with this phoe number"})
        };

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: 'Email already in use' });
    }; 
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ error: 'Invalid email' });
    };

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({message: "Incorrect password"});
    };

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

    return res.json({ token });
};