<template>
    <h1 class="text-xl bg-amber-950">Admin Page</h1>
    <p>{{ token }}</p>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected']
})

const authStore = useAuthStore()

onMounted(() => {
    authStore.checkAuth()
})

const token = authStore.token

</script>