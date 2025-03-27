# Guía Completa de Vue.js para Principiantes

## Índice
1. [Introducción a Vue.js](#introducción-a-vuejs)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Conceptos Fundamentales](#conceptos-fundamentales)
4. [Directivas Básicas](#directivas-básicas)
5. [Componentes](#componentes)
6. [Props y Eventos](#props-y-eventos)
7. [Ciclo de Vida](#ciclo-de-vida)
8. [Computadas y Observadores](#computadas-y-observadores)
9. [Vue Router](#vue-router)
10. [Vuex](#vuex)
11. [Composition API](#composition-api)
12. [Buenas Prácticas](#buenas-prácticas)
13. [Recursos Adicionales](#recursos-adicionales)

## Introducción a Vue.js

### ¿Qué es Vue.js?

Vue.js es un framework progresivo para construir interfaces de usuario. A diferencia de otros frameworks monolíticos, Vue está diseñado para ser adoptado incrementalmente. Su núcleo se centra en la capa de vista, lo que facilita su integración con otros proyectos o bibliotecas existentes.

### Características principales:

- **Reactivo y Componible**: Sistema de componentes y enlace de datos reactivo
- **Liviano**: Solo pesa ~30KB minificado y comprimido
- **Flexible**: Puede ser usado como biblioteca o framework completo
- **Amigable**: Curva de aprendizaje suave y documentación excelente
- **Rendimiento**: Virtual DOM optimizado para rendimiento

## Instalación y Configuración

### Método 1: CDN

La forma más simple de empezar con Vue es usar el CDN:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

### Método 2: CLI de Vue

Para proyectos más complejos, se recomienda usar Vue CLI:

```bash
# Instalar Vue CLI
npm install -g @vue/cli

# Crear un nuevo proyecto
vue create mi-proyecto-vue

# Ejecutar el servidor de desarrollo
cd mi-proyecto-vue
npm run serve
```

### Método 3: Vite

Vue también funciona perfectamente con Vite, un servidor de desarrollo más rápido:

```bash
# Crear un nuevo proyecto con Vite
npm create vite@latest mi-proyecto-vue -- --template vue

# Instalar dependencias y ejecutar
cd mi-proyecto-vue
npm install
npm run dev
```

## Conceptos Fundamentales

### Instancia de Vue

En Vue 3, todo comienza con la función `createApp`:

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

### Sistema de Plantillas

Vue utiliza plantillas basadas en HTML que permiten declarativamente vincular el DOM renderizado a los datos de la instancia Vue.

### Aplicación Mínima

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mi Primera App Vue</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h1>{{ mensaje }}</h1>
  </div>

  <script>
    const { createApp } = Vue
    
    createApp({
      data() {
        return {
          mensaje: '¡Hola Vue!'
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

## Directivas Básicas

Las directivas son atributos especiales con el prefijo `v-` que aplican comportamiento reactivo al DOM.

### v-bind

Enlaza dinámicamente atributos:

```html
<a v-bind:href="url">Enlace</a>
<!-- Abreviatura -->
<a :href="url">Enlace</a>
```

### v-model

Crea un enlace bidireccional en formularios:

```html
<input v-model="mensaje">
<p>El mensaje es: {{ mensaje }}</p>
```

### v-if / v-else / v-else-if

Renderizado condicional:

```html
<div v-if="tipo === 'A'">A</div>
<div v-else-if="tipo === 'B'">B</div>
<div v-else>No A/B</div>
```

### v-for

Renderizado de listas:

```html
<ul>
  <li v-for="(item, index) in items" :key="index">
    {{ item.nombre }}
  </li>
</ul>
```

### v-on

Escucha eventos del DOM:

```html
<button v-on:click="incrementar">Incrementar</button>
<!-- Abreviatura -->
<button @click="incrementar">Incrementar</button>
```

## Componentes

Los componentes son una parte fundamental de Vue que permiten encapsular código reutilizable.

### Componente Simple

```javascript
// ComponenteSimple.vue
<template>
  <div class="componente-simple">
    <h2>{{ titulo }}</h2>
    <button @click="incrementar">Contador: {{ contador }}</button>
  </div>
</template>

<script>
export default {
  name: 'ComponenteSimple',
  props: {
    titulo: {
      type: String,
      default: 'Componente por defecto'
    }
  },
  data() {
    return {
      contador: 0
    }
  },
  methods: {
    incrementar() {
      this.contador++
    }
  }
}
</script>

<style scoped>
.componente-simple {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 4px;
}
</style>
```

### Uso del Componente

```html
<template>
  <div>
    <ComponenteSimple titulo="Mi Primer Componente" />
    <ComponenteSimple titulo="Otro Componente" />
  </div>
</template>

<script>
import ComponenteSimple from './ComponenteSimple.vue'

export default {
  components: {
    ComponenteSimple
  }
}
</script>
```

## Props y Eventos

### Props (Propiedades)

Los props permiten pasar datos de un componente padre a un hijo:

```javascript
// Hijo
export default {
  props: {
    titulo: String,
    cantidad: {
      type: Number,
      required: true,
      validator: value => value >= 0
    }
  }
}
```

```html
<!-- Padre -->
<ComponenteHijo 
  titulo="Título desde el padre" 
  :cantidad="42" 
/>
```

### Eventos Personalizados

Los eventos permiten la comunicación del hijo al padre:

```javascript
// Hijo
methods: {
  enviarDatos() {
    this.$emit('datos-enviados', { id: 1, valor: 'test' })
  }
}
```

```html
<!-- Padre -->
<ComponenteHijo @datos-enviados="procesarDatos" />
```

```javascript
// Padre
methods: {
  procesarDatos(datos) {
    console.log('Datos recibidos:', datos)
  }
}
```

## Ciclo de Vida

Los componentes Vue tienen un ciclo de vida que permite ejecutar código en momentos específicos:

```javascript
export default {
  beforeCreate() {
    // Antes de que se inicialice la instancia
  },
  created() {
    // La instancia se ha creado, perfecto para peticiones API
  },
  beforeMount() {
    // Antes de montar en el DOM
  },
  mounted() {
    // El componente se ha montado en el DOM
  },
  beforeUpdate() {
    // Antes de actualizar el DOM por cambios reactivos
  },
  updated() {
    // Después de actualizar el DOM
  },
  beforeUnmount() {
    // Antes de eliminar el componente
  },
  unmounted() {
    // Después de eliminar el componente
  }
}
```

## Computadas y Observadores

### Propiedades Computadas

Las propiedades computadas son valores derivados que se almacenan en caché y solo se recalculan cuando sus dependencias cambian:

```javascript
export default {
  data() {
    return {
      mensaje: 'hola',
      apellido: 'mundo'
    }
  },
  computed: {
    mensajeCompleto() {
      return this.mensaje + ' ' + this.apellido
    },
    // Con getter y setter
    nombreCompleto: {
      get() {
        return this.mensaje + ' ' + this.apellido
      },
      set(valor) {
        const partes = valor.split(' ')
        this.mensaje = partes[0]
        this.apellido = partes[1]
      }
    }
  }
}
```

### Observadores (Watchers)

Los watchers permiten realizar acciones cuando cambian datos específicos:

```javascript
export default {
  data() {
    return {
      pregunta: '',
      respuesta: ''
    }
  },
  watch: {
    // Simple
    pregunta(nuevaPregunta, viejaPregunta) {
      if (nuevaPregunta.includes('?')) {
        this.buscarRespuesta()
      }
    },
    // Avanzado
    'usuario.perfil': {
      handler(nuevo, viejo) {
        console.log('Perfil de usuario actualizado')
      },
      deep: true, // Observa cambios anidados
      immediate: true // Se llama inmediatamente al crear
    }
  },
  methods: {
    buscarRespuesta() {
      // Lógica para buscar respuesta
      this.respuesta = 'Pensando...'
      setTimeout(() => {
        this.respuesta = 'La respuesta es 42'
      }, 1000)
    }
  }
}
```

## Vue Router

Vue Router es la biblioteca oficial para el enrutamiento en aplicaciones Vue.

### Instalación

```bash
npm install vue-router@4
```

### Configuración Básica

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'), // Carga perezosa
    props: true // Pasa parámetros como props
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### Uso en la Aplicación

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

### Componentes de Navegación

```html
<template>
  <div>
    <nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/about">Acerca de</router-link> |
      <router-link :to="{ name: 'User', params: { id: 123 }}">Usuario</router-link>
    </nav>
    
    <!-- Aquí se renderiza el componente que coincida con la ruta -->
    <router-view></router-view>
  </div>
</template>
```

## Vuex

Vuex es un patrón de gestión de estado + biblioteca para aplicaciones Vue.js.

### Instalación

```bash
npm install vuex@4
```

### Store Básico

```javascript
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      contador: 0,
      usuarios: []
    }
  },
  getters: {
    contadorDoble(state) {
      return state.contador * 2
    },
    usuarioById: (state) => (id) => {
      return state.usuarios.find(user => user.id === id)
    }
  },
  mutations: {
    incrementar(state, cantidad = 1) {
      state.contador += cantidad
    },
    setUsuarios(state, usuarios) {
      state.usuarios = usuarios
    }
  },
  actions: {
    incrementarAsync({ commit }) {
      setTimeout(() => {
        commit('incrementar')
      }, 1000)
    },
    async fetchUsuarios({ commit }) {
      try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users')
        const usuarios = await respuesta.json()
        commit('setUsuarios', usuarios)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
      }
    }
  },
  modules: {
    // Para stores más complejos, puedes separar en módulos
  }
})
```

### Uso en la Aplicación

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
```

### Uso en Componentes

```html
<template>
  <div>
    <p>Contador: {{ $store.state.contador }}</p>
    <p>Contador doble: {{ $store.getters.contadorDoble }}</p>
    <button @click="incrementar">+1</button>
    <button @click="incrementarAsync">+1 (Async)</button>
    <button @click="cargarUsuarios">Cargar Usuarios</button>
    
    <ul>
      <li v-for="usuario in $store.state.usuarios" :key="usuario.id">
        {{ usuario.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    incrementar() {
      this.$store.commit('incrementar')
    },
    incrementarAsync() {
      this.$store.dispatch('incrementarAsync')
    },
    cargarUsuarios() {
      this.$store.dispatch('fetchUsuarios')
    }
  }
}
</script>
```

### Helpers de Vuex

Para un código más limpio:

```javascript
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // Mapea this.contador a this.$store.state.contador
    ...mapState(['contador', 'usuarios']),
    // Mapea this.contadorDoble a this.$store.getters.contadorDoble
    ...mapGetters(['contadorDoble', 'usuarioById'])
  },
  methods: {
    // Mapea this.incrementar() a this.$store.commit('incrementar')
    ...mapMutations(['incrementar']),
    // Mapea this.incrementarAsync() a this.$store.dispatch('incrementarAsync')
    ...mapActions(['incrementarAsync', 'fetchUsuarios'])
  }
}
```

## Composition API

La Composition API es una forma alternativa de organizar la lógica en los componentes Vue.

### Setup

```javascript
<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Estado reactivo
const contador = ref(0)
const nombre = ref('Vue')

// Computadas
const contadorDoble = computed(() => contador.value * 2)

// Métodos
function incrementar() {
  contador.value++
}

// Ciclo de vida
onMounted(() => {
  console.log('Componente montado')
})

// Watchers
watch(contador, (nuevo, viejo) => {
  console.log(`Contador cambió de ${viejo} a ${nuevo}`)
})
</script>

<template>
  <div>
    <h1>Hola, {{ nombre }}</h1>
    <p>Contador: {{ contador }}</p>
    <p>Doble: {{ contadorDoble }}</p>
    <button @click="incrementar">+1</button>
  </div>
</template>
```

### Refs vs Reactive

```javascript
import { ref, reactive, toRefs } from 'vue'

// Ref - Bueno para valores primitivos
const contador = ref(0)
console.log(contador.value) // Accede con .value

// Reactive - Bueno para objetos
const estado = reactive({
  contador: 0,
  nombre: 'Vue'
})
console.log(estado.contador) // Acceso directo, sin .value

// Desestructuración con toRefs
const { contador, nombre } = toRefs(estado)
```

### Composables (Funciones Composables)

Las funciones composables permiten extraer y reutilizar lógica entre componentes:

```javascript
// useContador.js
import { ref } from 'vue'

export function useContador(inicial = 0) {
  const contador = ref(inicial)
  
  function incrementar() {
    contador.value++
  }
  
  function decrementar() {
    contador.value--
  }
  
  return {
    contador,
    incrementar,
    decrementar
  }
}
```

```javascript
// Uso en un componente
<script setup>
import { useContador } from './composables/useContador'

const { contador, incrementar, decrementar } = useContador(10)
</script>

<template>
  <div>
    <p>Contador: {{ contador }}</p>
    <button @click="incrementar">+</button>
    <button @click="decrementar">-</button>
  </div>
</template>
```

## Buenas Prácticas

### Estructura de Proyecto

```
my-vue-app/
├── public/            # Archivos estáticos
├── src/
│   ├── assets/        # Imágenes, fuentes, etc.
│   ├── components/    # Componentes reutilizables
│   │   ├── common/    # Componentes generales (botones, inputs, etc.)
│   │   └── features/  # Componentes específicos de características
│   ├── composables/   # Funciones composables
│   ├── router/        # Configuración de Vue Router
│   ├── store/         # Store de Vuex
│   ├── views/         # Páginas/Vistas
│   ├── services/      # Servicios (API, autenticación, etc.)
│   ├── utils/         # Utilidades y helpers
│   ├── App.vue        # Componente raíz
│   └── main.js        # Punto de entrada
└── package.json
```

### Nombramiento de Componentes

- Usa PascalCase para componentes (Ej: `UserProfile.vue`)
- Usa multi-palabra para evitar conflictos con elementos HTML (Ej: `AppButton.vue` en lugar de `Button.vue`)
- Prefija componentes base/comunes (Ej: `BaseButton.vue`, `AppTable.vue`)

### Optimización de Rendimiento

1. **Uso de `v-once`** para contenido estático:
   ```html
   <h1 v-once>{{ título }}</h1>
   ```

2. **Uso de `v-memo`** para memorizar secciones:
   ```html
   <div v-memo="[item.id]">
     {{ expensiveOperation(item) }}
   </div>
   ```

3. **Carga perezosa de componentes**:
   ```javascript
   const AdminPanel = () => import('./AdminPanel.vue')
   ```

4. **Mantén tus componentes pequeños y enfocados**

### Testing

1. **Instalación**:
   ```bash
   npm install --save-dev @vue/test-utils vitest
   ```

2. **Ejemplo de test**:
   ```javascript
   import { mount } from '@vue/test-utils'
   import { test, expect } from 'vitest'
   import HelloWorld from './HelloWorld.vue'

   test('renderiza el mensaje correctamente', () => {
     const mensaje = '¡Nuevo mensaje!'
     const wrapper = mount(HelloWorld, {
       props: {
         msg: mensaje
       }
     })
     expect(wrapper.text()).toContain(mensaje)
   })
   ```

## Recursos Adicionales

### Documentación Oficial
- [Vue.js - Documentación Oficial](https://vuejs.org/guide/introduction.html)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Test Utils](https://test-utils.vuejs.org/)

### Herramientas
- [Vue Devtools](https://devtools.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Nuxt.js](https://nuxt.com/) - Framework basado en Vue

### Bibliotecas Populares
- [Pinia](https://pinia.vuejs.org/) - Alternativa a Vuex
- [Vue Use](https://vueuse.org/) - Colección de composables
- [Vuelidate](https://vuelidate-next.netlify.app/) - Validación de formularios
- [Quasar](https://quasar.dev/) - Framework UI
- [Vuetify](https://vuetifyjs.com/) - Framework Material Design
- [PrimeVue](https://primevue.org/) - Biblioteca de componentes UI

### Comunidad
- [Vue Forum](https://forum.vuejs.org/)
- [Vue Discord](https://discord.com/invite/vue)
- [Vue Land](https://chat.vuejs.org/)

---

## Conclusión

Vue.js es un framework versátil y potente que permite construir interfaces de usuario interactivas y reactivas. Su enfoque progresivo facilita su adopción tanto en proyectos pequeños como en aplicaciones empresariales completas.

La mejor manera de aprender Vue.js es practicando. Comienza con proyectos pequeños e incrementa gradualmente la complejidad a medida que te sientas más cómodo con el framework.

¡Feliz desarrollo con Vue.js!