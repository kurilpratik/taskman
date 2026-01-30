import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('DB connected via Prisma');
  } catch (error: any) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('DB disconnected via Prisma');
  } catch (error: any) {
    console.error(`Database disconnection error: ${error.message}`);
    process.exit(1);
  }
};

export { prisma, connectDB, disconnectDB };
