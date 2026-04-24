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
- Acceso desde app móvil

## 🏗️ Arquitectura del Sistema
1. **IoT - ESP32 (Local):** Lectura de sensores, es decir, recolección y envío de datos al servidor.
2. **Servidor (Raspberry Pi / Linux):** Gestión de la BD, API REST, procesamiento de datos, mediante el Servidor.
3. **Client (UI):** Aplicación web (vue.js) y aplicación movil (React Native), consumen los datos en tiempo real.

## ⚙️ Componentes de Hardware

## 🛠️ Tecnologías Utilizadas

### Hardware / Firmware

### Backend / API

### Aplicación Web

### Aplicación Móvil

## 📁 Estructura del Proyecto

## 🚀 Instalación y Configuración

### Pre-requisitos

### Clonar el repositorio

### Configuración del Hardware

### Configuración del Backend

### Configuración Web

### Configuración Móvil

## 📖 Uso

## 🔌 API / Comunicación

## 📱 Aplicación Móvil

## 🌐 Aplicación Web

## 🤝 Contribución

## 👥 Equipo

## 📄 Licencia
