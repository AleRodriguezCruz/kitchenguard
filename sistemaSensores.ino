#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>

// ===== WiFi =====
const char* ssid     = "NOMBRE_DE_LA_RED_WIFI";
const char* password = "AQUI_CONTRASEÑA";
const char* apiUrl = "https://kitchenguard-api.onrender.com/api/sensor";

// ===== MQ-4 =====
const int mq4Pin  = 34;
const int ledPin  = 4;
const int umbral  = 2200;

// ===== Buzzer y Botón =====
const int buzzerPin = 19;
const int buttonPin = 18;

// ===== DHT11 =====
#define DHTPIN 15
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ===== Temporización =====
unsigned long ultimaLectura = 0;
const long intervalo        = 5000;

// ===== Estado alarma =====
bool alarmaSilenciada = false;
bool gasDetectado     = false;

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

void setup() {
  Serial.begin(115200);
  pinMode(ledPin,    OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  dht.begin();

Serial.print("Conectando WiFi...");

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  
  Serial.print("Conectando a: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 40) {
    delay(500);
    Serial.print(WiFi.status());
    intentos++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi: " + WiFi.localIP().toString());
  } else {
    Serial.println("\n❌ No se pudo conectar al WiFi");
  }

  Serial.println("Calentando sensor MQ-4...");
  for (int i = 20; i > 0; i--) {
    Serial.print("Listo en "); Serial.print(i); Serial.println("s...");
    delay(1000);
  }
  Serial.println("✅ Sensor listo");
}

void loop() {

  // ===== Botón =====
  if (digitalRead(buttonPin) == LOW) {
    delay(50);
    if (digitalRead(buttonPin) == LOW && gasDetectado) {
      alarmaSilenciada = true;
      noTone(buzzerPin);
      Serial.println("🔕 Alarma silenciada");
      delay(300);
    }
  }

  unsigned long ahora = millis();
  if (ahora - ultimaLectura >= intervalo) {
    ultimaLectura = ahora;

    // ===== MQ-4 =====
    int suma = 0;
    for (int i = 0; i < 10; i++) { suma += analogRead(mq4Pin); delay(10); }
    int lecturaGas = suma / 10;
    float gasPorc  = (lecturaGas / 4095.0) * 100.0;

    // ===== DHT11 =====
    float temperatura = dht.readTemperature();

    Serial.println("-----------");
    Serial.print("Gas: "); Serial.print(gasPorc); Serial.println("%");

    if (isnan(temperatura)) {
      Serial.println("❌ Error DHT11");
    } else {
      Serial.print("Temperatura: "); Serial.print(temperatura); Serial.println(" °C");
      enviarDato("temperatura", temperatura, 0);
    }

    // ===== Alarma gas =====
    if (lecturaGas > umbral) {
      gasDetectado = true;
      digitalWrite(ledPin, HIGH);
      if (!alarmaSilenciada) tone(buzzerPin, 3800);
      Serial.println("⚠️ GAS LP DETECTADO");
      enviarDato("gas", gasPorc, 1);
    } else {
      gasDetectado     = false;
      alarmaSilenciada = false;
      digitalWrite(ledPin, LOW);
      noTone(buzzerPin);
      enviarDato("gas", gasPorc, 0);
    }
  }
}
