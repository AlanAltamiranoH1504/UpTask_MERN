# UpTask - Administrador de Proyectos y Tareas

UpTask es una aplicación web que permite a empresas **administrar proyectos, tareas y usuarios** de manera eficiente. La aplicación está separada en **frontend y backend**, utilizando tecnologías modernas:

* **Frontend:** React.js con Hooks, Headless UI y Tailwind CSS
* **Backend:** Express.js con TypeScript, MongoDB y Mongoose

Esta arquitectura permite escalabilidad, mantenibilidad y una experiencia de usuario rápida e interactiva.

---

## 📝 Funcionalidades principales

* Crear, editar y eliminar **proyectos**.
* Gestionar **tareas** dentro de cada proyecto.
* Crear y administrar **usuarios** asignados a proyectos o tareas.
* Visualización de **estado de tareas** (pendiente, en progreso, completada).
* Autenticación y autorización mediante **JWT**.
* Validaciones de datos en backend y frontend.
* Notificaciones o alertas básicas sobre tareas pendientes.
* Control de acceso según roles o permisos (administrador, miembro de proyecto).

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


