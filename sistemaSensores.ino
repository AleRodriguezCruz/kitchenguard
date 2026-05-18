#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <LiquidCrystal.h>
#include <time.h>

// ===== WiFi =====
const char* ssid     = "AQUI NOMBRE RED WIFI";
const char* password = "AQUI CONTRASEÑA";
const char* apiUrl   = "https://kitchenguard-api.onrender.com/api/sensor";
const char* panicUrl = "https://kitchenguard-api.onrender.com/api/panic";

// ===== NTP =====
const char* ntpServer   = "pool.ntp.org";
const long  gmtOffset   = -25200;  // UTC-7 Ensenada (PDT)
const int   daylightOffset = 0;

// ===== MQ-4 =====
const int mq4Pin  = 34;
const int ledPin  = 4;
//const int umbral  = 2600;  // valor reposo promedio 2344
const int MQ4_REPOSO = 2344;
const int MQ4_MAX    = 4095; // 0 a 4095 (2¹² = 4096 valores posibles)

// ===== Buzzer y Botón =====
const int buzzerPin = 19;
const int buttonPin = 18;

bool alertaCerradaRemoto = false;
unsigned long ultimaConsultaRemoto = 0;
const long intervaloConsultaRemoto = 5000; // cada 5s

// ===== DHT11 =====
#define DHTPIN 15
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ===== LCD =====
LiquidCrystal lcd(23, 22, 21, 17, 16, 13);

// ===== Temporización =====
unsigned long ultimaLectura  = 0;
unsigned long ultimaHora     = 0;
const long intervalo         = 5000;
const long intervaloHora     = 1000;
// ─── Variables para botón 
unsigned long ultimoPresionado = 0;
const long debounceDelay = 300;  // 300ms entre presiones

// ===== Estado alarma =====
bool alarmaSilenciada = false;
bool gasDetectado     = false;

// ===== Obtener hora como string =====
String obtenerHora() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) return "--:--:--";
  char buf[10];
  strftime(buf, sizeof(buf), "%H:%M:%S", &timeinfo);
  return String(buf);
}

void enviarDato(String tipo, float valor, int alerta) {
  if (WiFi.status() != WL_CONNECTED) return;
  HTTPClient http;
  http.begin(apiUrl);
  http.addHeader("Content-Type", "application/json");
  String body = "{\"type\":\"" + tipo + "\",\"value\":" + String(valor, 2) + ",\"alert\":" + String(alerta) + "}";
  int code = http.POST(body);
  Serial.print("POST " + tipo + " → "); Serial.println(code);
  http.end();
}

void enviarEmergencia() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ Sin WiFi para emergencia");
    return;
  }
  HTTPClient http;
  http.begin(panicUrl);
  http.addHeader("Content-Type", "application/json");
  int code = http.POST("{}");
  Serial.print("🆘 POST emergencia → "); Serial.println(code);
  http.end();
}

// enivar datos en tiempo real
void enviarLive(String tipo, float valor) {
  if (WiFi.status() != WL_CONNECTED) return;
  HTTPClient http;
  http.begin("https://kitchenguard-api.onrender.com/api/sensor/live");
  http.addHeader("Content-Type", "application/json");
  String body = "{\"type\":\"" + tipo + "\",\"value\":" + String(valor, 2) + "}";
  int code = http.POST(body);
  Serial.print("LIVE " + tipo + " → "); Serial.println(code);
  http.end();
}

// Consultar con el BackEnd
void consultarAlertaRemota() {
  if (WiFi.status() != WL_CONNECTED) return;
  HTTPClient http;
  http.begin("https://kitchenguard-api.onrender.com/api/alertas/activa/gas");
  int code = http.GET();
  if (code == 200) {
    String body = http.getString();
    body.trim(); // ← elimina espacios y saltos de línea
    Serial.print("🔍 Body: '"); Serial.print(body); Serial.println("'");
    alertaCerradaRemoto = (body == "false" || body == "null");
    Serial.print("🔍 alertaCerradaRemoto: "); Serial.println(alertaCerradaRemoto);
  }
  http.end();
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin,    OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  dht.begin();

  // ===== LCD =====
  lcd.begin(16, 2);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("KitchenGuard");
  lcd.setCursor(0, 1);
  lcd.print("Iniciando...");

  // ===== WiFi =====
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  Serial.print("Conectando a: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Conectando WiFi");

  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 40) {
    delay(500);
    Serial.print(WiFi.status());
    intentos++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi: " + WiFi.localIP().toString());
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi OK");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP().toString());
    delay(2000);

    // ===== NTP =====
    configTime(gmtOffset, daylightOffset, ntpServer);
    Serial.println("⏰ Hora sincronizada");
  } else {
    Serial.println("\n❌ No se pudo conectar al WiFi");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Error");
    delay(2000);
  }

  // ===== Precalentamiento =====
  Serial.println("Calentando sensor MQ-4...");
  for (int i = 20; i > 0; i--) {
    Serial.print("Listo en "); Serial.print(i); Serial.println("s...");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Calentando MQ-4");
    lcd.setCursor(0, 1);
    lcd.print("Listo en: "); lcd.print(i); lcd.print("s");
    delay(1000);
  }
  Serial.println("✅ Sensor listo");
  lcd.clear();
}

void loop() {
  unsigned long ahora = millis();

  // ===== Botón: silencia buzzer + envía emergencia =====
  if (digitalRead(buttonPin) == LOW) {
    if (ahora - ultimoPresionado > debounceDelay) {
      ultimoPresionado = ahora;

      if (gasDetectado) {
        alarmaSilenciada = true;
        noTone(buzzerPin);
        Serial.println("🔕 Buzzer silenciado");
      }

      Serial.println("🆘 Enviando emergencia...");
      enviarEmergencia();

      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("  SOS ENVIADO!  ");
      lcd.setCursor(0, 1);
      lcd.print("  SOS NOTIFICADO!  ");
      delay(3000);
      lcd.clear();
    }
  }

  // ===== Actualizar hora en LCD cada segundo =====
  if (ahora - ultimaHora >= intervaloHora) {
    ultimaHora = ahora;
    if (!gasDetectado) {
      lcd.setCursor(0, 0);
      lcd.print("Hora: " + obtenerHora() + "  ");
    }
  }

  // ===== Consulta remota cada 5s =====
  if (ahora - ultimaConsultaRemoto >= intervaloConsultaRemoto) {
    ultimaConsultaRemoto = ahora;
    consultarAlertaRemota();
  }

  // ===== Lectura sensores cada 5 segundos =====
  if (ahora - ultimaLectura >= intervalo) {
    ultimaLectura = ahora;

    // MQ-4
    int suma = 0;
    for (int i = 0; i < 10; i++) { suma += analogRead(mq4Pin); delay(10); }
    int lecturaGas = suma / 10;
    float gasPorc = ((float)(lecturaGas - MQ4_REPOSO) / (MQ4_MAX - MQ4_REPOSO)) * 100.0f;
    if (gasPorc < 0) gasPorc = 0;

    // DHT11
    float temperatura = dht.readTemperature();


    // Siempre enviar live sin importar el modo
    enviarLive("gas", gasPorc);
    if (!isnan(temperatura)) enviarLive("temperatura", temperatura);


    Serial.println("-----------");
    Serial.print("Gas: "); Serial.print(gasPorc); Serial.println("%");
    //ver umbral que esta dando
    Serial.print("Gas RAW: "); Serial.println(lecturaGas);
 

    if (isnan(temperatura)) {
      Serial.println("❌ Error DHT11");
    } else {
      Serial.print("Temperatura: "); Serial.print(temperatura); Serial.println(" °C");
      enviarDato("temperatura", temperatura, 0);
    }

    // ===== Alarma gas =====
    if (gasPorc >= 40.0) {  //PORCENTAJE DE UMBRAL
      gasDetectado = true;
      digitalWrite(ledPin, HIGH);

      if (!alarmaSilenciada && !alertaCerradaRemoto){
        tone(buzzerPin, 3800);
      }else{
        noTone(buzzerPin); //apagar remoto
      }
      
      Serial.println("⚠️ GAS LP DETECTADO");
      enviarDato("gas", gasPorc, 1);

      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("! GAS DETECTADO!");
      lcd.setCursor(0, 1);
      lcd.print("Gas:");
      lcd.print(gasPorc, 1);
      lcd.print("% T:");
      lcd.print(temperatura, 0);
      lcd.print("C");

    } else {
      gasDetectado     = false;
      alarmaSilenciada = false;
      alertaCerradaRemoto = false; // ← reset al normalizarse el gas
      digitalWrite(ledPin, LOW);
      noTone(buzzerPin);
      enviarDato("gas", gasPorc, 0);

      lcd.setCursor(0, 1);
      lcd.print("T:");
      lcd.print(temperatura, 1);
      lcd.print("C Gas:");
      lcd.print(gasPorc, 1);
      lcd.print("%  ");
    }
  }
}
