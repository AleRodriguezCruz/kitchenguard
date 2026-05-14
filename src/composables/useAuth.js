// src/composables/useAuth.js
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'

// Estado global persistente mientras la app esté abierta
const usuarioActual = ref(null)

export function useAuth() {
  
  // Sincronizar con Supabase inmediatamente
  const actualizarUsuario = (user) => {
    usuarioActual.value = user ? user : null
  }

  // PASO CLAVE: Escuchar el evento de recuperación
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      console.log('Modo recuperación detectado');
    }
    actualizarUsuario(session?.user)
  })

  const sendPasswordReset = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Importante: esta URL debe estar en el Dashboard de Supabase
      redirectTo: `${window.location.origin}/reset-password`, 
    })
    if (error) throw error
  }

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if (error) throw error
  }

  return { 
    user: computed(() => usuarioActual.value),
    isAuthenticated: computed(() => !!usuarioActual.value),
    sendPasswordReset,
    updatePassword,
    logout: async () => {
      await supabase.auth.signOut()
      usuarioActual.value = null
      window.location.replace('/login')
    }
  }
}
