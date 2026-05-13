// src/composables/useAuth.js
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const user = ref(null)

export function useAuth() {

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    user.value = data.user
    
    // ✅ Guardar flag de autenticación (opcional, para persistencia)
    localStorage.setItem('auth_token', 'true')
    
    return data
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      user.value = null
      
      // ✅ Limpiar localStorage
      localStorage.removeItem('auth_token')
      
      // ✅ Usar router.replace para limpiar el historial
      // Importar router aquí o recibirlo como parámetro
      // Por ahora usamos window.location
      window.location.href = '/login'
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
    return data.session
  }
  
  // ✅ Función para verificar si está autenticado
  const isAuthenticated = async () => {
    const session = await getSession()
    return !!session
  }
  
  // ✅ Función para recuperar contraseña (moverla aquí para centralizar)
  const resetPassword = async (email) => {
    const redirectUrl = `${window.location.origin}/reset-password`
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    })
    if (error) throw error
    return true
  }

  return { 
    user, 
    login, 
    logout, 
    getSession, 
    isAuthenticated,
    resetPassword  // ← Exportar nueva función
  }
}
