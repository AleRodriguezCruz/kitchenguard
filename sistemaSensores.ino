#include <DHT.h>

// ===== MQ-4 =====
const int mq4Pin = 34;
const int ledPin = 4;
const int umbral = 2200;

// ===== Buzzer =====
const int buzzerPin = 19;

// ===== Botón =====
const int buttonPin = 18;

// ===== DHT / ARD-360 =====
#define DHTPIN 15
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ===== Estado alarma =====
bool alarmaSilenciada = false;

void setup() {
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);

  dht.begin();

  // Precalentamiento del MQ-4
  Serial.println("Calentando sensor MQ-4...");
  for (int i = 20; i > 0; i--) {
    Serial.print("Listo en ");
    Serial.print(i);
    Serial.println("s...");
    delay(1000);
  }
  Serial.println("✅ Sensor listo");
}

void loop() {

  // ===== MQ-4 =====
  int suma = 0;
  for (int i = 0; i < 10; i++) {
    suma += analogRead(mq4Pin);
    delay(10);
  }
  int lecturaGas = suma / 10;

  // ===== DHT11 =====
  float humedad     = dht.readHumidity();
  float temperatura = dht.readTemperature();

  // ===== Mostrar datos =====
  Serial.println("-----------");
  Serial.print("Nivel de gas: ");
  Serial.println(lecturaGas);

  if (isnan(temperatura) || isnan(humedad)) {
    Serial.println("❌ Error leyendo DHT11");
  } else {
    Serial.print("Temperatura: ");
    Serial.print(temperatura);
    Serial.println(" °C");
    Serial.print("Humedad:     ");
    Serial.print(humedad);
    Serial.println(" %");
  }

  // ===== Botón silencia buzzer =====
  if (digitalRead(buttonPin) == LOW) {
    alarmaSilenciada = true;
    noTone(buzzerPin);
    Serial.println("🔕 Alarma silenciada");
    delay(300);
  }

  // ===== Alarma de gas =====
  if (lecturaGas > umbral) {
    digitalWrite(ledPin, HIGH);

    if (!alarmaSilenciada) {
      tone(buzzerPin, 3800);  // 3800 Hz = frecuencia del buzzer
    }

    Serial.println("⚠️ GAS LP DETECTADO");

  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
    alarmaSilenciada = false;  // reset al bajar el gas
  }

  delay(2000);
}
