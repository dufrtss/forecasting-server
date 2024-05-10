import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Eduardo',
            company: 'SATC',
            number: '+55(48)99882-9292',
            email: 'eduardo@gmail.com',
            password: await hash('123456', 6),
        },
    })

    console.log(user)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
