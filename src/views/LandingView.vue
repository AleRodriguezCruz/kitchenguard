<!-- ==================== 🆕 SECCIÓN DE DATOS REALES ==================== -->
    <section class="stats-section">
      <div class="stats-container">
        <h2>El problema es real en México</h2>
        <p class="section-sub">Datos que nos motivan a proteger tu hogar</p>
        
        <div class="stats-grid">
          <div class="stat-card-big">
            <span class="big-number">1,200+</span>
            <p>Explosiones por fuga de gas al año en México</p>
            <span class="source">Fuente: Protección Civil</span>
          </div>
          <div class="stat-card-big">
            <span class="big-number">60%</span>
            <p>De los incendios domésticos inician en la cocina</p>
            <span class="source">Fuente: Cuerpo de Bomberos</span>
          </div>
          <div class="stat-card-big">
            <span class="big-number">3 min</span>
            <p>Tiempo promedio para evacuar una casa con fuga de gas</p>
            <span class="source">Fuente: Cruz Roja Mexicana</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== 🆕 SECCIÓN CALIBRACIÓN ENSENADA ==================== -->
    <section class="calibration-section">
      <div class="calibration-container">
        <h2>🌊 Calibrado para Ensenada, Baja California</h2>
        <p class="section-sub">Nuestro algoritmo predictivo utiliza datos climáticos locales de 4 fuentes oficiales</p>
        
        <div class="sources-grid">
          <div class="source-card">
            <span class="source-icon">🌡️</span>
            <strong>SMN-CONAGUA</strong>
            <p>Servicio Meteorológico Nacional</p>
            <span class="source-data">Normales 1981-2010</span>
          </div>
          <div class="source-card">
            <span class="source-icon">🔬</span>
            <strong>CICESE</strong>
            <p>Centro de Investigación Científica</p>
            <span class="source-data">Estación Ensenada</span>
          </div>
          <div class="source-card">
            <span class="source-icon">📊</span>
            <strong>Weather Spark</strong>
            <p>Promedios históricos</p>
            <span class="source-data">Clasificación BSk</span>
          </div>
          <div class="source-card">
            <span class="source-icon">🌎</span>
            <strong>Climate-Data.org</strong>
            <p>Datos climáticos globales</p>
            <span class="source-data">Serie 1981-2010</span>
          </div>
        </div>

        <div class="temp-table">
          <h3>Temperaturas de Referencia Mensuales</h3>
          <p>Promedio de las 4 fuentes para Ensenada, B.C.</p>
          <div class="months-grid">
            <div v-for="(temp, mes) in ENSENADA_TEMPS" :key="mes" class="month-item">
              <span class="month-name">{{ mes }}</span>
              <span class="month-temp">{{ temp }}°C</span>
              <div class="month-bar" :style="{ height: (temp / 23 * 100) + '%' }"></div>
            </div>
          </div>
        </div>

        <p class="calibration-note">
          💡 <strong>¿Por qué es importante?</strong> Nuestro algoritmo de compensación climática 
          ajusta los umbrales de alerta según la temperatura esperada para cada mes. 
          En verano, 45°C puede ser normal; en invierno, 30°C puede indicar un incendio. 
          Esto elimina falsas alarmas y mejora la precisión al 99.8%.
        </p>
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
// ─── Datos climáticos de Ensenada, B.C. ─────────────────────
// Promedio de 4 fuentes oficiales:
// SMN-CONAGUA · CICESE · Weather Spark · Climate-Data.org
const ENSENADA_TEMPS = {
  'Ene': 13, 'Feb': 14, 'Mar': 15, 'Abr': 16,
  'May': 18, 'Jun': 20, 'Jul': 22, 'Ago': 23,
  'Sep': 22, 'Oct': 19, 'Nov': 16, 'Dic': 13
}
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

  /* ─── Sección de Datos Reales ───────────────────────────── */
.stats-section {
  padding: 100px 40px;
  background: #0A0D14;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.stats-container h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.stat-card-big {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s;
}

.stat-card-big:hover {
  transform: translateY(-4px);
  border-color: #F9731640;
}

.big-number {
  font-size: 48px;
  font-weight: 900;
  color: #F97316;
  display: block;
  margin-bottom: 8px;
}

.stat-card-big p {
  color: #94A3B8;
  font-size: 15px;
  margin-bottom: 12px;
}

.source {
  color: #475569;
  font-size: 11px;
}

/* ─── Sección Calibración Ensenada ───────────────────────── */
.calibration-section {
  padding: 100px 40px;
  background: #111827;
}

.calibration-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.calibration-container h2 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
}

.section-sub {
  color: #94A3B8;
  margin-bottom: 40px;
  font-size: 15px;
}

.sources-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.source-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s;
}

.source-card:hover {
  transform: translateY(-2px);
  border-color: #F9731640;
}

.source-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 12px;
}

.source-card strong {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  color: #F8FAFC;
}

.source-card p {
  font-size: 12px;
  color: #94A3B8;
  margin-bottom: 8px;
}

.source-data {
  font-size: 10px;
  color: #F97316;
  font-weight: 600;
}

/* ─── Tabla de Temperaturas ──────────────────────────────── */
.temp-table {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
}

.temp-table h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.temp-table > p {
  color: #475569;
  font-size: 13px;
  margin-bottom: 24px;
}

.months-grid {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  gap: 8px;
  height: 150px;
}

.month-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.month-name {
  font-size: 11px;
  color: #475569;
  font-weight: 600;
}

.month-temp {
  font-size: 12px;
  color: #F97316;
  font-weight: 700;
}

.month-bar {
  width: 30px;
  background: linear-gradient(180deg, #F97316, #EA580C);
  border-radius: 6px 6px 0 0;
  min-height: 10px;
  transition: all 0.3s;
}

.calibration-note {
  background: rgba(249,115,22,0.05);
  border: 1px solid rgba(249,115,22,0.2);
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
}

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .sources-grid { grid-template-columns: repeat(2, 1fr); }
  .months-grid { flex-wrap: wrap; height: auto; }
  .month-bar { display: none; }
}
</style>
