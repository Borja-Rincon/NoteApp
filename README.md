# Aplicación de Notas

Esta es una aplicación de notas que permite a los usuarios crear, leer, actualizar y eliminar notas. El proyecto está dividido en dos partes: **Backend** y **Frontend**.

## Estructura del Proyecto

│   
├───backend
│   │   .gitignore
│   │   index.js
│   │   package-lock.json
│   │   package.json
│   │   
│   ├───config
│   │       db.config.js
│   │       
│   ├───controllers
│   │       note.controller.js
│   │       
│   ├───models
│   │       index.js
│   │       note.model.js
│   │      
│   └───routes
│           note.routes.js
│           
└───frontend
    └───NoteApp
        └───src
            │   global.scss
            │   index.html
            │   main.ts
            │   polyfills.ts
            │   test.ts
            │   zone-flags.ts
            │   
            ├───app
            │   │   app-routing.module.ts
            │   │   app.component.html
            │   │   app.component.scss
            │   │   app.component.spec.ts
            │   │   app.component.ts
            │   │   app.module.ts
            │   │   
            │   ├───home
            │   │       home-routing.module.ts
            │   │       home.module.ts
            │   │       home.page.html
            │   │       home.page.scss
            │   │       home.page.spec.ts
            │   │       home.page.ts
            │   │       
            │   ├───new-note
            │   │       new-note-routing.module.ts
            │   │       new-note.module.ts
            │   │       new-note.page.html
            │   │       new-note.page.scss
            │   │       new-note.page.spec.ts
            │   │       new-note.page.ts
            │   │       
            │   ├───note-details
            │   │       note-details-routing.module.ts
            │   │       note-details.module.ts
            │   │       note-details.page.html
            │   │       note-details.page.scss
            │   │       note-details.page.spec.ts
            │   │       note-details.page.ts
            │   │       
            │   └───services
            │           note.service.spec.ts
            │           note.service.ts
            │           
            ├───assets
            │   │   shapes.svg
            │   │   
            │   └───icon
            │           favicon.png
            │           
            ├───environments
            │       environment.prod.ts
            │       environment.ts
            │       
            └───theme
                    variables.scss

### Backend

La parte de backend de la aplicación se ha construido utilizando **Express** para el servidor, **Sequelize** como ORM y **MySQL** como base de datos.

#### Instalación

1. Navega a la carpeta del backend:

   cd backend

2. Instala las dependencias:
   
   npm install

3. Configura la base de datos en el archivo .env (asegúrate de tener MySQL instalado y corriendo):
   
  DB_HOST=localhost
  DB_USER=tu_usuario
  DB_PASS=tu_contraseña
  DB_NAME=nombre_de_tu_base_de_datos

4. Inicia el servidor:

  npm start

  El backend se ejecutará en http://localhost:8080.


### frontend

La parte de backend de la aplicación se ha construido utilizando **Express** para el servidor, **Sequelize** como ORM y **MySQL** como base de datos.

#### Instalación

1. Navega a la carpeta del frontend:

   cd frontend

3. Instala las dependencias:
   
   npm install

3. Inicia el servidor:

  ionic serve

  La aplicación se ejecutará en http://localhost:8100.

### Funcionalidades 

- Crear Notas: Los usuarios pueden crear nuevas notas proporcionando un título y una descripción.
- Leer Notas: Los usuarios pueden ver una lista de todas sus notas.
- Actualizar Notas: Los usuarios pueden editar notas existentes.
- Eliminar Notas: Los usuarios pueden eliminar notas que ya no necesiten.


## Pruebas de API

Puedes probar los endpoints de la API utilizando la colección de Postman disponible [aquí](https://api.postman.com/collections/38982068-a0fe5cfc-3887-440d-9c96-040cd35db19f?access_key=PMAT-01JA3WBEA1VXQVRJXW8CB7WPD4).


### Endpoints

- **GET** `/api/notes` - Obtener todas las notas.
- **POST** `/api/notes` - Crear una nueva nota.
- **GET** `/api/notes/:id` - Obtener una nota por ID.
- **PUT** `/api/notes/:id` - Actualizar una nota por ID.
- **DELETE** `/api/notes/:id` - Eliminar una nota por ID.
