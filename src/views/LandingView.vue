<template>
  <div class="landing">
    <!-- Hero Section -->
    <section class="hero">
      <nav class="nav">
        <div class="nav-logo">
          <svg width="150" height="42" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="landingLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F97316"/>
                <stop offset="100%" stop-color="#EA580C"/>
              </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
            <circle cx="30" cy="30" r="20" fill="none" stroke="url(#landingLogo)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
            <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#landingLogo)"/>
            <ellipse cx="24" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 24, 20)"/>
            <path d="M30 15 C33 8 38 5 42 8 C38 10 34 12 30 15Z" fill="#166534"/>
            <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
            <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
            <line x1="64" y1="14" x2="64" y2="50" stroke="#323B4E" stroke-width="1"/>
            <circle cx="228" cy="30" r="4" fill="#10B981" opacity="0.9"/>
          </svg>
        </div>
        <div class="nav-actions">
          <router-link to="/login" class="btn-outline">Iniciar Sesión</router-link>
          <router-link to="/login?register=true" class="btn-primary">Comenzar Ahora</router-link>
        </div>
      </nav>

      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">🔒 Protección Inteligente</span>
          <h1>Tu cocina,<br/><span class="gradient-text">siempre segura</span></h1>
          <p>KitchenGuard monitorea tu cocina 24/7 detectando fugas de gas, estufas abandonadas y cambios de temperatura en tiempo real.</p>
          <div class="hero-buttons">
            <router-link to="/login?register=true" class="btn-primary-large">Comenzar Gratis</router-link>
            <a href="#features" class="btn-text">Ver funcionalidades →</a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">99.8%</span>
              <span class="stat-desc">Precisión</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-desc">Monitoreo</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">&lt;1s</span>
              <span class="stat-desc">Respuesta</span>
            </div>
          </div>
        </div>
        <div class="hero-mockup">
          <div class="phone-mockup">
            <div class="phone-screen">
              <div class="mock-header">
                <div class="mock-logo">🍎 KitchenGuard</div>
                <div class="mock-status">Online</div>
              </div>
              <div class="mock-body">
                <div class="mock-gauge">Gas: 12%</div>
                <div class="mock-temp">Temp: 22°C</div>
                <div class="mock-status-text">✓ Cocina Segura</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <h2>Protección completa para tu hogar</h2>
      <p class="section-sub">Todo lo que necesitas para dormir tranquilo</p>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">💨</div>
          <h3>Detección de Gas</h3>
          <p>Sensores que detectan fugas de gas en tiempo real con alertas instantáneas.</p>
          <span class="feature-badge">Umbral 20%</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔥</div>
          <h3>Estufa Abandonada</h3>
          <p>Detecta si dejaste la estufa encendida por más de 15 minutos y te alerta.</p>
          <span class="feature-badge">+15 min</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌡️</div>
          <h3>Control de Temperatura</h3>
          <p>Monitorea cambios bruscos de temperatura que puedan indicar un incendio.</p>
          <span class="feature-badge">Alerta 60°C</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>App Móvil</h3>
          <p>Recibe notificaciones push en tu celular estés donde estés.</p>
          <span class="feature-badge">iOS & Android</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⏰</div>
          <h3>Temporizadores</h3>
          <p>Programa alarmas para tus comidas y recibe alertas cuando estén listas.</p>
          <span class="feature-badge">Personalizable</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Análisis de Datos</h3>
          <p>Gráficas en tiempo real y análisis predictivo de riesgos.</p>
          <span class="feature-badge">IA</span>
        </div>
      </div>
    </section>

    <!-- QR Section -->
    <section class="qr-section">
      <h2>Configuración en segundos</h2>
      <p>Escanea el código QR que viene con tu dispositivo</p>
      <div class="qr-mockup">
        <div class="qr-code">
          <div class="qr-pattern"></div>
        </div>
        <div class="qr-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <strong>Escanea el QR</strong>
              <p>Usa la cámara de tu celular</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <strong>Conecta tu dispositivo</strong>
              <p>Vincula tu sensor KitchenGuard</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <strong>¡Listo!</strong>
              <p>Tu cocina está protegida</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <h2>Protege tu hogar hoy</h2>
      <p>Más de 10,000 familias ya confían en KitchenGuard</p>
      <router-link to="/login?register=true" class="btn-primary-large">Comenzar Ahora</router-link>
    </section>

    <footer class="footer">
      <p>© 2024 KitchenGuard. Todos los derechos reservados.</p>
      <div class="footer-links">
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
        <a href="#">Contacto</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Sin lógica específica, es estático
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.landing {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0A0D14;
  color: #F8FAFC;
}

/* Hero */
.hero {
  min-height: 100vh;
  background: linear-gradient(180deg, #0A0D14 0%, #111827 100%);
  position: relative;
  overflow: hidden;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-actions { display: flex; gap: 12px; align-items: center; }

.btn-outline {
  padding: 10px 20px;
  border: 1px solid #323B4E;
  border-radius: 10px;
  color: #F8FAFC;
  text-decoration: none;
  font-size: 14px;
  transition: all .2s;
}

.btn-outline:hover { border-color: #F97316; color: #F97316; }

.btn-primary {
  padding: 10px 20px;
  background: #F97316;
  border: none;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all .2s;
}

.btn-primary:hover { background: #EA580C; }

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(249,115,22,.1);
  border: 1px solid rgba(249,115,22,.3);
  border-radius: 20px;
  color: #F97316;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-text h1 {
  font-size: 52px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;
}

.gradient-text {
  background: linear-gradient(135deg, #F97316, #EF4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-text p {
  font-size: 16px;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 30px;
}

.hero-buttons { display: flex; align-items: center; gap: 16px; margin-bottom: 40px; }

.btn-primary-large {
  padding: 14px 28px;
  background: #F97316;
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  transition: all .2s;
}

.btn-primary-large:hover { background: #EA580C; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(249,115,22,.3); }

.btn-text {
  color: #94A3B8;
  text-decoration: none;
  font-size: 14px;
  transition: all .2s;
}

.btn-text:hover { color: #F8FAFC; }

.hero-stats { display: flex; gap: 40px; }

.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: #F97316;
  display: block;
}

.stat-desc { font-size: 12px; color: #475569; }

/* Phone Mockup */
.phone-mockup {
  width: 280px;
  height: 500px;
  background: #111827;
  border: 3px solid #323B4E;
  border-radius: 40px;
  padding: 15px;
  margin: 0 auto;
  box-shadow: 0 30px 60px rgba(0,0,0,.5);
}

.phone-screen {
  background: #0A0D14;
  border-radius: 28px;
  height: 100%;
  padding: 20px;
}

.mock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 13px;
}

.mock-status { color: #10B981; font-weight: 600; }

.mock-body { text-align: center; margin-top: 40px; }

.mock-gauge {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 10px;
}

.mock-temp {
  font-size: 24px;
  color: #F97316;
  margin-bottom: 20px;
}

.mock-status-text { color: #10B981; font-weight: 700; font-size: 18px; }

/* Features */
.features {
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.features h2 {
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 12px;
}

.section-sub {
  text-align: center;
  color: #94A3B8;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 20px;
  padding: 28px;
  transition: all .3s;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #F9731640;
  box-shadow: 0 12px 40px rgba(0,0,0,.3);
}

.feature-icon { font-size: 32px; margin-bottom: 16px; }

.feature-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }

.feature-card p { font-size: 14px; color: #94A3B8; line-height: 1.5; margin-bottom: 14px; }

.feature-badge {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(249,115,22,.1);
  color: #F97316;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
}

/* QR Section */
.qr-section {
  padding: 100px 40px;
  background: #111827;
}

.qr-section h2 { font-size: 36px; font-weight: 800; text-align: center; margin-bottom: 12px; }
.qr-section > p { text-align: center; color: #94A3B8; margin-bottom: 40px; }

.qr-mockup {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
}

.qr-code {
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-pattern {
  width: 150px;
  height: 150px;
  background: repeating-conic-gradient(#0A0D14 0% 25%, white 0% 50%) 50%;
  background-size: 20px 20px;
}

.qr-steps { display: flex; flex-direction: column; gap: 24px; }

.step { display: flex; align-items: flex-start; gap: 14px; }

.step-number {
  width: 36px;
  height: 36px;
  background: #F97316;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step strong { display: block; font-size: 15px; margin-bottom: 4px; }
.step p { color: #94A3B8; font-size: 13px; }

/* CTA */
.cta {
  padding: 100px 40px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta h2 { font-size: 36px; font-weight: 800; margin-bottom: 12px; }
.cta p { color: #94A3B8; margin-bottom: 30px; }

.footer {
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #262D3D;
  color: #475569;
  font-size: 13px;
}

.footer-links { display: flex; gap: 20px; }
.footer-links a { color: #94A3B8; text-decoration: none; }
.footer-links a:hover { color: #F8FAFC; }

@media (max-width: 768px) {
  .hero-content { grid-template-columns: 1fr; padding: 40px 20px; }
  .hero-text h1 { font-size: 36px; }
  .features-grid { grid-template-columns: 1fr; }
  .qr-mockup { flex-direction: column; }
  .phone-mockup { display: none; }
}
</style>