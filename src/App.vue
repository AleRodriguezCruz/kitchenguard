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
  // Rutas que nunca deben redirigir
  const rutasPublicas = ['/login', '/reset-password']
  if (rutasPublicas.includes(route.path)) return

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