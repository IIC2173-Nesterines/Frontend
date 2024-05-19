# IIC2173 Arquitectura de Sistemas de Software: E1
Estudiantes:
* Beatriz Errázuriz
* Daniel Sebastián
* Diego Sfeir
* Eduardo Soto
* Joaquín Viñuela

## Instrucciones para Ejecutar Localmente

Para ejecutar localmente el proyecto, se debe tener sistema operativo Linux o MacOS, con Node.js y Postgresql instalados. Luego, se debe clonar el repositorio del proyecto y abrir una consola en el directorio del frontend. En el directorio del frontend, se debe ejecutar el comando `npm install` para actualizar las dependencias del proyecto. Para correr el proyecto, se debe configurar un archivo `.env` con las siguientes variables de entorno:

```
NEXT_PUBLIC_AUTH0_SECRET=1a91ce746bd1544d602acc7cbae4129a03df260b9ac4a0404a5a4bc24ac8f613
NEXT_PUBLIC_AUTH0_BASE_URL=http://localhost:3000
NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL=https://dev-lqyab7kegcbrfeto.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=cOStGrOnfpDh1fq1XZRWm3YW5Ecwa3Za
NEXT_PUBLIC_AUTH0_CLIENT_SECRET=qtWL37HieNEpGu3eP3bDX4VxbU80SuK-tFB1rA-sbfv_zjwixPWHXL4DwTHzPgNY
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.e1-arquisis.com
NEXT_PUBLIC_API_BASE_URL=https://yfucdzekj0.execute-api.us-east-1.amazonaws.com/prod
```

Finalmente, se debe ejecutar el comando `npm run dev` para correr el proyecto en el puerto 3000. Para que el frontend se pueda conectar el backend, se debe abrir una nueva consola en el directorio de la API en el repositorio del backend y seguir las instrucciones de la documentación

## Pipeline CI
Se implementó un *pipeline* de CI muy simple para esta entrega, el cual fue desarrollado con Github Actions y ejecuta un chequeo de estilo de código con ESLint. El archivo de configuración del *pipeline* se encuentra en `.github/workflows/main.yml`. El *pipeline* se ejecuta cada vez que se hace un *push* a la rama `main` del repositorio.
