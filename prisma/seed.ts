import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  const adminEmail = 'admin@infnova.com';

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log('✅ Administrator already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  await prisma.user.create({
    data: {
      fullName: 'System Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('✅ Administrator created successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
