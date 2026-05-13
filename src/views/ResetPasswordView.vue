<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">
        Restablecer contraseña
      </h1>

      <form @submit.prevent="updatePassword" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">
            Nueva contraseña
          </label>

          <input
            v-model="password"
            type="password"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">
            Confirmar contraseña
          </label>

          <input
            v-model="confirmPassword"
            type="password"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          {{ loading ? 'Actualizando...' : 'Cambiar contraseña' }}
        </button>
      </form>

      <p
        v-if="message"
        class="mt-4 text-green-600 text-center"
      >
        {{ message }}
      </p>

      <p
        v-if="error"
        class="mt-4 text-red-600 text-center"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const message = ref('')
const loading = ref(false)

onMounted(async () => {
  const hashParams = new URLSearchParams(
    window.location.hash.substring(1)
  )

  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')

  if (!accessToken || !refreshToken) {
    error.value = 'Enlace inválido o expirado'
    return
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken
  })

  if (sessionError) {
    error.value = sessionError.message
  }
})

const updatePassword = async () => {
  error.value = ''
  message.value = ''

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true

  const { error: updateError } = await supabase.auth.updateUser({
    password: password.value
  })

  loading.value = false

  if (updateError) {
    error.value = updateError.message
    return
  }

  message.value = 'Contraseña actualizada correctamente'

  setTimeout(() => {
    router.push('/login')
  }, 2000)
}
</script>