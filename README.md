<div align="center">

# 📝 Full Stack Open — Next.js Blog Application

[![Playwright Tests](https://github.com/Sais-gallego/nextjs-blog/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sais-gallego/nextjs-blog/actions/workflows/playwright.yml)
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)

Aplicación Full Stack de gestión de blogs y listas de lectura construida con **Next.js App Router**, **Drizzle ORM**, **PostgreSQL**, **NextAuth v5 (Auth.js)** y validada con pruebas End-to-End en **Playwright** para el curso **Full Stack Open: Next.js** de la Universidad de Helsinki.

</div>

---

## ✨ Características Principales

- **Arquitectura App Router & React Server Components**: Renderizado híbrido y mutaciones con Server Actions y `revalidatePath`.
- **Autenticación y Seguridad**:
  - Inicio de sesión mediante credenciales con `NextAuth v5` (`Auth.js`) y `bcryptjs`.
  - Generación de **API Tokens (`Bearer`)** firmados con JWT para consumo programático de la API REST.
  - Estado de cuenta de usuarios (`active` / `disabled`) gestionado por administradores.
- **Gestión de Blogs**:
  - Creación, visualización detallada, sistema de *likes* en tiempo real, eliminación autorizada y búsqueda/filtrado dinámico con *debounce*.
- **Listas de Lectura (*Reading Lists*)**:
  - Adición de blogs a la lista personal de lectura, marcado de estado leído/no leído (`read` / `unread`) y filtrado en el perfil personal (`/me`).
- **Calidad & CI/CD**:
  - Suite completa de pruebas End-to-End con **Playwright** ejecutándose automáticamente en **GitHub Actions** contra un servicio PostgreSQL aislado.

---

## 🗂️ Estructura del Proyecto

```text
nextjs-blog/
├── app/
│   ├── api/                 # Endpoints REST (blogs, users, readinglists, token, testing)
│   ├── blogs/               # Listado, buscador, creación y vista individual de blogs
│   ├── users/               # Directorio de usuarios y perfiles individuales
│   ├── admin/               # Panel de administración (activar/desactivar cuentas)
│   ├── me/                  # Perfil personal, Reading List y generador de API Token
│   ├── login/ & register/   # Vistas de autenticación y registro
│   └── actions/             # Server Actions (blogs, usuarios, listas de lectura)
├── components/              # Componentes cliente y servidor reutilizables
├── db/
│   ├── index.ts             # Conexión PostgreSQL / Neon Serverless con Drizzle
│   └── schema.ts            # Esquema relacional (users, blogs, readinglists)
└── tests/                   # Suite oficial E2E de Playwright
```

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   git clone https://github.com/Sais-gallego/nextjs-blog.git
   cd nextjs-blog
   npm install
   ```

2. **Configurar variables de entorno (`.env`):**
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nextjs_blog
   AUTH_SECRET=tu-secreto-seguro
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Sincronizar esquema de base de datos e iniciar el servidor:**
   ```bash
   npx drizzle-kit push
   npm run dev
   ```

4. **Ejecutar pruebas End-to-End con Playwright:**
   ```bash
   npx playwright test
   ```
