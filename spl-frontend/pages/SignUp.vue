<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
    <div class="mb-4">
      <label class="block mb-2">Name</label>
      <input
        v-model="name"
        type="text"
        required
        class="w-full px-3 py-2 border rounded"
        :class="{ 'border-red-500': errors.name }"
      >
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">
        {{ errors.name }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Email</label>
      <input
        v-model="email"
        type="email"
        required
        class="w-full px-3 py-2 border rounded"
        :class="{ 'border-red-500': errors.email }"
      >
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">
        {{ errors.email }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Password</label>
      <input
        v-model="password"
        type="password"
        required
        class="w-full px-3 py-2 border rounded"
        :class="{ 'border-red-500': errors.password }"
      >
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">
        {{ errors.password }}
      </p>
    </div>

    <div class="mb-6">
      <label class="block mb-2">Confirm Password</label>
      <input
        v-model="confirmPassword"
        type="password"
        required
        class="w-full px-3 py-2 border rounded"
        :class="{ 'border-red-500': errors.confirmPassword }"
      >
      <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
        {{ errors.confirmPassword }}
      </p>
    </div>

    <button
      type="submit"
      class="w-full px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-500 transition-colors"
      :disabled="loading"
    >
      {{ loading ? 'Creating account...' : 'Sign Up' }}
    </button>

    <p v-if="error" class="mt-4 text-red-500 text-center">
      {{ error }}
    </p>

    <p class="mt-4 text-center">
      Already have an account?
      <NuxtLink to="/login" class="text-blue-500 hover:text-blue-600">
        Login here
      </NuxtLink>
    </p>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function validateForm() {
  let isValid = true

  // Reset errors
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')

  // Name validation
  if (name.value.length < 2) {
    errors.name = 'Name must be at least 2 characters long'
    isValid = false
  }

  // Email validation
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (password.value.length < 8) {
    errors.password = 'Password must be at least 8 characters long'
    isValid = false
  }

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

async function handleSubmit() {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    const result = await authStore.signup(
      name.value,
      email.value,
      password.value
    )

    if (result.success) {
      router.push('/profile')
    } else {
      error.value = result.error
    }
  } catch (e) {
    error.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}
</script>