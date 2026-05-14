<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-section">
        <svg width="200" height="56" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
          <defs>
            <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F97316"/>
              <stop offset="100%" stop-color="#EA580C"/>
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
          <circle cx="30" cy="30" r="20" fill="none" stroke="url(#loginLogoGrad)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="15s" repeatCount="indefinite"/>
          </circle>
          <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#loginLogoGrad)"/>
          <ellipse cx="24" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 24, 20)"/>
          <path d="M30 15 C33 8 38 5 42 8 C38 10 34 12 30 15Z" fill="#166534"/>
          <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
          <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
          <line x1="64" y1="14" x2="64" y2="50" stroke="#323B4E" stroke-width="1"/>
          <circle cx="228" cy="30" r="4" fill="#10B981" opacity="0.9"/>
        </svg>
        <p class="logo-subtitle">Sistema inteligente de seguridad del hogar</p>
      </div>

      <div class="tabs">
        <button :class="['tab', modo === 'login' ? 'active' : '']" @click="modo = 'login'; limpiar()">
          Iniciar Sesión
        </button>
        <button :class="['tab', modo === 'registro' ? 'active' : '']" @click="modo = 'registro'; limpiar()">
          Registrarse
        </button>
      </div>

      <form v-if="modo === 'login'" @submit.prevent="handleLogin" class="form-animate">
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
        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? 'Entrando...' : 'Iniciar Sesión' }}
        </button>
        <p class="link" @click="modo = 'recovery'; limpiar()">¿Olvidaste tu contraseña?</p>
      </form>

      <form v-if="modo === 'registro'" @submit.prevent="handleRegistro" class="form-animate">
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
        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
        </button>
        <p class="link" @click="modo = 'login'; limpiar()">← Volver al login</p>
      </form>

      <form v-if="modo === 'recovery'" @submit.prevent="handleRecovery" class="form-animate">
        <p class="recovery-text">Enviaremos un enlace a tu correo para restablecer tu contraseña.</p>
        <div class="form-group">
          <label>Correo electrónico</label>
          <input v-model="email" type="email" placeholder="tu@correo.com" required />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? 'Enviando...' : 'Enviar enlace' }}
        </button>
        <p class="link" @click="modo = 'login'; limpiar()">← Volver al login</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const modo = ref('login')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const error = ref('')
const mensaje = ref('')
const loading = ref(false)

const limpiar = () => {
  error.value = ''
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
    localStorage.setItem('auth_token', 'true')
    router.replace('/dashboard')
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
  loading.value = true
  try {
    const { error: err } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (err) throw err
    mensaje.value = '¡Revisa tu correo para confirmar la cuenta!'
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const handleRecovery = async () => {
  limpiar()
  loading.value = true
  try {
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (err) throw err
    mensaje.value = 'Enlace enviado a tu correo.'
  } catch (e) {
    error.value = e.message
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
  background: #0A0D14;
  padding: 20px;
  font-family: sans-serif;
}
.login-card {
  background: #1A1F2E;
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #262D3D;
}
.logo-section { text-align: center; margin-bottom: 20px; }
.logo-subtitle { color: #475569; font-size: 12px; }
.tabs { display: flex; gap: 5px; margin-bottom: 20px; background: #111827; padding: 5px; border-radius: 12px; }
.tab { flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; background: none; color: #475569; }
.tab.active { background: #F97316; color: white; }
.form-group { margin-bottom: 15px; }
label { display: block; color: #94A3B8; font-size: 12px; margin-bottom: 5px; }
input { width: 100%; padding: 12px; background: #0A0D14; border: 1px solid #262D3D; border-radius: 10px; color: white; outline: none; box-sizing: border-box;}
input:focus { border-color: #F97316; }
.submit-btn { width: 100%; padding: 12px; background: #F97316; color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; margin-top: 10px; }
.error { color: #EF4444; font-size: 13px; text-align: center; margin-top: 10px; }
.success { color: #10B981; font-size: 13px; text-align: center; margin-top: 10px; }
.link { color: #475569; font-size: 13px; text-align: center; margin-top: 15px; cursor: pointer; }
.recovery-text { color: #94A3B8; font-size: 13px; text-align: center; margin-bottom: 15px; }
</style>
