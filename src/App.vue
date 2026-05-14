// src/App.vue
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router' // Importar router
import { supabase } from './lib/supabaseClient'

const router = useRouter()

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      // Forzamos la redirección a la vista de reset
      router.push('/reset-password')
    }
  })
})
</script>
