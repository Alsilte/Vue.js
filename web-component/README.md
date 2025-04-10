# Creando Web Components con Vue 3 y Vite: Explicación Completa

Guía detallada te llevará a través del proceso completo para crear un web component utilizando Vue 3 y Vite.

## ¿Qué es un Web Component?

Un Web Component es un estándar web que permite crear elementos HTML personalizados y reutilizables con funcionalidad y apariencia encapsulada, independiente de frameworks específicos.

## ¿Por qué usar Vue 3 y Vite para Web Components?

- **Vue 3** ofrece una sintaxis clara, rendimiento optimizado y la función `defineCustomElement` para facilitar la creación de Web Components.
- **Vite** es una herramienta de construcción rápida que mejora significativamente el flujo de desarrollo y optimiza el rendimiento en producción.

## Prerrequisitos

Antes de empezar, debes instalar:

- **Node.js** (versión 16 o superior): [https://nodejs.org/](https://nodejs.org/)
- **npm** (incluido con Node.js) o **yarn** (`npm install -g yarn`)

## Pasos Detallados

### 1. Crear un Proyecto Vite con Vue 3

Abre tu terminal y ejecuta:

```bash
npm create vite@latest
# o

 yarn create vite
```

Sigue el asistente:

- **Project name:** (tu nombre de proyecto)
- **Framework:** Vue
- **Variant:** JavaScript o TypeScript

Luego, ingresa al proyecto:

```bash
cd tu-nombre-de-proyecto
```

### 2. Instalar Dependencias

Ejecuta:

```bash
npm install
# o
yarn install
```

### 3. Configurar Vite para Web Components

Modifica `vite.config.js` o `vite.config.ts`:

```javascript
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      // El punto de entrada de tu componente
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      // El nombre de tu web component
      name: 'MiWebComponent', 
      // Los formatos de salida, en este caso, solo 'iife' para un web component
      formats: ['iife'],
      // El nombre del archivo generado (opcional)
      fileName: (format) => `mi-web-component.${format}.js`, 
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
```

### 4. Crear el Componente Vue

Crea `src/components/MyComponent.vue`:

```vue
<template>
  <div>
    <h1>¡Hola desde mi Web Component!</h1>
    <p>{{ mensaje }}</p>
    <button @click="incrementar">Incrementar</button>
    <span>Contador: {{ contador }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mensaje = ref('Este es un componente Vue 3 como Web Component.');
const contador = ref(0);

const incrementar = () => {
  contador.value++;
};
</script>

<style scoped>
h1 { color: blue; }
</style>
```

### 5. Definir y Registrar el Web Component

En `src/main.js` o `main.ts`:

```javascript
import './assets/main.css'
import Componente from './components/Componente.vue'

import { createApp, defineCustomElement } from 'vue'
import App from './App.vue'

// Monta la aplicación principal Vue (App.vue)
createApp(App).mount('#app')

// Define y registra el web component (Componente.vue)
const MiWebComponent = defineCustomElement(Componente);
customElements.define('mi-web-component', MiWebComponent);
```

### 6. Construir el Proyecto

Ejecuta:

```bash
npm run build
# o
yarn build
```

Esto genera la carpeta `dist` con tu Web Component listo.

### 7. Usar el Web Component en HTML

Crea un archivo HTML para usar tu componente:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prueba Web Component</title>
</head>
<body>

  <!-- Tu Web Component -->
  <mi-web-component></mi-web-component>

  <!-- Dependencias: Vue primero -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

  <!-- Web Component generado por Vite -->
  <script src="./dist/mi-web-component.iife.js"></script>

</body>
</html>

```

## Importar el Web Component en otro proyecto Vue 3 con API Options

Para usar el web component en un proyecto Vue 3 con Options API, sigue estos pasos:

### 1. Añadir el Web Component al HTML del Proyecto

Incluye tu archivo generado (`mi-web-component.iife.js`) en el archivo HTML principal (`index.html`) de tu proyecto Vue 3:

```html
<script src="/ruta-a-tu-web-component/mi-web-component.iife.js"></script>
```

### 2. Registrar el Web Component en el Componente Vue

Si quieres usarlo dentro de un componente Vue con la Options API, asegúrate de registrarlo o permitir que Vue reconozca el elemento personalizado:

```javascript
export default {
  name: 'App',
  mounted() {
    // Registrar el Web Component como elemento personalizado
    if (!customElements.get('mi-web-component')) {
      console.error('El web component no ha sido cargado correctamente.');
    }
  },
};
```

Luego, úsalo en el template:

```html
<template>
  <div>
    <mi-web-component></mi-web-component>
  </div>
</template>
```

## Sufijo .ce.vue

 Usar el sufijo .ce.vue en los archivos de componente
Para que Vue maneje correctamente los estilos en el shadow DOM, necesitas usar el sufijo .ce.vue en los archivos de los componentes que deseas convertir en elementos personalizados.

Ejemplo de un componente Example.ce.vue:
```javascript
<template>
  <div>
    <h1>Hello from Custom Element!</h1>
  </div>
</template>

<script>
export default {
  name: 'Example',
}
</script>

<style>
/* Los estilos serán inyectados en el shadow DOM */
h1 {
  color: red;
}
</style>
```
Importante: Usa el sufijo .ce.vue para asegurarte de que el componente se maneje en modo de elemento personalizado.



