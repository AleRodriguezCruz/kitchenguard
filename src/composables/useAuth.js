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
    return data
  }

  // src/composables/useAuth.js
const logout = async () => {
  try {
    await supabase.auth.signOut()
    
    // 🔒 LIMPIAR HISTORIAL COMPLETAMENTE
    // Esto evita que se pueda volver atrás con las flechas
    window.location.href = '/login'
    
    // No usar router.push porque mantiene el historial
    // router.push('/login')
    
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
