<script setup lang="ts">
// Define page metadata to use the 'protected' middleware
definePageMeta({
  middleware: ['protected']
})

// Access the auth store and retrieve the token
const authStore = useAuthStore()
const token = authStore.token

// Decode the JWT payload
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1] // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') // Convert to base64
    const payload = JSON.parse(atob(base64)) // Decode and parse the payload
    return payload
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

// Get the decoded token payload
const tokenInfo = token ? decodeJWT(token) : null
</script>

<template>
  <div>
    <p v-if="tokenInfo">Token Information:</p>
    <pre v-if="tokenInfo">{{ JSON.stringify(tokenInfo, null, 2) }}</pre>
    <p v-else>No token found. Please log in.</p>
  </div>
</template>
