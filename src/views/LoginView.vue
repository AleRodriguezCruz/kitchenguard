<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo KitchenGuard Profesional -->
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

      <!-- TABS -->
      <div class="tabs">
        <button :class="['tab', modo === 'login' ? 'active' : '']" @click="modo = 'login'; limpiar()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Iniciar Sesión
        </button>
        <button :class="['tab', modo === 'registro' ? 'active' : '']" @click="modo = 'registro'; limpiar()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          Registrarse
        </button>
      </div>

      <!-- LOGIN -->
      <form v-if="modo === 'login'" @submit.prevent="handleLogin" class="form-animate">
        <div class="form-group">
          <label>Correo electrónico</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input v-model="email" type="email" placeholder="tu@correo.com" required />
          </div>
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input v-model="password" type="password" placeholder="••••••••" required />
          </div>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Entrando...' : 'Iniciar Sesión' }}
        </button>
        <p class="link" @click="modo = 'recovery'; limpiar()">¿Olvidaste tu contraseña?</p>
      </form>

      <!-- REGISTRO -->
      <form v-if="modo === 'registro'" @submit.prevent="handleRegistro" class="form-animate">
        <div class="form-group">
          <label>Correo electrónico</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input v-model="email" type="email" placeholder="tu@correo.com" required />
          </div>
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input v-model="password" type="password" placeholder="Mínimo 6 caracteres" required />
          </div>
        </div>
        <div class="form-group">
          <label>Confirmar contraseña</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <path d="M9 12l2 2 4-4"/>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            </svg>
            <input v-model="passwordConfirm" type="password" placeholder="Repite tu contraseña" required />
          </div>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
        </button>
        <p class="link" @click="modo = 'login'; limpiar()">← Volver al inicio de sesión</p>
      </form>

      <!-- RECUPERAR CONTRASEÑA -->
      <form v-if="modo === 'recovery'" @submit.prevent="handleRecovery" class="form-animate">
        <div class="recovery-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
          </svg>
        </div>
        <p class="recovery-text">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        <div class="form-group">
          <label>Correo electrónico</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input v-model="email" type="email" placeholder="tu@correo.com" required />
          </div>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>
        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Enviando...' : 'Enviar enlace' }}
        </button>
        <p class="link" @click="modo = 'login'; limpiar()">← Volver al login</p>
      </form>

      <!-- Footer -->
      <div class="login-footer">
        <router-link to="/" class="footer-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver al inicio
        </router-link>
      </div>
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
    
    // Guardar token en localStorage
    localStorage.setItem('auth_token', 'true')
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
/* ─── DISEÑO PROFESIONAL KITCHENGUARD ─── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0A0D14 0%, #111827 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.login-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

/* Logo */
.logo-section {
  text-align: center;
  margin-bottom: 28px;
}

.logo-svg {
  display: inline-block;
  filter: drop-shadow(0 4px 12px rgba(249, 115, 22, 0.2));
}

.logo-subtitle {
  color: #475569;
  font-size: 13px;
  margin-top: 12px;
  letter-spacing: 0.3px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 28px;
  background: #111827;
  border-radius: 12px;
  padding: 4px;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #475569;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tab:hover {
  color: #94A3B8;
}

.tab.active {
  background: #F97316;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* Formularios */
.form-animate {
  animation: fadeSlideIn 0.3s ease;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  color: #94A3B8;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  z-index: 1;
}

input {
  width: 100%;
  background: #0A0D14;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 12px 14px 12px 40px;
  color: #F8FAFC;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
}

input:focus {
  border-color: #F97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

input::placeholder {
  color: #475569;
}

/* Botones */
.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #F97316, #EA580C);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #EA580C, #C2410C);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Mensajes */
.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #EF4444;
  font-size: 13px;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10B981;
  font-size: 13px;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 12px;
}

/* Links */
.link {
  text-align: center;
  color: #475569;
  font-size: 13px;
  margin-top: 16px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.link:hover {
  color: #F97316;
}

/* Recuperación */
.recovery-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.recovery-text {
  color: #94A3B8;
  font-size: 13px;
  margin-bottom: 20px;
  line-height: 1.6;
  text-align: center;
}

/* Footer */
.login-footer {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #262D3D;
  text-align: center;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #475569;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #F97316;
}

/* Responsive */
@media (max-width: 480px) {
  .login-card {
    padding: 28px 20px;
  }
  
  .tab {
    font-size: 12px;
    padding: 8px 12px;
  }
  
  .tab svg {
    display: none;
  }
}
</style>