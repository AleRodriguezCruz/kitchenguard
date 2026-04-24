# 🍎 kitchenguard

## 📋 Tabla de Contenidos

> **Sistema Inteligente de Seguridad y Temporización para el Hogar** 

> Proyecto de Innovación — Servidores Web en Linux
> Tecnológico Nacional de México · Instituto Tecnológico de Ensenada

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
- Notificación al finaliza.

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
- Un Botón.
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

KitchenGuard/ 
│ 
├── backend/ 
├── frontend-web/ 
├── frontend-mobile/ 
├── iot/ 
├── database/ 
├── docs/ 
└── README.md

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
1.- cd frontend-web
2.- npm install
3.- npm run dev

### Configuración Móvil
1.- cd frontend-mobile 
2.- npm install 
3.- npx expo start #Escanear QR con la app Expo Go.

## 📖 Uso

## 🔌 API / Comunicación

## 📱 Aplicación Móvil

## 🌐 Aplicación Web

## 🤝 Contribución

## 👥 Equipo

## 📄 Licencia
