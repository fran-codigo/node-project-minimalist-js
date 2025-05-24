# Project Minimalist EP Starter

Este es un proyecto minimalista para iniciar un proyecto con Node.js, Express y Prisma.
Te ahorra tiempo con la configuración inicial de un proyecto.
Ideal para proyectos pequeños, medianos o para aprender a usar Node.js, Express y Prisma.

Construye tu api REST con Node.js, Express y Prisma.

## Características

- Configuración básica de un proyecto Node.js
- Uso de Express para crear rutas
- Uso de Prisma para manejar la base de datos
- Uso de express-validator para validar los datos
- Uso de dotenv para manejar variables de entorno
- Uso de morgan para manejar logs
- Uso de cors para manejar cors
- Uso de colors para manejar colores en la consola
- Uso de nodemon para manejar el servidor

## Requisitos

- Node.js
- npm
- MySQL

## Instalación

1. Clonar el repositorio
2. Eliminar la carpeta oculta .git
3. Instalar dependencias con el comando `npm i`
4. Configurar variables de entorno copiando el archivo .env.template a .env
5. Iniciar el servidor con el comando `npm run serve`
6. Correr el comando `npx prisma migrate dev --name init` para crear la tabla de la base de datos, puedes modificar antes el archivo `prisma/schema.prisma` para crear la tablas de la base de datos de tu proyecto
