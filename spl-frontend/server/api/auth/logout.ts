import jwt from 'jsonwebtoken'
import prisma from "~/server/api/utils/prisma"

export default defineEventHandler(async (event) => {
  try {

    // Get token from authorization header
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader?.split(' ')[1]

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).userId }
    })

    return {
      success: true,
      message: 'Logged out successfully'
    }
  } catch (error) {
    console.error('Logout error:', error)
    throw createError({
      statusCode: 500,
      message: 'Error during logout'
    })
  }
})