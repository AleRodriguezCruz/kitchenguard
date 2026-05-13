<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from './lib/supabaseClient'

const router = useRouter()
const route  = useRoute()

onMounted(async () => {
  // Si viene del enlace de recuperación de contraseña
  const hash = window.location.hash
  if (hash && hash.includes('type=recovery')) {
    router.push('/reset-password')
    return
  }

  // Si ya está en reset-password o login no hacer nada
  if (route.path === '/reset-password' || route.path === '/login') {
    return
  }

  // Verificar sesión normal
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
})
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
</style>