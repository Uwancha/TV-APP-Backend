import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Get favorite programs for a user
export const GetFavorites =  async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { favorites: true }
  });

  return res.status(200).json(user?.favorites || []);
};
  
// Get watch later programs for a user
export const GetWatchLaters = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { watchLater: true }
  });

  return res.status(200).json(user?.watchLater || []);
};

// Add to favorites
export const AddToFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { programId } = req.body;
  
  await prisma.user.update({
    where: { id: parseInt(id) },
    data: { favorites: { connect: { id: programId } } }
  });
    
  return res.status(204).send();
};
  
export const AddToWatchLater = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { programId } = req.body;

  await prisma.user.update({
    where: { id: parseInt(id) },
    data: { watchLater: { connect: { id: programId } } }
  });

  return res.status(204).send();
};

// Removes a program from user's favorite list
export const RemoveFromFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { programId } = req.body;
  
  await prisma.user.update({
    where: { id: parseInt(id) },
    data: { favorites: { disconnect: { id: programId } } }
  });
    
  return res.status(204).send();
};
  
// Removes a program from user's watch later list
export const RemoveFromWatchLater = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { programId } = req.body;

  await prisma.user.update({
    where: { id: parseInt(id) },
    data: { watchLater: { disconnect: { id: programId } } }
  });

  return res.status(204).send();
};