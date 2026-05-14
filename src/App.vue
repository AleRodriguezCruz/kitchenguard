<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from './lib/supabaseClient'

const router = useRouter()

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      router.push({ name: 'reset-password' })
    }
    if (event === 'SIGNED_IN' && window.location.pathname === '/login') {
      router.push({ name: 'dashboard' })
    }
    if (event === 'SIGNED_OUT') {
      router.push({ name: 'login' })
    }
  })
})
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
</style>
