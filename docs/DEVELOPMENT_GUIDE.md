# Guía de Configuración y Arquitectura - Certian (Linux Ready)

Esta guía detalla todos los cambios realizados en el proyecto para asegurar un entorno de desarrollo local estable, escalable y listo para ser migrado a Linux.

---

## 1. Infraestructura Híbrida (Docker + Local)

Para optimizar el rendimiento y la facilidad de depuración, hemos separado la base de datos del código.

### Base de Datos y Herramientas (Docker)
Ubicación: `Certian_Backend/docker-compose.yml`
*   **Motor:** PostgreSQL 15 (Alpine).
*   **Puerto:** `5432` (mapeado localmente).
*   **Esquemas:** `Admin`, `Empresa`, `Estudiante`.
*   **Visualización:** Adminer disponible en `http://localhost:8080`.

### Aplicaciones (Nativo/Local)
*   **Backend:** Express + Node.js (Puerto 5000).
*   **Frontend:** Nuxt 3 (Puerto 3000).

---

## 2. Configuración del Backend (Certian_Backend)

### Instalación de Drivers y Librerías
Se instalaron los siguientes paquetes esenciales:
*   `@prisma/client`: ORM para gestión de DB.
*   `@aws-sdk/client-s3` y `@aws-sdk/lib-storage`: Para conexión con Cloudflare R2 (S3 API).
*   `multer`: Para manejo de archivos multipart/form-data.

### Base de Datos (Prisma)
1.  **Ubicación:** Se movió la carpeta `prisma` dentro de `src/` para una mejor integración con TypeScript.
2.  **Sincronización:** Para crear las tablas, usar:
    ```bash
    npx prisma db push
    ```
3.  **Seed (Datos Iniciales):** Configurado para insertar Tipos de Usuario, Roles y un **SuperAdmin inicial**.
    *   **Comando:** `npx prisma db seed`
    *   **Admin por defecto:** `admin@certian.com` / `admin123`

---

## 3. Sistema de Almacenamiento (Cloudflare R2)

Se implementó el **Patrón de Referencia** para optimizar la DB. Los archivos se suben a la nube y solo guardamos la URL en Postgres.

### Archivos de Configuración:
*   `src/utils/s3Client.ts`: Inicializa la conexión con el endpoint de Cloudflare.
*   `src/services/storage.service.ts`: Clase maestra para subir y gestionar archivos.
*   `src/middlewares/upload.middleware.ts`: Middleware de Multer que usa `MemoryStorage` para procesar archivos antes de subirlos.

### Variables de Entorno (.env):
```env
R2_ACCESS_KEY_ID=tu_key
R2_SECRET_ACCESS_KEY=tu_secret
R2_BUCKET_NAME=certian01
R2_ENDPOINT=https://<id_usuario>.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://pub-<id>.r2.dev
```

---

## 4. Flujo de Retos (Corazón del Proyecto)

Se rediseñó el flujo de creación de retos para que sea multimedia.

*   **Tabla RETO:** Ahora incluye `imagen_url` y `documento_url`.
*   **Tabla POSTULACION:** Ahora incluye `solucion_url` para entregas.
*   **Controlador:** Al recibir un reto, el backend sube los archivos a R2 en paralelo y guarda las URLs resultantes en Postgres.

---

## 5. Configuración del Frontend (Certian_Frontend)

### Conectividad:
*   Se eliminaron los proxys de producción para desarrollo local directo.
*   `nuxt.config.ts`: Configurado para leer `NUXT_PUBLIC_API_URL` del `.env` local.
*   **URL Base Local:** `http://localhost:5000/api`.

### Estilos:
*   Se utiliza **Tailwind CSS v4** con importación directa vía Vite.

---

## 6. Pasos para migrar a Linux (Resumen)

1.  **Docker:** Instalar `docker-ce` y `docker-compose-plugin`.
2.  **Node:** Instalar Node.js v20+ usando `nvm`.
3.  **Backend:**
    *   `npm install`
    *   `docker compose up -d`
    *   `npx prisma db push`
    *   `npx prisma db seed`
    *   `npm run dev`
4.  **Frontend:**
    *   `npm install`
    *   `npm run dev`

---
*Documentación generada el 9 de Junio de 2026.*
