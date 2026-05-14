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
.reset-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.reset-card {
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  max-width: 450px;
  width: 100%;
}

.logo {
  text-align: center;
  margin-bottom: 32px;
}

.logo h2 {
  color: #F97316;
  font-size: 28px;
  margin-bottom: 8px;
}

.logo p {
  color: #999;
  font-size: 14px;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #ccc;
  font-size: 13px;
  font-weight: 500;
}

.reset-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 16px;
  color: white;
  font-size: 14px;
}

.reset-input:focus {
  outline: none;
  border-color: #F97316;
}

.reset-btn {
  background: linear-gradient(135deg, #F97316, #EA580C);
  border: none;
  border-radius: 12px;
  padding: 14px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.reset-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.reset-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-login {
  text-align: center;
  margin-top: 24px;
}

.back-login a, .login-link {
  color: #F97316;
  text-decoration: none;
  font-size: 13px;
}

.success-message {
  text-align: center;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: rgba(48, 209, 88, 0.2);
  border: 2px solid #30D158;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 32px;
  color: #30D158;
}

.success-message h3 {
  color: white;
  margin-bottom: 12px;
}

.success-message p {
  color: #999;
  margin-bottom: 24px;
}

.login-link {
  display: inline-block;
  background: rgba(249, 115, 22, 0.15);
  padding: 12px 24px;
  border-radius: 12px;
}

.error-message {
  background: rgba(255, 59, 48, 0.15);
  border: 1px solid #FF3B30;
  border-radius: 12px;
  padding: 12px;
  margin-top: 20px;
  text-align: center;
}

.error-message p {
  color: #FF3B30;
  font-size: 13px;
  margin: 0;
}

.field-error {
  color: #FF3B30;
  font-size: 12px;
  margin-top: -8px;
}
</style>
