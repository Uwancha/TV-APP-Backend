import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { io } from '../app';

const notifyDashboardUpdate = () => {
  io.emit('dashboardUpdate');
};

const prisma = new PrismaClient();

// Create a channel
export const CreateChannel =  async (req: Request, res: Response) => {
  const { name, logo } = req.body;

  try {
    const channel = await prisma.channel.create({
      data: { name, logo }
    });
  
    notifyDashboardUpdate();

    return res.status(200).json(channel);
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
};
  
// Get all channels, sort, filter and paginate 
export const GetChannels=  async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10, search, sortField, sortOrder } = req.query;
  
  const skip = (Number(page) - 1) * Number(pageSize);
  const take = Number(pageSize);
  
  const orderBy = sortField
    ? {
        [sortField as string]: sortOrder,
      }
    : {};
    
  const where: any = search
    ? {
          OR: [
            { name: { contains: search as string, mode: 'insensitive' } },
          ],
      }
    : {};

  try {
    const channels = await prisma.channel.findMany({
      where,
      skip,
      take,
      orderBy,
    });

    const total = await prisma.channel.count({ where });

  return res.json({ channels, total });   
  } catch (error) {
    res.status(500).json({ error: 'Server error' });     
  };
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

  try {
    await prisma.channel.delete({ where: { id: parseInt(id) } });
  
    notifyDashboardUpdate();
  
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
};