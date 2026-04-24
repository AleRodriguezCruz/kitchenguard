<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <span class="apple">🍎</span>
        <h1>KitchenGuard</h1>
        <p>Sistema inteligente de seguridad del hogar</p>
      </div>

      <!-- TABS -->
      <div class="tabs">
        <button :class="['tab', modo === 'login' ? 'active' : '']" @click="modo = 'login'">Iniciar Sesión</button>
        <button :class="['tab', modo === 'registro' ? 'active' : '']" @click="modo = 'registro'">Registrarse</button>
      </div>

      <!-- LOGIN -->
      <form v-if="modo === 'login'" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Correo electrónico</label>
          <input v-model="email" type="email" placeholder="tu@correo.com" required />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Iniciar Sesión' }}
        </button>
        <p class="link" @click="modo = 'recovery'">¿Olvidaste tu contraseña?</p>
      </form>

      <!-- REGISTRO -->
      <form v-if="modo === 'registro'" @submit.prevent="handleRegistro">
        <div class="form-group">
          <label>Correo electrónico</label>
          <input v-model="email" type="email" placeholder="tu@correo.com" required />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="Mínimo 6 caracteres" required />
        </div>
        <div class="form-group">
          <label>Confirmar contraseña</label>
          <input v-model="passwordConfirm" type="password" placeholder="Repite tu contraseña" required />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
        </button>
      </form>

      <!-- RECUPERAR CONTRASEÑA -->
      <form v-if="modo === 'recovery'" @submit.prevent="handleRecovery">
        <p class="recovery-text">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        <div class="form-group">
          <label>Correo electrónico</label>
          <input v-model="email" type="email" placeholder="tu@correo.com" required />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Enviando...' : 'Enviar enlace' }}
        </button>
        <p class="link" @click="modo = 'login'">← Volver al login</p>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()

const modo            = ref('login')
const email           = ref('')
const password        = ref('')
const passwordConfirm = ref('')
const error           = ref('')
const mensaje         = ref('')
const loading         = ref(false)

const limpiar = () => {
  error.value   = ''
  mensaje.value = ''
}

const handleLogin = async () => {
  limpiar()
  loading.value = true
  try {
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (err) throw err
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Correo o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}

const handleRegistro = async () => {
  limpiar()
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
    const { error: err } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (err) throw err
    mensaje.value = '¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.'
    email.value = ''; password.value = ''; passwordConfirm.value = ''
  } catch (e) {
    error.value = e.message || 'Error al registrarse'
  } finally {
    loading.value = false
  }
}

const handleRecovery = async () => {
  limpiar()
  loading.value = true
  try {
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/dashboard`
    })
    if (err) throw err
    mensaje.value = '¡Enlace enviado! Revisa tu correo.'
    email.value = ''
  } catch (e) {
    error.value = 'Error al enviar el enlace'
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
.logo {
  text-align: center;
  margin-bottom: 24px;
}
.apple { font-size: 48px; }
.logo h1 { color: #F5F5F5; font-size: 24px; margin: 8px 0 4px; }
.logo p { color: #888; font-size: 13px; }
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}
.tab {
  flex: 1;
  background: #0D0D0D;
  border: 1px solid #2A2A2A;
  color: #888;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
}
.tab.active {
  background: #E63946;
  color: white;
  border-color: #E63946;
  font-weight: bold;
}
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
.error { color: #FF3B30; font-size: 13px; text-align: center; margin-bottom: 8px; }
.success { color: #30D158; font-size: 13px; text-align: center; margin-bottom: 8px; }
.link {
  text-align: center;
  color: #888;
  font-size: 13px;
  margin-top: 14px;
  cursor: pointer;
}
.link:hover { color: #E63946; }
.recovery-text {
  color: #888;
  font-size: 13px;
  margin-bottom: 16px;
  line-height: 1.5;
}
</style>