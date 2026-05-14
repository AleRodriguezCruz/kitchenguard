<!-- src/views/ResetPasswordView.vue -->
<template>
  <div class="reset-container">
    <div class="reset-card">
      <div class="logo">
        <h2>🔐 KitchenGuard</h2>
        <p>Restablecer contraseña</p>
      </div>

      <!-- Estado 1: Solicitando reset (sin token) -->
      <div v-if="!showResetForm && !success">
        <form @submit.prevent="sendResetEmail" class="reset-form">
          <div class="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              v-model="email"
              required
              placeholder="tu@email.com"
              class="reset-input"
            />
          </div>
          <button type="submit" :disabled="loading" class="reset-btn">
            {{ loading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
          </button>
        </form>
        <p class="back-login">
          <router-link to="/login">← Volver al inicio de sesión</router-link>
        </p>
      </div>

      <!-- Estado 2: Formulario para nueva contraseña (con token válido) -->
      <div v-else-if="showResetForm && !success">
        <form @submit.prevent="updatePassword" class="reset-form">
          <div class="form-group">
            <label>Nueva contraseña</label>
            <input
              type="password"
              v-model="newPassword"
              required
              minlength="6"
              placeholder="Mínimo 6 caracteres"
              class="reset-input"
            />
          </div>
          <div class="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              v-model="confirmPassword"
              required
              placeholder="Repite la contraseña"
              class="reset-input"
            />
          </div>
          <div v-if="passwordsError" class="field-error">{{ passwordsError }}</div>
          <button type="submit" :disabled="loading || !passwordsMatch" class="reset-btn">
            {{ loading ? 'Actualizando...' : 'Actualizar contraseña' }}
          </button>
        </form>
      </div>

      <!-- Estado 3: Éxito -->
      <div v-else-if="success" class="success-message">
        <div class="success-icon">✓</div>
        <h3>¡Contraseña actualizada!</h3>
        <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
        <router-link to="/login" class="login-link">Ir al inicio de sesión</router-link>
      </div>

      <!-- Mensajes de error generales -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const route = useRoute()

// Estado reactivo
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const passwordsError = ref('')
const success = ref(false)
const showResetForm = ref(false)

// Validación de coincidencia de contraseñas
const passwordsMatch = computed(() => {
  return newPassword.value && confirmPassword.value && newPassword.value === confirmPassword.value
})

// Detectar token en la URL al montar el componente
onMounted(async () => {
  // Esperar un breve instante para que Supabase procese el hash si ya está en la URL
  await new Promise(resolve => setTimeout(resolve, 100))

  // 1. Revisar parámetros de consulta (query)
  const queryToken = route.query.token
  // 2. Revisar el hash de la URL (formato que usa Supabase: #access_token=...)
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const hashAccessToken = hashParams.get('access_token')
  const hashRefreshToken = hashParams.get('refresh_token')

  // Si hay token en query o en hash, activamos el modo formulario de nueva contraseña
  if (queryToken || hashAccessToken) {
    console.log('🔐 Token de recuperación detectado')
    showResetForm.value = true

    // Si el token está en el hash, establecemos la sesión manualmente
    if (hashAccessToken) {
      const { error } = await supabase.auth.setSession({
        access_token: hashAccessToken,
        refresh_token: hashRefreshToken || ''
      })
      if (error) {
        console.error('Error al establecer sesión:', error)
        errorMessage.value = 'El enlace de recuperación no es válido o ha expirado.'
        showResetForm.value = false
      }
    }
  }
})

// Enviar correo de recuperación (primer paso)
const sendResetEmail = async () => {
  if (!email.value) {
    errorMessage.value = 'Ingresa un correo electrónico'
    return
  }
  loading.value = true
  errorMessage.value = ''

  try {
    const redirectUrl = `${window.location.origin}/reset-password`
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: redirectUrl,
    })
    if (error) throw error

    success.value = true
  } catch (error) {
    console.error('Error sending reset email:', error)
    errorMessage.value = error.message || 'Error al enviar el correo. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

// Actualizar contraseña (segundo paso, con token válido)
const updatePassword = async () => {
  // Validaciones locales
  passwordsError.value = ''
  if (!passwordsMatch.value) {
    passwordsError.value = 'Las contraseñas no coinciden'
    return
  }
  if (newPassword.value.length < 6) {
    passwordsError.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    // Obtener la sesión actual (ya debería estar establecida por el token)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError

    if (!session) {
      // Si no hay sesión, intentar recuperar el token del hash nuevamente
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      if (accessToken) {
        const { error: setError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        })
        if (setError) throw setError
      } else {
        throw new Error('No se encontró una sesión activa. El enlace podría haber expirado.')
      }
    }

    // Actualizar la contraseña del usuario autenticado
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value
    })
    if (error) throw error

    success.value = true

    // Cerrar sesión para que el usuario deba iniciar sesión con la nueva contraseña
    await supabase.auth.signOut()
    localStorage.removeItem('auth_token')

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      router.replace('/login')
    }, 2000)

  } catch (error) {
    console.error('Error updating password:', error)
    errorMessage.value = error.message || 'Error al actualizar la contraseña. El enlace podría haber expirado.'
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
  backdrop-filter: blur(10px);
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
  transition: all 0.3s;
}

.reset-input:focus {
  outline: none;
  border-color: #F97316;
  background: rgba(255, 255, 255, 0.1);
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
  transition: all 0.3s;
  margin-top: 8px;
}

.reset-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.reset-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-login {
  text-align: center;
  margin-top: 24px;
}

.back-login a,
.login-link {
  color: #F97316;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s;
}

.back-login a:hover,
.login-link:hover {
  color: #EA580C;
  text-decoration: underline;
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
  font-weight: 600;
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
  margin-top: -6px;
}
</style>
