import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Gets data for charts in the admin dashboard
export const GetDashboardData = async (req: Request, res: Response) => {
  try {
    const userCount = await prisma.user.count();
    const programCount = await prisma.program.count();
    const channelCount = await prisma.channel.count();

    const programsByCategory = await prisma.program.groupBy({
      by: ['categoryId'],
      _count: {
        id: true,
      },
    });

    const programsByType = await prisma.program.groupBy({
      by: ['typeId'],
      _count: {
        id: true,
      },
    });

    // Fetch category names
    const categoryIds = programsByCategory.map(item => item.categoryId);
    const categories = await prisma.category.findMany({
      where: {
        id: { in: categoryIds },
      },
    });

    // Fetch type names
    const typeIds = programsByType.map(item => item.typeId);
    const types = await prisma.type.findMany({
      where: {
        id: { in: typeIds },
      },
    });

    // Map category names to programsByCategory
    const programsByCategoryWithNames = programsByCategory.map(item => {
      const category = categories.find(cat => cat.id === item.categoryId);
      return {
        categoryId: item.categoryId,
        categoryName: category ? category.name : null,
        count: item._count.id,
      };
    });

    // Map type names to programsByType
    const programsByTypeWithNames = programsByType.map(item => {
      const type = types.find(t => t.id === item.typeId);
      return {
        typeId: item.typeId,
        typeName: type ? type.name : null,
        count: item._count.id,
      };
    });

    return res.status(200).json({
      userCount,
      programCount,
      channelCount,
      programsByCategory: programsByCategoryWithNames,
      programsByType: programsByTypeWithNames,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};