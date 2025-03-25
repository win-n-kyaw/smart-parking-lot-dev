<script setup lang="ts">
const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <nuxt-link to="/" class="block mt-4 float-left lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
          </nuxt-link>
          <nuxt-link to="/signup" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Sign Up
          </nuxt-link>
          <nuxt-link to="/login" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Login
          </nuxt-link>
        </div>
        <div v-if="authStore.isAuthenticated">
          <nuxt-link to="/profile" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Profile
          </nuxt-link>
          <button @click="authStore.logout" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Logout
          </button>
        </div>
      </div>
  </nav>
  <div class="w-4/5 mx-auto h-4/5 place-content-center">
    <slot />
  </div>
</template>

<style scoped>
</style>
