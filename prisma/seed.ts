import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const types = [
    { name: 'Live TV' },
    { name: 'Movies' },
    { name: 'TV Shows' },
    { name: 'Sports' }
  ];

  const categories = [
    { name: 'Recommended' },
    { name: 'Popular' },
    { name: 'Featured' },
    { name: 'Favorites' },
    { name: 'Watch Later' }
  ];

  const channels = [
    { name: 'HBO' },
    { name: 'ABC TV' },
    { name: 'NBC TV' },
    { name: 'AMC TV' },
    { name: 'Disney' },
    { name: 'FOX' }
  ];

  await prisma.type.createMany({ data: types });
  await prisma.category.createMany({ data: categories });
  await prisma.channel.createMany({ data: channels });
};

main()
  .then(() => console.log('Database seeded'))
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
