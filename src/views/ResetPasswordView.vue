<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <span class="apple">🍎</span>
        <h1>KitchenGuard</h1>
        <p>Restablecer contraseña</p>
      </div>

      <form @submit.prevent="handleReset">
        <div class="form-group">
          <label>Nueva contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>
        <div class="form-group">
          <label>Confirmar contraseña</label>
          <input
            v-model="passwordConfirm"
            type="password"
            placeholder="Repite tu contraseña"
            required
          />
        </div>
        <p v-if="error"   class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Guardando...' : 'Guardar nueva contraseña' }}
        </button>
        <p class="link" @click="router.push('/login')">← Volver al login</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router          = useRouter()
const password        = ref('')
const passwordConfirm = ref('')
const error           = ref('')
const mensaje         = ref('')
const loading         = ref(false)

onMounted(async () => {
  // Supabase manda el token en el hash de la URL
  const hash = window.location.hash
  if (hash && hash.includes('access_token')) {
    const params = new URLSearchParams(hash.substring(1))
    const accessToken  = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    if (accessToken) {
      await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
    }
  }
})

const handleReset = async () => {
  error.value   = ''
  mensaje.value = ''

  if (password.value !== passwordConfirm.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  loading.value = true
  try {
    const { error: err } = await supabase.auth.updateUser({
      password: password.value
    })
    if (err) throw err
    mensaje.value = '¡Contraseña actualizada correctamente!'
    setTimeout(() => router.push('/dashboard'), 2000)
  } catch (e) {
    error.value = e.message || 'Error al actualizar la contraseña'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0D0D0D;
}
.login-card {
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
}
.logo { text-align: center; margin-bottom: 24px; }
.apple { font-size: 48px; }
.logo h1 { color: #F5F5F5; font-size: 24px; margin: 8px 0 4px; }
.logo p  { color: #888; font-size: 13px; }
.form-group { margin-bottom: 16px; }
label { display: block; color: #888; font-size: 12px; margin-bottom: 6px; }
input {
  width: 100%;
  background: #0D0D0D;
  border: 1px solid #2A2A2A;
  border-radius: 10px;
  padding: 12px;
  color: #F5F5F5;
  font-size: 14px;
  box-sizing: border-box;
}
input:focus { outline: none; border-color: #E63946; }
button {
  width: 100%;
  background: #E63946;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 4px;
}
button:disabled { opacity: 0.6; cursor: not-allowed; }
.error   { color: #FF3B30; font-size: 13px; text-align: center; margin-bottom: 8px; }
.success { color: #30D158; font-size: 13px; text-align: center; margin-bottom: 8px; }
.link {
  text-align: center;
  color: #888;
  font-size: 13px;
  margin-top: 14px;
  cursor: pointer;
}
.link:hover { color: #E63946; }
</style>