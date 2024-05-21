import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get programs by channel
export const GetProgramsByChannel = async (req: Request, res: Response) => {
  const { id, categoryId } = req.params;
  //const categoryId = req.body;
    
  const programs = await prisma.program.findMany({
    where: { channelId: parseInt(id), categoryId: parseInt(categoryId) },
  });
  
  return res.status(200).json(programs);
};
  
// Get programs by category
export const GetProgramsByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
    
  const programs = await prisma.program.findMany({
    where: { categoryId: parseInt(id) },
  });

  return res.status(200).json(programs);
};

// Create a program
export const CreateProgram = async (req: Request, res: Response) => {
  const { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId } = req.body;
  
  const program = await prisma.program.create({
    data: { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId }
  });

  return res.status(200).json(program);
};
  
// Read all programs
export const GetAllPrograms = async (req: Request, res: Response) => {
  const programs = await prisma.program.findMany();

  res.status(200).json(programs);
};
  
// Update a program
export const UpdateProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId } = req.body;
    
  const program = await prisma.program.update({
    where: { id: parseInt(id) },
    data: { title, duration, description, videoUrl, posterURL, channelId, typeId, categoryId }
  });

  return res.status(200).json(program);
};
  
// Delete a program
export const DeleteProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
    
  await prisma.program.delete({ where: { id: parseInt(id) } });
    
  return res.status(204).send();
};