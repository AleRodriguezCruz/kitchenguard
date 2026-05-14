<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

onMounted(() => {
  // Solo escuchar eventos de autenticación sin redirigir automáticamente
  supabase.auth.onAuthStateChange((event, session) => {
    // Si es recuperación, no hacemos nada aquí; el router y ResetPasswordView lo manejan
    if (event === 'PASSWORD_RECOVERY') {
      // No redirigir, solo dejar que el router procese la ruta
      return
    }
  })
})
</script>
