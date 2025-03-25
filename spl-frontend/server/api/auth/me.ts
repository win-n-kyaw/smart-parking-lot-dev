import jwt from 'jsonwebtoken'
import prisma from "~/server/api/utils/prisma"

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'Authorization')
    if (!authHeader) {
        throw createError({ status: 401, message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        const user = await prisma.user.findUnique({
            where: { id: (decoded as any).userId }
        })
        if (!user) {
            throw createError({ status: 401, message: 'User Not found' })
        }
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    } catch (error) {
        throw createError({ status: 401, message: 'Invalid Token' })
    }
})
