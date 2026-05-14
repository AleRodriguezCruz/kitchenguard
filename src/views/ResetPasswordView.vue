<template>
  <div class="reset-container">
    <div class="reset-card">
      <div class="logo">
        <h2>🔐 KitchenGuard</h2>
        <p>Restablecer contraseña</p>
      </div>

      <div v-if="!showResetForm && !success">
        <form @submit.prevent="sendResetEmail" class="reset-form">
          <div class="form-group">
            <label>Correo electrónico</label>
            <input type="email" v-model="email" required placeholder="tu@email.com" class="reset-input" />
          </div>
          <button type="submit" :disabled="loading" class="reset-btn">
            {{ loading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
          </button>
        </form>
        <p class="back-login">
          <router-link to="/login">← Volver al inicio de sesión</router-link>
        </p>
      </div>

      <div v-else-if="showResetForm && !success">
        <form @submit.prevent="handleUpdatePassword" class="reset-form">
          <div class="form-group">
            <label>Nueva contraseña</label>
            <input type="password" v-model="newPassword" required minlength="6" placeholder="Mínimo 6 caracteres" class="reset-input" />
          </div>
          <div class="form-group">
            <label>Confirmar contraseña</label>
            <input type="password" v-model="confirmPassword" required placeholder="Repite la contraseña" class="reset-input" />
          </div>
          <div v-if="passwordsError" class="field-error">{{ passwordsError }}</div>
          <button type="submit" :disabled="loading || !passwordsMatch" class="reset-btn">
            {{ loading ? 'Actualizando...' : 'Actualizar contraseña' }}
          </button>
        </form>
      </div>

      <div v-else-if="success" class="success-message">
        <div class="success-icon">✓</div>
        <h3>¡Contraseña actualizada!</h3>
        <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
        <router-link to="/login" class="login-link">Ir al inicio de sesión</router-link>
      </div>

      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { updatePassword } = useAuth()

const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const passwordsError = ref('')
const success = ref(false)
const showResetForm = ref(false)

const passwordsMatch = computed(() => {
  return newPassword.value && confirmPassword.value && newPassword.value === confirmPassword.value
})

onMounted(async () => {
  // 1. Escuchar el evento PASSWORD_RECOVERY global de Supabase
  // Esto es lo más fiable cuando se usa el enlace del correo
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      showResetForm.value = true
    }
  })

  // 2. Respaldo manual: Revisar si el token está en la URL en este momento
  const hash = window.location.hash
  if (hash && hash.includes('access_token')) {
    showResetForm.value = true
  }
})

const sendResetEmail = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
    alert('Correo enviado. Revisa tu bandeja de entrada.')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

const handleUpdatePassword = async () => {
  if (!passwordsMatch.value) {
    passwordsError.value = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    // Usamos la función del composable que ya tiene la lógica de Supabase
    await updatePassword(newPassword.value)
    
    success.value = true
    
    // Limpieza
    localStorage.removeItem('auth_token')
    
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (error) {
    errorMessage.value = "Error: " + error.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Tu CSS se mantiene igual, está perfecto */
</style>
