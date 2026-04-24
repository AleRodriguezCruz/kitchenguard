# 🍎 kitchenguard

## 📋 Tabla de Contenidos

> **Sistema Inteligente de Seguridad y Temporización para el Hogar** 

> Proyecto de Innovación — Servidores Web en Linux
> - Tecnológico Nacional de México - Instituto Tecnológico de Ensenada

- [📌 Descripción General](#-descripción-general)
- [✨ Características](#-características)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [⚙️ Componentes de Hardware](#️-componentes-de-hardware)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📖 Uso](#-uso)
- [🔌 API / Comunicación](#-api--comunicación)
- [📱 Aplicación Móvil](#-aplicación-móvil)
- [🌐 Aplicación Web](#-aplicación-web)
- [🤝 Contribución](#-contribución)
- [👥 Equipo](#-equipo)
- [📄 Licencia](#-licencia)

## 📌 Descripción General

**KitchenGuard** es un sistema domotico inteligente diseñado para mejorar la seguridad en el hogar, especialmente en la cocina.

Integra un sensor fisico, procesamiento en servidor Linux y aplicaciones cliente (web y móvil) para detectar riesgos de fuga de gas LP, altas temperaturas o emergencias (botón de pánico), enviando alertas en tiempo real al usuario.

## ✨ Características

### 🕐 Reloj
- Hora en tiempo real.

### ⏱️ Cronómetro
- Multiples temporizadores configurables.
- Notificación al finalizar.

### 🔥 Alarma de Incendio
- Detección mediante sensor MQ-4.
- Alerta en tiempo real.

### 🚨 Botón de Pánico
- Activado manual de alerta.
- Noficación de alerta.

### 🌐 Monitoreo Remoto
- Acceso desde aplicación Web.
- Acceso desde app móvil.

## 🏗️ Arquitectura del Sistema
1. **IoT - ESP32 (Local):** Lectura de sensores, es decir, recolección y envío de datos al servidor.
2. **Servidor (Raspberry Pi / Linux):** Gestión de la BD, API REST, procesamiento de datos, mediante el Servidor.
3. **Client (UI):** Aplicación web (vue.js) y aplicación movil (React Native), consumen los datos en tiempo real.

## ⚙️ Componentes de Hardware

- Raspberry Pi 3B + pantalla.
- ESP32.
- Sensor de gas MQ-4.
- Sensor de temperatura. (pendiente id)
- Dos Botónes.
- Un LED.
- Cables y protoboard.

## 🛠️ Tecnologías Utilizadas

### Hardware / Firmware
- ESP32 (C++/ARDUINO).
### Backend / API
- Sistema operativo Ubuntu Server.
- Python.
- Flask.
- SQLite.
### Aplicación Web
- Javascript (+ Vue.js, Composition API).
- HTML.
- CSS.
### Aplicación Móvil
- React Native.
- Entorno de de desarrollo Expo.

## 📁 Estructura del Proyecto

(Aun pueden haber modificaciones en esta parte)

```text
KitchenGuard/
│
├── backend/           # API, lógica del servidor y servicios
├── frontend-web/      # Aplicación web 
├── frontend-mobile/   # Aplicación móvil 
├── iot/               # Código para dispositivos 
├── database/          # Scripts, esquemas y migraciones de base de datos
├── docs/              # Documentación del proyecto
└── README.md          # Documentación principal
```
## 🚀 Instalación y Configuración

### Pre-requisitos
- Servidor Linux (Ubuntu 20.04+).
- Python 3.12+.
- Node.js.
- Expo Go.
- Arduino IDE para el ESP32.
- Raspberry Pi 3B.

### Clonar el repositorio

```bash
git clone https://github.com/AleRodriguezCruz/kitchenguard.git
cd kitchenguard
```

### Configuración del Backend
1.- Crear entorno virtual: 
```bash 
    python -m venv venv.
```
2.- Instalar dependencias:
```bash 
    pip install -r requirements.txt
```
3.- Iniciar servidor:
```bash 
    python app.py
```

### Configuración Web
1.- Entrar a la carpeta: 
``` bash 
    cd frontend-web 
```
2.- Instalar dependencias: 
``` bash
    npm install 
```
3.- Inicializar: 
```bash  
    npm run dev 
```

### Configuración Móvil
1.-Entrar a la carpeta: 
``` bash 
    cd frontend-mobile 
```
2.- Instalar dependencias: 
``` bash
    npm install 
```
3.- Inicializar: 
```bash 
    npx expo start 
``` 
#Escanear QR con la app Expo Go.

## 📖 Uso
#### 1.- Encender el sistema (Raspberry Pi + ESP32).
#### 2.- Abrir aplicación web o móvil.
#### 3.- Monitorear sensores en tiempo real.
#### 4.- Configurar temporizadores.
#### 5.- Presión de botón de pánico en caso necesario.
#### 6.- Recibir alertas en caso de riesgo.

## 🔌 API / Comunicación

(en actualización)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/sensors/status` | Estado actual de temperatura y gas |
| `POST` | `/sensors/data` | Recibir datos del ESP32/Raspberry |
| `GET` | `/timers` | Listar todos los temporizadores activos |
| `POST` | `/timers` | Crear nuevo temporizador |
| `DELETE` | `/timers/:id` | Eliminar temporizador |
| `GET` | `/events` | Historial de eventos y alertas |
| `POST` | `/alerts/panic` | Disparar alerta de pánico |
| `GET` | `/clock` | Hora actual del servidor (NTP) |

## 📱 Aplicación Móvil

Claude terminó la respuesta
Dijiste: tengo este proyecto
tengo este proyecto

TECNOLÓGICO NACIONAL DE MÉXICO INSTITUTO TECNOLÓGICO DE ENSENADA 
INGENIERÍA EN SISTEMAS COMPUTACIONALES

🍎  KitchenGuard
Sistema Inteligente de Seguridad y Temporización para el Hogar
Proyecto de Innovación — Servidores Web en Linux
“
ELABORADA POR: 
MAYON CISNEROS FLOR JAZMIN 22760045
RODRÍGUEZ DE LA CRUZ ALEJANDRA 22760049
SEMESTRE:
“9SS”
Desarrollo Backend II

ENSENADA, B.C. A 23 DE FEBRERO DE 2026
Objetivo General del Proyecto
Desarrollar e implementar un sistema domótico inteligente denominado KitchenGuard, ejecutado sobre un servidor web en Linux (Raspberry Pi 3B) como nodo IoT local, que integre temporización múltiple de cocina, sensor de temperatura ambiente, detección de gas mediante sensor MQ-2 y un botón de pánico físico controlado por un microcontrolador ESP32, complementado con un servidor Linux externo encargado de la gestión centralizada, almacenamiento y procesamiento de datos, con la finalidad de mejorar la seguridad del hogar y reducir accidentes derivados de la distracción en actividades culinarias, mediante notificaciones en tiempo real al celular del usuario a través de una aplicación móvil desarrollada en React Native.
Justificación del Proyecto
Importancia del proyecto para el hogar y la sociedad
En los hogares mexicanos, la cocina representa uno de los espacios con mayor incidencia de accidentes domésticos: alimentos quemados, fugas de gas no detectadas y olvidos al salir de casa son situaciones cotidianas que pueden derivar en daños materiales graves o incluso riesgos para la vida. KitchenGuard atiende directamente esta problemática al proporcionar una solución tecnológica accesible, desarrollada con hardware libre y software de código abierto, que puede ser replicada por cualquier familia con un presupuesto mínimo.
El problema que aborda este proyecto radica en que los usuarios dependen principalmente de alarmas sonoras locales, las cuales resultan ineficientes cuando se encuentran en otra habitación, realizando actividades ruidosas o fuera del hogar. Además, no existe un mecanismo automatizado que detecte si la estufa quedó encendida al salir, generando riesgo de incendio y fugas de gas, especialmente para niños y adultos mayores.
El sistema KitchenGuard integra temporizadores múltiples gestionados desde la app móvil, detección de gas mediante sensor MQ-2, monitoreo de temperatura ambiente y botón de pánico físico, historial de eventos en base de datos SQLite, y notificaciones en tiempo real al celular accesibles desde cualquier lugar mientras estés conectado a internet.
Tabla 1. Hardware utilizado
—-----------------------------------------------------------------
Componente
Costo
Raspberry Pi 3B + pantalla, ESP32
Disponible
Sensor MQ-2, botón, cables
~$160 MXN
Filamento PLA rojo (~180g)
$100 MXN
Servidor “Ubuntu Server”
Disponible
Total extra
~$260 MXN
Beneficios para los participantes: Los adultos mayores y niños se benefician del botón de pánico y alertas automáticas sin interactuar con dispositivos digitales. Los adultos jóvenes monitorean 2 variables del hogar  (temperatura y gas LP)  desde cualquier lugar. Por último, nosotros como estudiantes desarrollamos un proyecto que integra servidores Linux, IoT, APIs REST y desarrollo móvil.
Viabilidad: El hardware principal ya está disponible. Todo el software es de código abierto (Linux, Flask, React Native, SQLite) y la carcasa se imprimirá en la impresora 3D. 
Consecuencias de no implementarlo: El hogar continuará dependiendo de alarmas locales insuficientes o en la mayoría de los casos ninguna, con mayor riesgo de accidentes domésticos, desperdicio de alimentos y hardware disponible sin aprovechar.

Mostrar más
9:15 a.m.
Claude respondió: ¡Qué buen proyecto!
¡Qué buen proyecto! KitchenGuard tiene una propuesta muy sólida y práctica. ¿En qué te puedo ayudar?

Dijiste: P: ¿Qué necesitas para tu proyecto?
P: ¿Qué necesitas para tu proyecto?
R: pero tambien vamos a hacer una web solo que no lo e añadido, ayuda para crear el readme   # 🍎 kitchenguard  ## 📋 Tabla de Contenidos  ## 📌 Descripción General  ## ✨ Características  ### 🕐 Reloj  ### ⏱️ Cronómetro  ### 🔥 Alarma de Incendio  ## 🏗️ Arquitectura del Sistema  ## ⚙️ Componentes de Hardware  ## 🛠️ Tecnologías Utilizadas  ### Hardware / Firmware  ### Backend / API  ### Aplicación Web  ### Aplicación Móvil  ## 📁 Estructura del Proyecto  ## 🚀 Instalación y Configuración  ### Pre-requisitos  ### Clonar el repositorio  ### Configuración del Hardware  ### Configuración del Backend  ### Configuración Web  ### Configuración Móvil  ## 📖 Uso  ## 🔌 API / Comunicación  ## 📱 Aplicación Móvil  ## 🌐 Aplicación Web  ## 🤝 Contribución  ## 👥 Equipo  ## 📄 Licencia

9:16 a.m.
Claude respondió: ¡Perfecto!
¡Perfecto! Voy a crear un README completo y profesional para KitchenGuard con toda la estructura que me diste, incluyendo la app web.


Creó un archivo, archivo leído
Creó un archivo, archivo leído
Aquí está tu README completo 🎉 Lo que incluye:

Tabla de contenidos con anclas funcionales para GitHub
Diagrama ASCII de la arquitectura completa (ESP32 → Raspberry → Servidor → App/Web)
Tabla de hardware con costos
Tabla de endpoints de la API con ejemplos JSON
Estructura de carpetas que ya contempla el módulo web/ con React
Pasos de instalación para cada capa del sistema
Sección dedicada a la app web con todas sus funcionalidades
Badges y formato visual limpio para GitHub
Puedes personalizar las partes en placeholder como la URL del repositorio (tu-usuario/kitchenguard), los pines exactos del ESP32, y las tecnologías específicas que elijan para las notificaciones push. ¿Quieres ajustar algo?


Readme
Documento · MD 

¿Quieres recibir una notificación cuando Claude responda?
la aplicacion 

Claude es IA y puede cometer errores. Por favor, verifica nuevamente las respuestas.
Readme · MD
Copiar

# 🍎 KitchenGuard
> **Sistema Inteligente de Seguridad y Temporización para el Hogar**  
> Proyecto de Innovación — Servidores Web en Linux  
> Tecnológico Nacional de México · Instituto Tecnológico de Ensenada
 
---
 
## 📋 Tabla de Contenidos
 
- [📌 Descripción General](#-descripción-general)
- [✨ Características](#-características)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [⚙️ Componentes de Hardware](#️-componentes-de-hardware)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📖 Uso](#-uso)
- [🔌 API / Comunicación](#-api--comunicación)
- [📱 Aplicación Móvil](#-aplicación-móvil)
- [🌐 Aplicación Web](#-aplicación-web)
- [🤝 Contribución](#-contribución)
- [👥 Equipo](#-equipo)
- [📄 Licencia](#-licencia)
---
 
## 📌 Descripción General
 
**KitchenGuard** es un sistema domótico inteligente diseñado para mejorar la seguridad en el hogar, especialmente en la cocina. Ejecutado sobre un servidor local en **Raspberry Pi 3B** como nodo IoT, integra múltiples funcionalidades de monitoreo y temporización controladas por un microcontrolador **ESP32**, con notificaciones en tiempo real accesibles desde cualquier lugar.
 
El sistema detecta fugas de gas, monitorea temperatura ambiente, gestiona temporizadores de cocina y responde a situaciones de emergencia mediante un botón de pánico físico — todo sincronizado con una aplicación móvil (React Native) y una aplicación web.
 
> 💡 **¿Por qué KitchenGuard?**  
> En los hogares mexicanos, la cocina es uno de los espacios con mayor incidencia de accidentes domésticos. Alimentos quemados, fugas de gas no detectadas y olvidos al salir de casa pueden derivar en daños graves. KitchenGuard ofrece una solución accesible, construida con hardware libre y software de código abierto, replicable con un presupuesto mínimo (~$260 MXN en componentes adicionales).
 
---
 
## ✨ Características
 
### 🕐 Reloj
- Visualización de hora en tiempo real sincronizada con el servidor
- Disponible en la interfaz web y en la app móvil
- Sincronización NTP para precisión horaria
### ⏱️ Cronómetro / Temporizadores
- Gestión de **múltiples temporizadores simultáneos** desde la app móvil o la web
- Notificaciones push al celular cuando un temporizador finaliza
- Historial de temporizadores guardado en base de datos SQLite
- Ideal para controlar varios tiempos de cocción al mismo tiempo
### 🔥 Alarma de Incendio / Seguridad
- **Detección de gas LP** mediante sensor MQ-2 con umbral configurable
- **Monitoreo de temperatura ambiente** en tiempo real
- **Botón de pánico físico** en el dispositivo para alertas de emergencia inmediatas
- Notificaciones push en tiempo real al celular del usuario desde cualquier lugar
- Registro de todos los eventos de alerta en base de datos para historial y auditoría
---
 
## 🏗️ Arquitectura del Sistema
 
```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO FINAL                            │
│              📱 App Móvil        🌐 App Web                     │
│           (React Native)      (React / HTML)                    │
└──────────────────┬──────────────────────┬───────────────────────┘
                   │  HTTPS / WebSocket   │
┌──────────────────▼──────────────────────▼───────────────────────┐
│               SERVIDOR LINUX EXTERNO (Ubuntu Server)            │
│         API REST (Flask) · Base de Datos SQLite                 │
│              Gestión centralizada y notificaciones              │
└──────────────────────────────┬──────────────────────────────────┘
                               │ HTTP local / MQTT
┌──────────────────────────────▼──────────────────────────────────┐
│                   RASPBERRY PI 3B (Nodo IoT Local)              │
│              Flask local · Pantalla · Lógica de control         │
└──────────────────────────────┬──────────────────────────────────┘
                               │ Serial / Wi-Fi
┌──────────────────────────────▼──────────────────────────────────┐
│                         ESP32 (Firmware)                        │
│   Sensor MQ-2 · Sensor Temp · Botón de Pánico · GPIO           │
└─────────────────────────────────────────────────────────────────┘
```
 
El flujo de datos va del **ESP32** (sensores físicos) → **Raspberry Pi** (nodo local) → **Servidor externo** (almacenamiento y lógica) → **App móvil / Web** (interfaz de usuario).
 
---
 
## ⚙️ Componentes de Hardware
 
| Componente | Función | Costo |
|---|---|---|
| Raspberry Pi 3B + pantalla | Servidor IoT local, interfaz visual | Disponible |
| ESP32 | Microcontrolador, lectura de sensores y GPIO | Disponible |
| Sensor MQ-2 | Detección de gas LP y humo | ~$160 MXN |
| Sensor de temperatura | Monitoreo de temperatura ambiente | Incluido |
| Botón de pánico físico | Alerta de emergencia manual | Incluido |
| Cables y protoboard | Conexiones de hardware | Incluido |
| Carcasa PLA roja (~180g) | Protección impresa en 3D | ~$100 MXN |
| Ubuntu Server | Servidor externo de gestión | Disponible |
| **Total extra** | | **~$260 MXN** |
 
---
 
## 🛠️ Tecnologías Utilizadas
 
### Hardware / Firmware
- **ESP32** — Microcontrolador principal para lectura de sensores
- **MicroPython / Arduino IDE** — Programación del firmware ESP32
- **Sensor MQ-2** — Detección de gas LP y humo
- **Raspberry Pi OS (Raspbian)** — Sistema operativo del nodo local
### Backend / API
- **Python 3** + **Flask** — API REST para comunicación entre componentes
- **SQLite** — Base de datos local para historial de eventos y temporizadores
- **Ubuntu Server** — Servidor Linux externo para gestión centralizada
- **WebSockets** — Comunicación en tiempo real
- **Firebase Cloud Messaging (FCM)** — Notificaciones push al celular
### Aplicación Web
- **React** — Interfaz web de monitoreo y control
- **Vite** — Herramienta de bundling y desarrollo rápido
- **TailwindCSS** — Estilos y diseño responsivo
- **Axios** — Comunicación HTTP con la API REST
- **Socket.IO Client** — Actualizaciones en tiempo real
### Aplicación Móvil
- **React Native** — App móvil multiplataforma (Android / iOS)
- **Expo** — Entorno de desarrollo y build
- **React Navigation** — Navegación entre pantallas
- **Expo Notifications** — Recepción de notificaciones push
---
 
## 📁 Estructura del Proyecto
 
```
kitchenguard/
│
├── firmware/                   # Código para el ESP32
│   ├── main.py                 # Lógica principal del microcontrolador
│   ├── sensors.py              # Lectura de MQ-2 y temperatura
│   ├── wifi_manager.py         # Conexión Wi-Fi
│   └── config.py               # Configuración de pines y umbrales
│
├── raspberry/                  # Servidor local en Raspberry Pi 3B
│   ├── app.py                  # Flask local (nodo IoT)
│   ├── display.py              # Control de pantalla
│   ├── requirements.txt
│   └── config.py
│
├── backend/                    # Servidor externo Ubuntu
│   ├── app.py                  # API REST principal (Flask)
│   ├── models/
│   │   ├── timer.py            # Modelo de temporizadores
│   │   └── event.py            # Modelo de eventos y alertas
│   ├── routes/
│   │   ├── timers.py           # Endpoints de temporizadores
│   │   ├── sensors.py          # Endpoints de datos de sensores
│   │   └── alerts.py           # Endpoints de alertas
│   ├── database.db             # Base de datos SQLite
│   ├── requirements.txt
│   └── config.py
│
├── web/                        # Aplicación web (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Clock.jsx       # Componente reloj
│   │   │   ├── TimerCard.jsx   # Tarjeta de temporizador
│   │   │   ├── SensorPanel.jsx # Panel de sensores
│   │   │   └── AlertBanner.jsx # Banner de alertas
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Panel principal
│   │   │   ├── Timers.jsx      # Gestión de temporizadores
│   │   │   └── History.jsx     # Historial de eventos
│   │   ├── services/
│   │   │   └── api.js          # Llamadas a la API
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── mobile/                     # Aplicación móvil (React Native)
│   ├── src/
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── TimersScreen.js
│   │   │   └── HistoryScreen.js
│   │   ├── components/
│   │   └── services/
│   │       └── api.js
│   ├── app.json
│   └── package.json
│
└── README.md
```
 
---
 
## 🚀 Instalación y Configuración
 
### Pre-requisitos
 
- Python 3.9+
- Node.js 18+ y npm
- Expo CLI (`npm install -g expo-cli`)
- Arduino IDE o MicroPython para el ESP32
- Raspberry Pi 3B con Raspbian OS
- Servidor Ubuntu con IP pública (o ngrok para desarrollo)
### Clonar el repositorio
 
```bash
git clone https://github.com/tu-usuario/kitchenguard.git
cd kitchenguard
```
 
### Configuración del Hardware
 
1. Conectar el **sensor MQ-2** al pin analógico del ESP32 (ej. GPIO34)
2. Conectar el **sensor de temperatura** al pin digital (ej. GPIO4)
3. Conectar el **botón de pánico** al pin GPIO con resistencia pull-up (ej. GPIO0)
4. Cargar el firmware al ESP32:
```bash
cd firmware/
# Con Arduino IDE: abrir main.ino y seleccionar placa ESP32
# Con MicroPython: usar ampy o Thonny
ampy --port /dev/ttyUSB0 put main.py
ampy --port /dev/ttyUSB0 put sensors.py
```
 
5. Editar `firmware/config.py` con tu red Wi-Fi y la IP del servidor:
```python
WIFI_SSID = "tu_red_wifi"
WIFI_PASSWORD = "tu_contraseña"
SERVER_URL = "http://IP_RASPBERRY:5000"
```
 
### Configuración del Backend
 
```bash
cd backend/
python -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate         # Windows
 
pip install -r requirements.txt
 
# Inicializar la base de datos
python -c "from app import db; db.create_all()"
 
# Iniciar el servidor
python app.py
```
 
El backend estará disponible en `http://0.0.0.0:5000`
 
### Configuración Web
 
```bash
cd web/
npm install
 
# Crear archivo de variables de entorno
cp .env.example .env
# Editar .env con la URL de tu API:
# VITE_API_URL=http://IP_SERVIDOR:5000
 
npm run dev       # Desarrollo
npm run build     # Producción
```
 
### Configuración Móvil
 
```bash
cd mobile/
npm install
 
# Editar src/services/api.js con la URL de tu servidor
# const BASE_URL = 'http://IP_SERVIDOR:5000';
 
npx expo start    # Escanear QR con la app Expo Go
# o
npx expo run:android
```
 
---
 
## 📖 Uso
 
1. **Enciende el dispositivo** — El ESP32 se conecta automáticamente a la red Wi-Fi y comienza a enviar datos a la Raspberry Pi.
2. **Abre la app móvil o la web** — Verás el panel principal con temperatura, nivel de gas y la hora en tiempo real.
3. **Crea un temporizador** — Escribe el nombre del platillo y el tiempo. Recibirás una notificación push cuando termine, estés donde estés.
4. **Monitoreo pasivo** — El sistema detecta niveles peligrosos de gas o temperatura y envía alertas automáticas sin intervención del usuario.
5. **Botón de pánico** — Presionar el botón físico en el dispositivo envía una alerta de emergencia inmediata a todos los dispositivos registrados.
6. **Historial** — Consulta el registro completo de eventos, alertas y temporizadores desde la sección de historial.
---
 
## 🔌 API / Comunicación
 
Base URL: `http://IP_SERVIDOR:5000/api`
 
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/sensors/status` | Estado actual de temperatura y gas |
| `POST` | `/sensors/data` | Recibir datos del ESP32/Raspberry |
| `GET` | `/timers` | Listar todos los temporizadores activos |
| `POST` | `/timers` | Crear nuevo temporizador |
| `DELETE` | `/timers/:id` | Eliminar temporizador |
| `GET` | `/events` | Historial de eventos y alertas |
| `POST` | `/alerts/panic` | Disparar alerta de pánico |
| `GET` | `/clock` | Hora actual del servidor (NTP) |
 
**Ejemplo — Crear temporizador:**
```json
POST /api/timers
{
  "name": "Arroz",
  "duration_seconds": 1200
}
```
 
**Ejemplo — Datos de sensores:**
```json
GET /api/sensors/status
{
  "temperature": 24.5,
  "gas_level": 312,
  "gas_alert": false,
  "timestamp": "2026-02-23T18:45:00"
}
```
 
---
 
## 📱 Aplicación Móvil
 
La app móvil desarrollada en **React Native + Expo** ofrece:
 
- 📊 **Dashboard** 
- ⏱️ **Temporizadores** 
- 🔔 **Notificaciones push** 
- 📜 **Historial** 
- 🚨 **Alerta visual** 

## 🌐 Aplicación Web

La interfaz web desarrollada en **Vue.js 3 + JavaScript + Vite** permite:
 
- 🕐 **Reloj en tiempo real**
- ⏱️ **Gestión de temporizadores** 
- 📡 **Panel de sensores** 
- 📊 **Gráficas de historial** 
- 🔔 **Alertas visuales** 
- 📜 **Historial de eventos** 
- 📱 **Diseño responsivo** 

## 🤝 Contribución

## 👥 Equipo

## 📄 Licencia
