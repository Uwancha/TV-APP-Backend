import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Create a channel
export const CreateChannel =  async (req: Request, res: Response) => {
  const { name, logo } = req.body;

  const channel = await prisma.channel.create({
    data: { name, logo }
  });

  return res.status(200).json(channel);
};
  
// Get all channels
export const GetChannels=  async (req: Request, res: Response) => {
  const channels = await prisma.channel.findMany();

  return  res.status(200).json(channels);
};
  
// Update a channel
export const UpdateChannel =  async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, logo } = req.body;
  
  const channel = await prisma.channel.update({
    where: { id: parseInt(id) },
    data: { name, logo }
  });

  return res.status(200).json(channel);
};
  
// Delete a channel
export const DeleteChannel =  async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.channel.delete({ where: { id: parseInt(id) } });
  
  return res.status(204).send();
};