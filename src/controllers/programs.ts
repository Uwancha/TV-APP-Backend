import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { io } from '../app';

const notifyDashboardUpdate = () => {
  io.emit('dashboardUpdate');
};

const prisma = new PrismaClient();

// Get programs by channel
export const GetProgramsByChannel = async (req: Request, res: Response) => {
  const { id, categoryId } = req.params;
    
  try {
    const programs = await prisma.program.findMany({
      where: { channelId: parseInt(id), categoryId: parseInt(categoryId) },
    });
    
    return res.status(200).json(programs);
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  };
};
  
// Get programs by category
export const GetProgramsByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const programs = await prisma.program.findMany({
      where: { categoryId: parseInt(id) },
    });
    return res.status(200).json(programs);
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
};

// Create a program
export const CreateProgram = async (req: Request, res: Response) => {
  const { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId } = req.body;
  
  try {
    const program = await prisma.program.create({
      data: { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId }
    });
  
    notifyDashboardUpdate()
    return res.status(200).json(program);
  
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
};
  
// Reads all programs, filters, sorts and paginate.
export const GetAllPrograms = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10, search, sortField, sortOrder } = req.query;

  const skip = (Number(page) - 1) * Number(pageSize);
  const take = Number(pageSize);

  const where: any = search 
    ? {
        OR: [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } },
        ],
      }
    :
      {};

  const orderBy = sortField
    ? {
        [sortField as string]: sortOrder,
      }
    : 
    {};

  try {
    const programs = await prisma.program.findMany({
      where,
      skip,
      take,
      orderBy,
    });

    const total = await prisma.program.count({ where });

    res.json({ programs, total });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
  
// Update a program
export const UpdateProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId } = req.body;
    
  try {
    const program = await prisma.program.update({
      where: { id: parseInt(id) },
      data: { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId }
    });
  
    return res.status(200).json(program);
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
};
  
// Delete a program
export const DeleteProgram = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.program.delete({ where: { id: parseInt(id) } });

  notifyDashboardUpdate()
  return res.status(204).send();
  } catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
};