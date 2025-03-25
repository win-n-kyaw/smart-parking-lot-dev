import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)
    
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user || !await bcrypt.compare(password, user.password)) {
        throw createError({
            status: 401,
            message: 'Invalid credentials'
        })
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    )

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }
})