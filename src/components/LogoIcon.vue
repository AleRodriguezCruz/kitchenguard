<template>
  <svg 
    width="200" 
    height="60" 
    viewBox="0 0 200 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    class="kitchenguard-logo"
  >
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FF1744" />
        <stop offset="100%" style="stop-color:#E63946" />
      </linearGradient>
    </defs>
    
    <!-- Icono de Manzana con Escudo -->
    <g transform="translate(30, 30)">
      <!-- Círculo protector -->
      <circle cx="0" cy="0" r="25" fill="none" stroke="url(#iconGradient)" stroke-width="2"
              stroke-dasharray="4,4">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 0 0" 
          to="360 0 0" 
          dur="15s" 
          repeatCount="indefinite"
        />
      </circle>
      
      <!-- Escudo pequeño -->
      <path d="M-8,-18 L0,-24 L8,-18 L6,0 C4,12 -4,12 -6,0Z" 
            fill="url(#iconGradient)" opacity="0.9"/>
      
      <!-- Manzana -->
      <path d="M-10,8 C-10,-5 -5,-18 0,-20 C5,-18 10,-5 10,8 C10,18 5,24 0,26 C-5,24 -10,18 -10,8Z" 
            fill="url(#iconGradient)"/>
      
      <!-- Brillo manzana -->
      <ellipse cx="-4" cy="-2" rx="3" ry="5" fill="rgba(255,255,255,0.3)" 
               transform="rotate(-15, -4, -2)"/>
      
      <!-- Hoja -->
      <path d="M0,-19 C5,-26 12,-28 15,-25 C12,-22 5,-20 0,-19Z" 
            fill="#4CAF50"/>
    </g>
    
    <!-- Texto del Logo -->
    <text x="70" y="28" text-anchor="start" fill="white" 
          font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="20" 
          letter-spacing="1">
      Kitchen
    </text>
    <text x="70" y="48" text-anchor="start" fill="url(#iconGradient)" 
          font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="16" 
          letter-spacing="3">
      GUARD
    </text>
    
    <!-- Línea separadora -->
    <line x1="65" y1="12" x2="65" y2="52" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  </svg>
</template>

<script setup>
// No necesita lógica adicional
</script>

<style scoped>
.kitchenguard-logo {
  display: block;
}
</style>