<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <span class="apple">🍎</span>
        <h1>KitchenGuard</h1>
        <p>Sistema inteligente de seguridad del hogar</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            placeholder="tu@correo.com"
            required
          />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Iniciar Sesión' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email    = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

const handleLogin = async () => {
  error.value   = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Correo o contraseña incorrectos'
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
  max-width: 400px;
}
.logo {
  text-align: center;
  margin-bottom: 32px;
}
.apple {
  font-size: 48px;
}
.logo h1 {
  color: #F5F5F5;
  font-size: 24px;
  margin: 8px 0 4px;
}
.logo p {
  color: #888;
  font-size: 13px;
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  color: #888;
  font-size: 12px;
  margin-bottom: 6px;
}
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
input:focus {
  outline: none;
  border-color: #E63946;
}
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
  margin-top: 8px;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #FF3B30;
  font-size: 13px;
  text-align: center;
  margin-bottom: 8px;
}
</style>