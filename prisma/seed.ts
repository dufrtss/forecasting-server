import { prisma } from '@/lib/prisma'

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Eduardo',
            company: 'SATC',
            number: '+55(48)99882-9292',
            email: 'eduardo@gmail.com',
            password: '123456',
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
