<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from './lib/supabaseClient'

const router = useRouter()
const route  = useRoute()

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    // Si viene del enlace de recuperación → siempre ir a reset-password
    if (event === 'PASSWORD_RECOVERY') {
      router.push('/reset-password')
      return
    }
    // Si hizo login normal y está en login → dashboard
    if (event === 'SIGNED_IN' && route.path === '/login') {
      router.push('/dashboard')
      return
    }
    // Si cerró sesión → login
    if (event === 'SIGNED_OUT') {
      router.push('/login')
      return
    }
  })

  // Rutas públicas no verifican sesión
  const rutasPublicas = ['/login', '/reset-password']
  if (rutasPublicas.includes(route.path)) return

  // Verificar sesión al cargar
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  })
})
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
</style>
