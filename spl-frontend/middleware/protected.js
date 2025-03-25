export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return
    const authStore = useAuthStore()
    await authStore.checkAuth()

    if (!authStore.user) {
        return navigateTo('/login')
    }
})