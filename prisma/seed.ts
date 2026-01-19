import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { hash } from 'bcrypt';
import { Role } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const password = await hash('yusuf', 12);
  const user = await prisma.user.create({
    data: {
      name: 'yusufhiqmal',
      email: 'yusufhiqmal@gmail.com',
      password: password,
      role: Role.ADMIN
    }
  })
  console.log(user)

  const category = await prisma.categories.create({
    data: {
      name_categories: 'Electronics',
      description: 'Electronic devices and accessories'
    }
  })
  console.log('Created category:', category)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });