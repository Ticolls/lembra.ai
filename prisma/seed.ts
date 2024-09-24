import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

async function main() {
    const appPlan = await prisma.appPlan.create({
        data: {
            name: "Plano grátis",
            price: 0,
        }
    })

    const admin = await prisma.user.create({
        data: {
            name: 'admin',
            email: 'admin@admin.com',
            hashedPassword: await bcrypt.hash(process.env.ADMIN_PASSWORD || "12345678", Number(process.env.SALT)),
            status: 'PAID',
            role: "ADMIN", 
            appPlanId: appPlan.id
        },
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
