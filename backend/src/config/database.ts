import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log : ["error", "query"],
    errorFormat : "prretty"
})

export default prisma