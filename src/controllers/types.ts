import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all types
export const GetTypes =  async (req: Request, res: Response) => {
    const types = await prisma.type.findMany();
    
    return  res.status(200).json(types);
};