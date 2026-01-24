<p align="center">
  <img src="/docs/imgs/logo.svg" alt="UpTask Logo" width="200"/>
</p>

<h1 align="center">🚀 UpTask — Administrador de Proyectos y Tareas</h1>

<p align="center">
  Plataforma moderna para la gestión de proyectos, tareas y equipos de trabajo.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue" />
  <img src="https://img.shields.io/badge/Backend-Express-green" />
  <img src="https://img.shields.io/badge/Language-TypeScript-blueviolet" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen" />
  <img src="https://img.shields.io/badge/Status-En%20Desarrollo-orange" />
</p>

---

## 📌 Descripción

**UpTask** es una aplicación web diseñada para ayudar a empresas y equipos a **organizar proyectos, asignar tareas y administrar usuarios** de forma eficiente.

Está desarrollada bajo una arquitectura **Frontend + Backend desacoplada**, utilizando tecnologías modernas que garantizan:

✅ Escalabilidad  
✅ Seguridad  
✅ Alto rendimiento  
✅ Mantenibilidad

---

## 🧩 Tecnologías utilizadas

### 🎯 Frontend

- React.js con Hooks
- Tailwind CSS
- Headless UI
- React Hook Form
- Axios

### ⚙️ Backend (Actual)

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator

---

## 🆕 Próximamente

> ⚡ **Nueva versión Backend con Spring Boot**

Actualmente se encuentra en planeación el desarrollo de una versión alternativa del backend usando:

- Java + Spring Boot
- Spring Security + JWT
- JPA / Hibernate
- Arquitectura RESTful
- PostgreSQL o MySQL

Esto permitirá comparar rendimiento, escalabilidad y arquitectura entre **Node.js** y **Spring Boot**.

📅 Estado: **En desarrollo / Próximamente disponible**

---

## 📝 Funcionalidades principales

- 📁 Crear, editar y eliminar **proyectos**
- ✅ Gestión completa de **tareas**
- 👥 Administración de **usuarios**
- 🔄 Estados de tareas:
    - Pendiente
    - En progreso
    - Completada
- 🔐 Autenticación y autorización con JWT
- 🛡️ Control de roles y permisos
- 🔔 Notificaciones básicas
- ✔️ Validaciones en frontend y backend

---


## 🏗️ Arquitectura del proyecto

```
UpTask/
 ├─ backend/                 # Servidor Express + TypeScript + MongoDB/Mongoose
 │   ├─ src/
 │   │   ├─ controllers/     # Lógica de rutas y endpoints
 │   │   ├─ models/          # Definición de modelos de datos (Mongoose)
 │   │   ├─ routes/          # Definición de rutas
 │   │   ├─ middleware/      # JWT, validaciones, autenticación
 │   │   └─ index.ts          # Punto de entrada del backend
 │   └─ tsconfig.json         # Configuración de TypeScript
 └─ frontend/                # Aplicación React
     ├─ src/
     │   ├─ components/      # Componentes UI (Headless UI)
     │   ├─ views/           # Vistas principales (Proyectos, Tareas, Usuarios)
     │   ├─ services/        # Comunicación con API (axios)
     │   └─ App.tsx          # Componente principal
     └─ package.json         # Configuración de React y dependencias
```

---

## ⚡ Tecnologías

### Backend

* Node.js + Express.js
* TypeScript
* MongoDB + Mongoose
* Autenticación JWT
* Validaciones con express-validator o class-validator

### Frontend

* React.js con Hooks
* React Hook Form para formularios
* Headless UI para componentes accesibles
* Tailwind CSS para estilos
* Axios para comunicación con el backend

---

## 🚀 Instalación y ejecución

### Backend

```bash
cd backend
npm install
npm run dev   # Ejecuta el servidor en modo desarrollo
```

### Frontend

```bash
cd frontend
npm install
npm start     # Ejecuta la app de React
```

Luego abre tu navegador en `http://localhost:3000` para acceder al frontend. El backend suele correr en `http://localhost:5172`.

---

## 🔧 Ejemplos de uso

* **Crear un proyecto:**

    * Endpoint: `POST /proyectos`
    * Body: `{ name: "Proyecto Alpha", description: "Proyecto interno" }`

* **Crear una tarea:**

    * Endpoint: `POST /tareas`
    * Body: `{ title: "Tarea 1", projectId: 1, assignedTo: 2, status: "pendiente" }`

* **Registrar un usuario:**

    * Endpoint: `POST /users`
    * Body: `{ name: "Juan Pérez", email: "juan@test.com", password: "Password123" }`

* **Actualizar estado de tarea:**

    * Endpoint: `PATCH /tareas/:id`
    * Body: `{ status: "completada" }`

* **Login de usuario:**

    * Endpoint: `POST /users/login`
    * Body: `{ email: "juan@test.com", password: "Password123" }`
    * Devuelve JWT para autenticación en futuras peticiones

---

## 📚 Recursos recomendados

* [Express.js Docs](https://expressjs.com/)
* [React.js Docs](https://react.dev/)
* [TypeScript Docs](https://www.typescriptlang.org/)
* [Axios Docs](https://axios-http.com/)
* [Mongoose Docs](https://mongoosejs.com/)
* [React Hook Form Docs](https://react-hook-form.com/)
* [Headless UI Docs](https://headlessui.dev/)


