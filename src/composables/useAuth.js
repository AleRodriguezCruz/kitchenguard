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
    localStorage.setItem('auth_token', 'true')
    return data
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      user.value = null
      localStorage.removeItem('auth_token')
      
      // ✅ Usar replace para limpiar el historial
      window.location.replace('/login')
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
    return data.session
  }

  return { user, login, logout, getSession }
}
