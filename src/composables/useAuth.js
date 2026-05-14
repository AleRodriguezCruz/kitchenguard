// src/composables/useAuth.js
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const user = ref(null) // Estado global persistente

export function useAuth() {
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    return data
  }

  const sendPasswordReset = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // URL configurada en Supabase
    })
    if (error) throw error
  }

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    window.location.replace('/login')
  }

  return { user, login, logout, sendPasswordReset, updatePassword }
}
