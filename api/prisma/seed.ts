import { PrismaClient } from '@prisma/client'
import Role from '../src/models/Role';
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.role.upsert({
        where: {
            code: Role.ADMIN,
        },
        update: {
            designation: "admin",
            code: "01",
        },
        create: {
            designation: "admin",
            code: "01",
        }
    });

    const normalRole = await prisma.role.upsert({
        where: {
            code: Role.NORMAL,
        },
        update: {
            designation: "normal",
            code: "02",
        },
        create: {
            designation: "normal",
            code: "02",
        }
    });
    console.log({ admin, normalRole })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })