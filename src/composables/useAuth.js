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

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
    return data.session
  }

  return { user, login, logout, getSession }
}