<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router          = useRouter()
const password        = ref('')
const passwordConfirm = ref('')
const error           = ref('')
const mensaje         = ref('')
const loading         = ref(false)

onMounted(async () => {
  // Con detectSessionInUrl=true en supabaseClient,
  // Supabase ya procesó el token automáticamente
  const { data } = await supabase.auth.getSession()
  
  if (!data.session) {
    // Si no hay sesión intenta leer el hash manualmente como fallback
    const hashParams   = new URLSearchParams(window.location.hash.substring(1))
    const accessToken  = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')
    const type         = hashParams.get('type')

    if (type === 'recovery' && accessToken) {
      const { error: err } = await supabase.auth.setSession({
        access_token:  accessToken,
        refresh_token: refreshToken
      })
      if (err) {
        error.value = 'Enlace inválido o expirado. Solicita uno nuevo.'
      }
    } else {
      router.push('/login')
    }
  }
})

const handleReset = async () => {
  error.value   = ''
  mensaje.value = ''

  if (password.value !== passwordConfirm.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  loading.value = true
  try {
    const { error: err } = await supabase.auth.updateUser({
      password: password.value
    })
    if (err) throw err
    mensaje.value = '¡Contraseña actualizada! Redirigiendo...'
    setTimeout(() => router.push('/dashboard'), 2000)
  } catch (e) {
    error.value = e.message || 'Error al actualizar la contraseña'
  } finally {
    loading.value = false
  }
}
</script>