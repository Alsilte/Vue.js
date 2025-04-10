# Vue 3 - De 0 a Experto con Options API

<div align="center">
  <img src="https://vuejs.org/images/logo.png" alt="Vue.js Logo" width="200">
  <h3>La guía definitiva para dominar Vue 3 con la Options API</h3>
</div>

## Índice

1. [Introducción](#introducción)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Fundamentos de Vue 3](#fundamentos-de-vue-3)
4. [Options API en profundidad](#options-api-en-profundidad)
5. [Componentes](#componentes)
6. [Directivas](#directivas)
7. [Gestión de Estado](#gestión-de-estado)
8. [Enrutamiento con Vue Router](#enrutamiento-con-vue-router)
9. [Comunicación con APIs](#comunicación-con-apis)
10. [Optimización y Rendimiento](#optimización-y-rendimiento)
11. [Testing](#testing)
12. [Despliegue](#despliegue)
13. [Patrones Avanzados](#patrones-avanzados)
14. [Integración con TypeScript](#integración-con-typescript)
15. [Proyectos Prácticos](#proyectos-prácticos)
16. [Recursos y Referencias](#recursos-y-referencias)

## Introducción

### ¿Qué es Vue.js?

Vue.js es un framework progresivo para construir interfaces de usuario. A diferencia de otros frameworks monolíticos, Vue está diseñado para ser adoptado incrementalmente. La biblioteca central se enfoca en la capa de vista, y es fácil de integrar con otras bibliotecas o proyectos existentes.

### Options API vs Composition API

Vue 3 ofrece dos estilos de API para definir componentes:

- **Options API**: Organiza la lógica del componente utilizando opciones como `data`, `methods` y `mounted`. Es más cercano al estilo de Vue 2 y más fácil de entender para quienes vienen de ese contexto.
  
- **Composition API**: Utiliza funciones importadas para definir componentes, con mayor flexibilidad para organizar y reutilizar código.

Esta guía se enfoca exclusivamente en la **Options API**, que sigue siendo completamente compatible y potente en Vue 3, y es ideal para:

- Desarrolladores que migran desde Vue 2
- Proyectos más pequeños y de mediana escala
- Equipos familiarizados con paradigmas orientados a objetos
- Quienes prefieren una estructura clara y predefinida

## Instalación y Configuración

### Requisitos Previos

- Node.js (versión 12.x o superior)
- npm o yarn
- Conocimientos básicos de HTML, CSS y JavaScript

### Métodos de Instalación

#### 1. CDN (para prototipado rápido)

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
  <h1>{{ mensaje }}</h1>
</div>

<script>
  const app = Vue.createApp({
    data() {
      return {
        mensaje: '¡Hola Vue 3!'
      }
    }
  })
  app.mount('#app')
</script>
```

#### 2. Vue CLI

```bash
# Instalar Vue CLI
npm install -g @vue/cli

# Crear un nuevo proyecto
vue create mi-proyecto-vue3

# Seleccionar Vue 3 y configuración manual
# Navegar al directorio del proyecto e iniciar el servidor
cd mi-proyecto-vue3
npm run serve
```

#### 3. Vite (Recomendado para desarrollo rápido)

```bash
# Crear proyecto con Vite
npm create vite@latest mi-app-vue -- --template vue

# Navegar al directorio e instalar dependencias
cd mi-app-vue
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Estructura de un Proyecto Vue

```
mi-proyecto-vue3/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── .gitignore
├── babel.config.js
├── package.json
└── README.md
```

## Fundamentos de Vue 3

### El Archivo main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
```

### Componente App.vue

```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/about">Acerca de</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### Sintaxis de Plantillas

```vue
<template>
  <div>
    <!-- Interpolación de texto -->
    <p>{{ mensaje }}</p>
    
    <!-- Enlace de atributos -->
    <img v-bind:src="imagenUrl" :alt="imagenAlt">
    
    <!-- Directivas condicionales -->
    <p v-if="mostrar">Este texto será visible si mostrar es true</p>
    <p v-else>Alternativa si mostrar es false</p>
    
    <!-- Ciclos -->
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.nombre }}
      </li>
    </ul>
    
    <!-- Eventos -->
    <button v-on:click="incrementar">Aumentar</button>
    <button @click="decrementar">Reducir</button>
    
    <!-- Formularios -->
    <input v-model="mensaje">
  </div>
</template>
```

## Options API en profundidad

### Estructura Básica de un Componente

```vue
<template>
  <!-- HTML del componente -->
</template>

<script>
export default {
  // Opciones del componente
  name: 'MiComponente',
  
  // Estado local del componente
  data() {
    return {
      contador: 0,
      mensaje: 'Hola Vue 3'
    }
  },
  
  // Propiedades recibidas
  props: {
    titulo: String,
    valor: {
      type: Number,
      required: true,
      default: 0,
      validator: value => value >= 0
    }
  },
  
  // Métodos
  methods: {
    incrementar() {
      this.contador++
    }
  },
  
  // Datos calculados (cacheados)
  computed: {
    contadorDoble() {
      return this.contador * 2
    }
  },
  
  // Observadores
  watch: {
    contador(nuevoValor, valorAnterior) {
      console.log(`Contador cambió de ${valorAnterior} a ${nuevoValor}`)
    }
  },
  
  // Hooks del ciclo de vida
  created() {
    console.log('Componente creado')
  },
  mounted() {
    console.log('Componente montado en el DOM')
  }
}
</script>

<style scoped>
/* Estilos aplicados solo a este componente */
</style>
```

### Opciones de Data y Estado

```javascript
export default {
  data() {
    return {
      // Datos primitivos
      contador: 0,
      mensaje: 'Hola',
      activo: true,
      
      // Arrays
      items: ['manzana', 'naranja', 'plátano'],
      
      // Objetos
      usuario: {
        nombre: 'Ana',
        edad: 28,
        email: 'ana@ejemplo.com'
      },
      
      // Datos anidados
      configuracion: {
        tema: {
          modo: 'claro',
          color: '#42b983'
        }
      }
    }
  }
}
```

### Methods (Métodos)

```javascript
export default {
  data() {
    return {
      contador: 0
    }
  },
  methods: {
    // Método básico
    incrementar() {
      this.contador++
    },
    
    // Método con parámetros
    incrementarPor(cantidad) {
      this.contador += cantidad
    },
    
    // Método con evento
    manejarClic(event) {
      console.log('Elemento clicado:', event.target)
      this.incrementar()
    },
    
    // Método asíncrono
    async cargarDatos() {
      try {
        const respuesta = await fetch('https://api.ejemplo.com/datos')
        const datos = await respuesta.json()
        this.datos = datos
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    },
    
    // Referencia a otros métodos
    reiniciarYCargar() {
      this.contador = 0
      this.cargarDatos()
    }
  }
}
```

### Computed Properties (Propiedades Computadas)

```javascript
export default {
  data() {
    return {
      productos: [
        { nombre: 'Laptop', precio: 1200, disponible: true },
        { nombre: 'Teléfono', precio: 800, disponible: false },
        { nombre: 'Tablet', precio: 400, disponible: true }
      ],
      busqueda: ''
    }
  },
  computed: {
    // Propiedad computada básica
    cantidadProductos() {
      return this.productos.length
    },
    
    // Propiedad computada con lógica
    productosDisponibles() {
      return this.productos.filter(p => p.disponible)
    },
    
    // Propiedad computada dependiente de múltiples fuentes
    productosFiltrados() {
      const termino = this.busqueda.toLowerCase()
      return this.productos.filter(p => 
        p.nombre.toLowerCase().includes(termino)
      )
    },
    
    // Propiedad computada con getter y setter
    precioTotal: {
      get() {
        return this.productos.reduce((total, p) => total + p.precio, 0)
      },
      set(nuevoTotal) {
        const factor = nuevoTotal / this.precioTotal
        this.productos.forEach(p => {
          p.precio = Math.round(p.precio * factor)
        })
      }
    }
  }
}
```

### Watchers (Observadores)

```javascript
export default {
  data() {
    return {
      usuario: {
        nombre: '',
        email: ''
      },
      mensaje: '',
      busqueda: '',
      resultados: null,
      timeoutId: null
    }
  },
  watch: {
    // Observador básico
    mensaje(nuevo, anterior) {
      console.log(`Mensaje cambió de "${anterior}" a "${nuevo}"`)
    },
    
    // Observador de propiedad anidada
    'usuario.email'(nuevo) {
      // Validar email
      this.emailValido = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(nuevo)
    },
    
    // Observador con opciones deep y immediate
    usuario: {
      handler(nuevo) {
        console.log('Usuario actualizado:', nuevo)
        localStorage.setItem('usuario', JSON.stringify(nuevo))
      },
      deep: true, // Detecta cambios en propiedades anidadas
      immediate: true // Se ejecuta inmediatamente al crear el componente
    },
    
    // Observador con debounce para búsquedas
    busqueda(nuevo) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(async () => {
        if (nuevo.length > 2) {
          const respuesta = await fetch(`/api/buscar?q=${nuevo}`)
          this.resultados = await respuesta.json()
        } else {
          this.resultados = null
        }
      }, 300)
    }
  }
}
```

### Ciclo de Vida del Componente

```javascript
export default {
  // Fase de inicialización
  beforeCreate() {
    console.log('beforeCreate: Las opciones del componente se han procesado, pero no data ni el DOM')
  },
  created() {
    console.log('created: El componente se ha creado, data reactiva inicializada, pero sin DOM')
    // Ideal para inicializar datos, API calls, etc.
  },
  
  // Fase de montaje
  beforeMount() {
    console.log('beforeMount: Justo antes de que el componente sea montado en el DOM')
  },
  mounted() {
    console.log('mounted: El componente ya está montado en el DOM')
    // Ideal para acceder al DOM, librerías externas, etc.
    this.$nextTick(() => {
      // Código ejecutado cuando todo el DOM está actualizado
    })
  },
  
  // Fase de actualización
  beforeUpdate() {
    console.log('beforeUpdate: Antes de actualizar el DOM debido a cambios de datos')
  },
  updated() {
    console.log('updated: Después de que el DOM se ha actualizado')
    // Ideal para operar en el DOM actualizado
  },
  
  // Fase de desmontaje
  beforeUnmount() {
    console.log('beforeUnmount: Justo antes de que el componente sea desmontado')
    // Ideal para limpieza (event listeners, timers, conexiones)
  },
  unmounted() {
    console.log('unmounted: El componente ha sido desmontado')
  },
  
  // Manejo de errores
  errorCaptured(error, instancia, info) {
    console.error('Error capturado:', error, instancia, info)
    // Devuelve false para detener la propagación del error
    return false
  }
}
```

## Componentes

### Registro Global vs Local

```javascript
// main.js - Registro global
import { createApp } from 'vue'
import App from './App.vue'
import BotonGlobal from './components/BotonGlobal.vue'

const app = createApp(App)
app.component('BotonGlobal', BotonGlobal)
app.mount('#app')

// Componente con registro local
export default {
  components: {
    BotonLocal: () => import('./components/BotonLocal.vue')
  }
}
```

### Comunicación entre Componentes

#### Props (Padre → Hijo)

```vue
<!-- Componente padre -->
<template>
  <div>
    <usuario-perfil 
      :nombre="usuario.nombre"
      :edad="usuario.edad"
      :activo="usuario.activo"
    />
  </div>
</template>

<!-- Componente hijo: UsuarioPerfil.vue -->
<template>
  <div>
    <h2>{{ nombre }}</h2>
    <p>Edad: {{ edad }}</p>
    <p>Estado: {{ estadoTexto }}</p>
  </div>
</template>

<script>
export default {
  props: {
    nombre: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      default: 0,
      validator: value => value >= 0
    },
    activo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    estadoTexto() {
      return this.activo ? 'Activo' : 'Inactivo'
    }
  }
}
</script>
```

#### Eventos (Hijo → Padre)

```vue
<!-- Componente hijo: BotonContador.vue -->
<template>
  <button @click="incrementar">
    Incrementar ({{ contadorInterno }})
  </button>
</template>

<script>
export default {
  data() {
    return {
      contadorInterno: 0
    }
  },
  methods: {
    incrementar() {
      this.contadorInterno++
      this.$emit('contador-cambiado', this.contadorInterno)
      
      // Emitir con múltiples argumentos
      this.$emit('detalles-contador', {
        valor: this.contadorInterno,
        timestamp: Date.now()
      })
    }
  }
}
</script>

<!-- Componente padre -->
<template>
  <div>
    <h2>Contador: {{ contador }}</h2>
    <boton-contador 
      @contador-cambiado="actualizarContador"
      @detalles-contador="mostrarDetalles"
    />
  </div>
</template>

<script>
import BotonContador from './BotonContador.vue'

export default {
  components: {
    BotonContador
  },
  data() {
    return {
      contador: 0,
      ultimoClickTimestamp: null
    }
  },
  methods: {
    actualizarContador(nuevoValor) {
      this.contador = nuevoValor
    },
    mostrarDetalles(detalles) {
      this.contador = detalles.valor
      this.ultimoClickTimestamp = detalles.timestamp
      console.log('Detalles del contador:', detalles)
    }
  }
}
</script>
```

#### Slots (Distribución de Contenido)

```vue
<!-- Componente contenedor: Card.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <!-- Slot con nombre -->
      <slot name="header">
        <!-- Contenido por defecto -->
        <h3>Título por defecto</h3>
      </slot>
    </div>
    
    <div class="card-body">
      <!-- Slot por defecto -->
      <slot>
        <p>No hay contenido proporcionado</p>
      </slot>
    </div>
    
    <div class="card-footer">
      <!-- Slot con nombre y scope -->
      <slot name="footer" :datos="{ autor: 'Juan', fecha: '2023-04-01' }">
        <small>© 2023</small>
      </slot>
    </div>
  </div>
</template>

<!-- Usando el componente Card -->
<template>
  <div>
    <card>
      <!-- Contenido para el slot header -->
      <template #header>
        <h2>Mi Artículo Especial</h2>
      </template>
      
      <!-- Contenido para el slot por defecto -->
      <p>Este es el contenido principal del artículo.</p>
      <img src="imagen.jpg" alt="Imagen del artículo">
      
      <!-- Contenido para el slot footer con scope -->
      <template #footer="{ datos }">
        <p>Autor: {{ datos.autor }}</p>
        <p>Publicado: {{ datos.fecha }}</p>
      </template>
    </card>
  </div>
</template>
```

### Componentes Dinámicos

```vue
<template>
  <div>
    <button 
      v-for="tab in tabs" 
      :key="tab"
      @click="currentTab = tab"
      :class="{ active: currentTab === tab }"
    >
      {{ tab }}
    </button>

    <!-- Componente dinámico -->
    <keep-alive>
      <component :is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import TabHome from './tabs/TabHome.vue'
import TabPosts from './tabs/TabPosts.vue'
import TabArchive from './tabs/TabArchive.vue'

export default {
  components: {
    TabHome,
    TabPosts,
    TabArchive
  },
  data() {
    return {
      currentTab: 'Home',
      tabs: ['Home', 'Posts', 'Archive']
    }
  },
  computed: {
    currentTabComponent() {
      return 'Tab' + this.currentTab
    }
  }
}
</script>
```

### Mixins y Composables (Reutilización de Código)

```javascript
// mixin.js - Reutilización con mixins
export const contadorMixin = {
  data() {
    return {
      contador: 0
    }
  },
  methods: {
    incrementar() {
      this.contador++
    },
    decrementar() {
      this.contador--
    }
  }
}

// En el componente
import { contadorMixin } from './mixins/contador'

export default {
  mixins: [contadorMixin],
  mounted() {
    console.log('Contador inicial:', this.contador)
  }
}
```

## Directivas

### Directivas Integradas

```vue
<template>
  <div>
    <!-- v-text: Actualiza el contenido de texto de un elemento -->
    <span v-text="mensaje"></span>
    
    <!-- v-html: Actualiza el innerHTML de un elemento (¡usar con precaución!) -->
    <div v-html="contenidoHTML"></div>
    
    <!-- v-show: Alterna la visibilidad CSS de un elemento -->
    <p v-show="mostrar">Este texto puede mostrarse u ocultarse</p>
    
    <!-- v-if, v-else-if, v-else: Renderizado condicional -->
    <div v-if="tipo === 'A'">Tipo A</div>
    <div v-else-if="tipo === 'B'">Tipo B</div>
    <div v-else>Otro tipo</div>
    
    <!-- v-for: Renderizado de listas -->
    <ul>
      <li v-for="(item, index) in lista" :key="item.id">
        {{ index + 1 }}. {{ item.nombre }}
      </li>
    </ul>
    
    <!-- v-on: Escucha eventos (abreviado como @) -->
    <button v-on:click="manejarClic">Clic Normal</button>
    <button @click.once="manejarClicUnico">Solo Un Clic</button>
    <input @keyup.enter="enviar">
    
    <!-- v-bind: Enlaza atributos o props (abreviado como :) -->
    <img v-bind:src="urlImagen" :alt="descripcion">
    <component :is="componenteActual"></component>
    
    <!-- v-model: Enlace bidireccional -->
    <input v-model="nombre">
    <input v-model.trim="nombreTrim">
    <input v-model.number="edad">
    <input v-model.lazy="comentario">
    
    <!-- v-pre: Salta la compilación para este elemento -->
    <span v-pre>{{ Esto no se compilará }}</span>
    
    <!-- v-once: Renderizado único (no reactivo) -->
    <h1 v-once>{{ tituloInicial }}</h1>
    
    <!-- v-memo: Memorización condicional (para mejorar rendimiento) -->
    <div v-memo="[itemA, itemB]">
      Contenido que solo se actualiza cuando itemA o itemB cambian
    </div>
  </div>
</template>
```

### Directivas Personalizadas

```javascript
// main.js - Directiva global
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// Componente - Directiva local
export default {
  directives: {
    color: {
      mounted(el, binding) {
        // binding.value = valor pasado a la directiva
        // binding.arg = argumento pasado a la directiva
        // binding.modifiers = modificadores como un objeto
        
        el.style.color = binding.value
        
        if (binding.modifiers.bold) {
          el.style.fontWeight = 'bold'
        }
        
        if (binding.arg === 'background') {
          el.style.backgroundColor = binding.value
        }
      },
      updated(el, binding) {
        el.style.color = binding.value
      }
    },
    
    longpress: {
      mounted(el, binding) {
        let tiempo = binding.arg || 1000
        
        const handler = () => {
          binding.value()
        }
        
        el.addEventListener('mousedown', () => {
          el._timeoutId = setTimeout(handler, tiempo)
        })
        
        el.addEventListener('mouseup', () => {
          clearTimeout(el._timeoutId)
        })
      },
      unmounted(el) {
        // Limpieza
        clearTimeout(el._timeoutId)
      }
    }
  }
}

// Uso en la plantilla
<template>
  <input v-focus>
  <p v-color="'red'">Texto rojo</p>
  <p v-color:background.bold="'yellow'">Texto negrita con fondo amarillo</p>
  <button v-longpress:2000="accionLongpress">Presionar por 2 segundos</button>
</template>
```

## Gestión de Estado

### Estado Local vs Global

```javascript
// Estado local (data en componente)
export default {
  data() {
    return {
      contadorLocal: 0
    }
  }
}

// Estado global con Vuex
import { createStore } from 'vuex'

export default createStore({
  state: {
    contador: 0,
    usuario: null
  },
  getters: {
    contadorDoble: state => state.contador * 2
  },
  mutations: {
    incrementar(state) {
      state.contador++
    },
    establecerUsuario(state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    incrementarAsync({ commit }) {
      setTimeout(() => {
        commit('incrementar')
      }, 1000)
    },
    async iniciarSesion({ commit }, credenciales) {
      try {
        const respuesta = await api.login(credenciales)
        commit('establecerUsuario', respuesta.data.usuario)
        return respuesta
      } catch (error) {
        console.error('Error de inicio de sesión:', error)
        throw error
      }
    }
  },
  modules: {
    // Módulos anidados para aplicaciones grandes
    productos: {
      namespaced: true,
      state: { /* ... */ },
      mutations: { /* ... */ },
      actions: { /* ... */ }
    }
  }
})
```

### Usar Vuex en Componentes

```vue
<template>
  <div>
    <p>Contador: {{ contador }}</p>
    <p>Doble: {{ contadorDoble }}</p>
    <button @click="incrementar">Incrementar Local</button>
    <button @click="incrementarVuex">Incrementar Vuex</button>
    <button @click="incrementarAsync">Incrementar Asíncrono</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      contadorLocal: 0
    }
  },
  computed: {
    // Método 1: Acceso directo al store
    contador() {
      return this.$store.state.contador
    },
    
    // Método 2: Usar mapState y mapGetters
    ...mapState(['contador', 'usuario']),
    ...mapGetters(['contadorDoble']),
    
    // Método 3: Con alias o namespace
    ...mapState({
      contadorAlias: 'contador',
      contadorPlusLocal: state => state.contador + this.contadorLocal
    }),
    
    // Con namespace de módulo
    ...mapState('productos', ['lista']),
    ...mapGetters('productos', ['totalProductos'])
  },
  methods: {
    // Método local
    incrementar() {
      this.contadorLocal++
    },
    
    // Método 1: Acceso directo al store
    incrementarVuex() {
      this.$store.commit('incrementar')
    },
    
    // Método 2: Usar mapMutations y mapActions
    ...mapMutations(['incrementar']),
    ...mapActions(['incrementarAsync']),
    
    // Con namespace de módulo
    ...mapActions('productos', ['cargarProductos'])
  }
}
</script>
```

## Enrutamiento con Vue Router

### Configuración Básica

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // Carga diferida para mejor rendimiento
    component: () => import('../views/About.vue')
  },
  {
    // Ruta con parámetros
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
    props: true, // Pasa parámetros de ruta como props
    // Meta datos para control de acceso
    meta: { requiresAuth: true }
  },
  {
    // Ruta anidada
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '', // Ruta por defecto
        name: 'Dashboard',
        component: () => import('../views/dashboard/Overview.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/dashboard/Profile.vue')
      }
    ]
  },
  {
    // Rutas con alias
    path: '/posts',
    alias: '/articles',
    component: () => import('../views/Posts.vue')
  },
  {
    // Ruta de redirección
    path: '/home',
    redirect: '/'
  },
  {
    // Ruta comodín para 404
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // Personalización del comportamiento del scroll
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

// Guardias de navegación global
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.state.usuario !== null
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
```

### Navegación en Componentes

```vue
<template>
  <div>
    <!-- Enlaces declarativos -->
    <router-link to="/">Inicio</router-link>
    <router-link :to="{ name: 'About' }">Acerca de</router-link>
    <router-link :to="{ name: 'User', params: { id: userId } }">
      Perfil de Usuario
    </router-link>
    <router-link :to="{ path: '/posts', query: { category: 'vue', sort: 'latest' } }">
      Posts de Vue
    </router-link>
    
    <!-- Estilos personalizados para enlace activo -->
    <router-link 
      to="/products" 
      v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
      <a 
        :href="href" 
        @click="navigate"
        :class="[
          isActive && 'active-link',
          isExactActive && 'exact-active-link'
        ]"
      >
        Productos
      </a>
    </router-link>
    
    <!-- Salida de la ruta actual -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Múltiples vistas (layout con sidebar) -->
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 123
    }
  },
  methods: {
    // Navegación programática
    irAInicio() {
      this.$router.push('/')
    },
    irAUsuario() {
      this.$router.push({ name: 'User', params: { id: this.userId } })
    },
    irAtras() {
      this.$router.go(-1)
    },
    reemplazarRuta() {
      // Reemplaza la entrada en el historial
      this.$router.replace({ path: '/dashboard' })
    }
  },
  computed: {
    // Acceder a la información de la ruta actual
    rutaActual() {
      return this.$route.path
    },
    parametroId() {
      return this.$route.params.id
    },
    categoriaConsulta() {
      return this.$route.query.category
    }
  },
  // Guardias de navegación a nivel de componente
  beforeRouteEnter(to, from, next) {
    // Este componente aún no se ha creado
    // No se puede acceder a `this`
    next(vm => {
      // `vm` es la instancia del componente
      vm.cargarDatos(to.params.id)
    })
  },
  beforeRouteUpdate(to, from, next) {
    // Este hook se llama cuando la ruta cambia pero el componente se reutiliza
    // Por ejemplo, ir de /user/1 a /user/2
    this.cargarDatos(to.params.id)
    next()
  },
  beforeRouteLeave(to, from, next) {
    // Llamado cuando se navega fuera de esta ruta
    // Útil para prevenir salidas accidentales
    if (this.formularioModificado && !confirm('¿Seguro que deseas salir? Los cambios no guardados se perderán.')) {
      next(false)
    } else {
      next()
    }
  }
}
</script>
```

### Rutas con Múltiples Vistas y Lazy Loading

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    components: {
      default: Home,
      sidebar: HomeSidebar,
      header: HomeHeader
    }
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    children: [
      {
        path: 'analytics',
        component: () => import(/* webpackChunkName: "analytics" */ '../views/dashboard/Analytics.vue'),
        // Prefetching de rutas importantes
        // Webpack cargará este chunk en segundo plano
        // para que la navegación sea instantánea cuando el usuario lo necesite
        meta: { prefetch: true }
      }
    ]
  }
]
```

## Comunicación con APIs

### Axios con Vue

```javascript
// Instalación: npm install axios

// services/api.js - Configuración centralizada
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://api.ejemplo.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Interceptores para manejo global de errores y autenticación
api.interceptors.request.use(
  config => {
    // Añadir token de autenticación si existe
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response || {}
    
    if (status === 401) {
      // Token expirado o inválido
      store.dispatch('cerrarSesion')
      router.push('/login')
    }
    
    return Promise.reject(error)
  }
)

// Métodos específicos de API
export default {
  // Usuarios
  obtenerUsuario(id) {
    return api.get(`/usuarios/${id}`)
  },
  actualizarUsuario(id, datos) {
    return api.put(`/usuarios/${id}`, datos)
  },
  
  // Productos
  obtenerProductos(params = {}) {
    return api.get('/productos', { params })
  },
  crearProducto(producto) {
    return api.post('/productos', producto)
  }
}
```

### Uso en Componentes

```vue
<template>
  <div>
    <div v-if="cargando">Cargando...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h2>Productos</h2>
      <ul>
        <li v-for="producto in productos" :key="producto.id">
          {{ producto.nombre }} - ${{ producto.precio }}
        </li>
      </ul>
      
      <form @submit.prevent="crearNuevoProducto">
        <input v-model="nuevoProducto.nombre" placeholder="Nombre">
        <input v-model.number="nuevoProducto.precio" type="number" placeholder="Precio">
        <button type="submit" :disabled="enviando">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  data() {
    return {
      productos: [],
      cargando: true,
      error: null,
      enviando: false,
      nuevoProducto: {
        nombre: '',
        precio: 0
      }
    }
  },
  created() {
    this.cargarProductos()
  },
  methods: {
    async cargarProductos() {
      this.cargando = true
      this.error = null
      
      try {
        const response = await api.obtenerProductos({
          categoria: this.$route.query.categoria,
          limite: 10
        })
        this.productos = response.data
      } catch (err) {
        this.error = err.response?.data?.mensaje || 'Error al cargar productos'
        console.error('Error al cargar productos:', err)
      } finally {
        this.cargando = false
      }
    },
    
    async crearNuevoProducto() {
      this.enviando = true
      
      try {
        const response = await api.crearProducto(this.nuevoProducto)
        this.productos.push(response.data)
        this.nuevoProducto = { nombre: '', precio: 0 }
        this.$toast.success('Producto creado exitosamente')
      } catch (err) {
        this.error = err.response?.data?.mensaje || 'Error al crear producto'
        this.$toast.error(this.error)
      } finally {
        this.enviando = false
      }
    }
  }
}
</script>
```

### Manejo de Estado Asíncrono con Vuex

```javascript
// store/modules/productos.js
import api from '@/services/api'

export default {
  namespaced: true,
  
  state: {
    lista: [],
    producto: null,
    cargando: false,
    error: null
  },
  
  getters: {
    productosFiltrados: (state) => (categoria) => {
      if (!categoria) return state.lista
      return state.lista.filter(p => p.categoria === categoria)
    }
  },
  
  mutations: {
    SET_CARGANDO(state, valor) {
      state.cargando = valor
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_PRODUCTOS(state, productos) {
      state.lista = productos
    },
    SET_PRODUCTO(state, producto) {
      state.producto = producto
    },
    ADD_PRODUCTO(state, producto) {
      state.lista.push(producto)
    },
    UPDATE_PRODUCTO(state, productoActualizado) {
      const index = state.lista.findIndex(p => p.id === productoActualizado.id)
      if (index !== -1) {
        state.lista.splice(index, 1, productoActualizado)
      }
    },
    DELETE_PRODUCTO(state, id) {
      state.lista = state.lista.filter(p => p.id !== id)
    }
  },
  
  actions: {
    async cargarProductos({ commit }, params = {}) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      
      try {
        const response = await api.obtenerProductos(params)
        commit('SET_PRODUCTOS', response.data)
        return response
      } catch (error) {
        commit('SET_ERROR', error.message || 'Error al cargar productos')
        throw error
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
    
    async cargarProducto({ commit }, id) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      
      try {
        const response = await api.obtenerProducto(id)
        commit('SET_PRODUCTO', response.data)
        return response
      } catch (error) {
        commit('SET_ERROR', error.message || `Error al cargar producto ${id}`)
        throw error
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
    
    async guardarProducto({ commit }, producto) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      
      try {
        let response
        
        if (producto.id) {
          // Actualizar producto existente
          response = await api.actualizarProducto(producto.id, producto)
          commit('UPDATE_PRODUCTO', response.data)
        } else {
          // Crear nuevo producto
          response = await api.crearProducto(producto)
          commit('ADD_PRODUCTO', response.data)
        }
        
        return response
      } catch (error) {
        commit('SET_ERROR', error.message || 'Error al guardar producto')
        throw error
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
    
    async eliminarProducto({ commit }, id) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      
      try {
        await api.eliminarProducto(id)
        commit('DELETE_PRODUCTO', id)
      } catch (error) {
        commit('SET_ERROR', error.message || `Error al eliminar producto ${id}`)
        throw error
      } finally {
        commit('SET_CARGANDO', false)
      }
    }
  }
}
```

## Optimización y Rendimiento

### Lazy Loading de Componentes

```javascript
// Lazy loading de componentes de ruta
const routes = [
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue')
  }
]

// Lazy loading de componentes locales
export default {
  components: {
    // Simple
    ComponentePesado: () => import('@/components/ComponentePesado.vue'),
    
    // Con comentario mágico para webpack (nombre personalizado del chunk)
    Grafico: () => import(/* webpackChunkName: "chart" */ '@/components/Grafico.vue'),
    
    // Con manejo de estado de carga
    GaleriaImagenes: () => ({
      component: import('@/components/GaleriaImagenes.vue'),
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 200,    // Espera antes de mostrar el componente de carga
      timeout: 10000 // Tiempo máximo de carga
    })
  }
}
```

### keep-alive para Caché de Componentes

```vue
<template>
  <div>
    <!-- Botones para cambiar entre pestañas -->
    <button 
      v-for="tab in tabs" 
      :key="tab.name" 
      @click="currentTab = tab.name"
    >
      {{ tab.label }}
    </button>
    
    <!-- keep-alive con componentes dinámicos -->
    <keep-alive>
      <component :is="currentTabComponent"></component>
    </keep-alive>
    
    <!-- keep-alive con rutas -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="['Home', 'About']" :exclude="['Dashboard']" :max="10">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'Home',
      tabs: [
        { name: 'Home', label: 'Inicio' },
        { name: 'Posts', label: 'Publicaciones' },
        { name: 'Settings', label: 'Configuración' }
      ]
    }
  },
  computed: {
    currentTabComponent() {
      return this.currentTab
    }
  }
}
</script>
```

### Optimización de Re-renderizado

```vue
<template>
  <div>
    <!-- Lista optimizada con v-memo -->
    <div v-for="item in largeList" :key="item.id" v-memo="[item.isComplete]">
      <ExpensiveComponent :data="item" />
    </div>
    
    <!-- Lista con componentes optimizados -->
    <div v-for="item in largeList" :key="item.id">
      <ListItem :data="item" />
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  components: {
    ListItem
  },
  data() {
    return {
      largeList: Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        isComplete: i % 3 === 0
      }))
    }
  }
}
</script>

<!-- ListItem.vue - Con optimizaciones -->
<script>
export default {
  name: 'ListItem',
  props: {
    data: Object
  },
  // Para prevenir re-renderizados cuando el padre actualiza
  // pero las props no han cambiado
  memo: true,
  computed: {
    formattedName() {
      return this.data.name.toUpperCase()
    }
  }
}
</script>
```

### Uso de Virtual Scrolling

```vue
<template>
  <div>
    <!-- Puede usar bibliotecas como vue-virtual-scroller para listas grandes -->
    <virtual-scroller
      :items="longList"
      :item-height="50"
      v-slot="{ item, index }"
    >
      <div class="list-item">
        {{ index }} - {{ item.name }}
      </div>
    </virtual-scroller>
  </div>
</template>

<script>
import { VirtualScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
  components: {
    VirtualScroller
  },
  data() {
    return {
      // Lista con miles de elementos
      longList: Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`
      }))
    }
  }
}
</script>
```

## Testing

### Configuración de Jest para Vue 3

```javascript
// jest.config.js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue: 'vue-jest'
  },
  testMatch: [
    '**/tests/unit/**/*.spec.[jt]s?(x)',
    '**/__tests__/*.[jt]s?(x)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}
```

### Testing de Componentes con Vue Test Utils

```javascript
// tests/unit/MiComponente.spec.js
import { mount, shallowMount } from '@vue/test-utils'
import MiComponente from '@/components/MiComponente.vue'

describe('MiComponente.vue', () => {
  // Test básico de renderizado
  it('se renderiza correctamente', () => {
    const wrapper = shallowMount(MiComponente)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Mi Componente')
  })
  
  // Test con props
  it('renderiza props correctamente', () => {
    const titulo = 'Título Personalizado'
    const wrapper = shallowMount(MiComponente, {
      props: { titulo }
    })
    expect(wrapper.find('h1').text()).toBe(titulo)
  })
  
  // Test de eventos
  it('emite evento cuando se hace clic', async () => {
    const wrapper = shallowMount(MiComponente)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted().click[0]).toEqual([])
  })
  
  // Test con datos
  it('incrementa contador al hacer clic', async () => {
    const wrapper = shallowMount(MiComponente)
    expect(wrapper.vm.contador).toBe(0)
    await wrapper.find('#btn-incrementar').trigger('click')
    expect(wrapper.vm.contador).toBe(1)
    expect(wrapper.find('#contador').text()).toBe('Contador: 1')
  })
  
  // Test de slots
  it('renderiza el slot correctamente', () => {
    const wrapper = shallowMount(MiComponente, {
      slots: {
        default: '<p>Contenido del slot</p>',
        header: '<h2>Encabezado</h2>'
      }
    })
    expect(wrapper.find('.slot-default').html()).toContain('Contenido del slot')
    expect(wrapper.find('.slot-header').html()).toContain('Encabezado')
  })
  
  // Test con mocks
  it('llama al método correcto al enviar formulario', async () => {
    const mockMetodo = jest.fn()
    const wrapper = mount(MiComponente, {
      methods: {
        enviarFormulario: mockMetodo
      }
    })
    
    await wrapper.find('form').trigger('submit.prevent')
    expect(mockMetodo).toHaveBeenCalled()
  })
  
  // Test con $store y $route
  it('interactúa correctamente con Vuex y Vue Router', () => {
    const $store = {
      state: {
        usuario: { nombre: 'Juan' }
      },
      dispatch: jest.fn()
    }
    
    const $route = {
      params: { id: '123' }
    }
    
    const wrapper = shallowMount(MiComponente, {
      global: {
        mocks: {
          $store,
          $route
        }
      }
    })
    
    wrapper.vm.cargarUsuario()
    expect($store.dispatch).toHaveBeenCalledWith('cargarUsuario', '123')
  })
})
```

### Testing E2E con Cypress

```javascript
// cypress/integration/login.spec.js
describe('Página de Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  
  it('muestra el formulario de login', () => {
    cy.get('h1').should('contain', 'Iniciar Sesión')
    cy.get('form').should('be.visible')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Entrar')
  })
  
  it('valida campos requeridos', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error-message').should('be.visible')
    cy.get('.error-message').should('contain', 'Email es requerido')
  })
  
  it('muestra error con credenciales incorrectas', () => {
    cy.get('input[type="email"]').type('usuario@ejemplo.com')
    cy.get('input[type="password"]').type('contraseña_incorrecta')
    cy.get('button[type="submit"]').click()
    
    cy.get('.alert-error').should('be.visible')
    cy.get('.alert-error').should('contain', 'Credenciales inválidas')
  })
  
  it('inicia sesión exitosamente', () => {
    // Intercept API call
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        usuario: {
          id: 1,
          nombre: 'Usuario Test',
          email: 'usuario@ejemplo.com'
        }
      }
    }).as('loginRequest')
    
    cy.get('input[type="email"]').type('usuario@ejemplo.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    cy.wait('@loginRequest')
    cy.url().should('include', '/dashboard')
    cy.get('.user-welcome').should('contain', 'Bienvenido, Usuario Test')
  })
})
```

## Despliegue

### Configuración de Producción

```javascript
// vue.config.js
module.exports = {
  // Output Directory
  outputDir: 'dist',
  
  // Asset Directory
  assetsDir: 'assets',
  
  // Relative Paths (para despliegues en subdirectorios)
  publicPath: process.env.NODE_ENV === 'production' ? '/mi-app/' : '/',
  
  // Configuración de webpack para producción
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // Eliminar console.log en producción
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    }
  },
  
  // Optimización de CSS
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false
  },
  
  // Configuración del servidor de desarrollo
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  
  // Variables de entorno
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        './src/styles/variables.scss',
        './src/styles/mixins.scss'
      ]
    }
  }
}
```

### Scripts de Despliegue

```json
// package.json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build:staging": "vue-cli-service build --mode staging",
    "test": "vue-cli-service test:unit",
    "lint": "vue-cli-service lint",
    "analyze": "vue-cli-service build --report",
    "deploy:firebase": "npm run build && firebase deploy",
    "deploy:netlify": "npm run build && netlify deploy --prod"
  }
}
```

### Estrategias Multi-entorno

```javascript
// Archivos .env
// .env                # cargado en todos los casos
// .env.local          # cargado en todos los casos, git ignorado
// .env.[mode]         # solo cargado en el modo especificado
// .env.[mode].local   # solo cargado en el modo especificado, git ignorado

// .env.development
VUE_APP_API_URL=http://localhost:3000/api
VUE_APP_DEBUG=true

// .env.staging
VUE_APP_API_URL=https://staging-api.ejemplo.com
VUE_APP_DEBUG=true

// .env.production
VUE_APP_API_URL=https://api.ejemplo.com
VUE_APP_DEBUG=false

// Uso en el código
if (process.env.VUE_APP_DEBUG === 'true') {
  console.log('Modo debug activado')
}

const apiUrl = process.env.VUE_APP_API_URL
```

## Patrones Avanzados

### Plugins Personalizados

```javascript
// plugins/toast.js
import ToastComponent from '@/components/Toast.vue'

export default {
  install: (app, options = {}) => {
    // Crear un componente de alerta toast
    const ToastConstructor = app.extend(ToastComponent)
    const toast = new ToastConstructor()
    
    // Montar componente en el DOM
    toast.$mount()
    document.body.appendChild(toast.$el)
    
    // Añadir métodos globales
    app.config.globalProperties.$toast = {
      show(message, type = 'default') {
        toast.show(message, type)
      },
      success(message) {
        toast.show(message, 'success')
      },
      error(message) {
        toast.show(message, 'error')
      },
      info(message) {
        toast.show(message, 'info')
      }
    }
    
    // Añadir directiva personalizada
    app.directive('auto-toast', {
      mounted(el, binding) {
        el.addEventListener('click', () => {
          const message = binding.value || 'Acción completada'
          const type = binding.arg || 'default'
          toast.show(message, type)
        })
      },
      unmounted(el) {
        el.removeEventListener('click')
      }
    })
  }
}

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import ToastPlugin from './plugins/toast'

const app = createApp(App)
app.use(ToastPlugin, { /* opciones */ })
app.mount('#app')

// Uso en componentes
export default {
  methods: {
    mostrarMensaje() {
      this.$toast.success('¡Operación exitosa!')
    }
  }
}
```

### HOC (Componentes de Orden Superior)

```javascript
// hocs/withAuth.js
export default function withAuth(component) {
  return {
    ...component,
    beforeRouteEnter(to, from, next) {
      const isAuthenticated = localStorage.getItem('token') !== null
      
      if (!isAuthenticated) {
        next('/login')
      } else {
        next()
      }
    }
  }
}

// Uso en un componente
import withAuth from '@/hocs/withAuth'

const ProfileComponent = {
  name: 'Profile',
  // Implementación del componente...
}

export default withAuth(ProfileComponent)
```

### Mixins Reutilizables

```javascript
// mixins/formValidation.js
export const formValidationMixin = {
  data() {
    return {
      errors: {},
      formSubmitted: false
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    validateRequired(value) {
      return !!value && (typeof value === 'string' ? value.trim().length > 0 : true)
    },
    validateMinLength(value, length) {
      return value && value.length >= length
    },
    validateForm() {
      this.errors = {}
      this.formSubmitted = true
      
      // Las implementaciones específicas de la validación se realizan en el componente que usa el mixin
      
      return Object.keys(this.errors).length === 0
    },
    resetForm() {
      this.errors = {}
      this.formSubmitted = false
      // Los campos específicos se resetean en el componente
    }
  }
}

// Uso en un componente
import { formValidationMixin } from '@/mixins/formValidation'

export default {
  mixins: [formValidationMixin],
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    validateForm() {
      // Llamamos al método del mixin primero para resetear los errores
      formValidationMixin.methods.validateForm.call(this)
      
      // Validaciones específicas de este formulario
      if (!this.validateRequired(this.form.name)) {
        this.errors.name = 'El nombre es requerido'
      }
      
      if (!this.validateRequired(this.form.email)) {
        this.errors.email = 'El email es requerido'
      } else if (!this.validateEmail(this.form.email)) {
        this.errors.email = 'El email no es válido'
      }
      
      if (!this.validateRequired(this.form.password)) {
        this.errors.password = 'La contraseña es requerida'
      } else if (!this.validateMinLength(this.form.password, 8)) {
        this.errors.password = 'La contraseña debe tener al menos 8 caracteres'
      }
      
      return Object.keys(this.errors).length === 0
    },
    submitForm() {
      if (this.validateForm()) {
        // Procesar formulario...
      }
    }
  }
}
```

### Providers/Injectors (Alternativa a Prop Drilling)

```vue
<!-- ComponenteRaíz.vue -->
<template>
  <div>
    <h1>{{ tema.titulo }}</h1>
    <ComponenteIntermedio />
  </div>
</template>

<script>
import ComponenteIntermedio from './ComponenteIntermedio.vue'

export default {
  components: {
    ComponenteIntermedio
  },
  data() {
    return {
      tema: {
        titulo: 'Mi App',
        colorPrimario: '#42b983',
        colorSecundario: '#35495e'
      }
    }
  },
  provide() {
    return {
      tema: this.tema,
      // Para hacer reactivo un objeto proporcionado
      temaReactivo: Vue.computed(() => this.tema)
    }
  }
}
</script>

<!-- ComponenteIntermedio.vue -->
<template>
  <div>
    <ComponenteProfundo />
  </div>
</template>

<script>
import ComponenteProfundo from './ComponenteProfundo.vue'

export default {
  components: {
    ComponenteProfundo
  }
}
</script>

<!-- ComponenteProfundo.vue -->
<template>
  <div :style="{ color: temaReactivo.colorPrimario }">
    <h3>Componente Profundo</h3>
    <p>Usando el tema inyectado</p>
  </div>
</template>

<script>
export default {
  inject: ['tema', 'temaReactivo']
}
</script>
```

## Integración con TypeScript

### Configuración del Proyecto

```bash
# Crear un nuevo proyecto Vue 3 con TypeScript
vue create mi-proyecto-typescript
# Seleccionar manualmente las características
# Asegurarse de seleccionar TypeScript

# Agregar Vue Class Component a un proyecto existente
npm install vue-class-component@next
```

### Componentes con Options API y TypeScript

```typescript
// components/MiComponente.vue
<template>
  <div>
    <h1>{{ titulo }}</h1>
    <p>Contador: {{ contador }}</p>
    <button @click="incrementar">Incrementar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

// Definir interfaces o types
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

export default defineComponent({
  name: 'MiComponente',
  
  props: {
    titulo: {
      type: String,
      required: true
    },
    usuario: {
      type: Object as PropType<Usuario>,
      required: false,
      default: null
    },
    opciones: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  
  data() {
    return {
      contador: 0,
      mensaje: 'Hola TypeScript',
      usuarioActual: null as Usuario | null
    }
  },
  
  methods: {
    incrementar(): void {
      this.contador++
    },
    
    procesarUsuario(usuario: Usuario): string {
      return `${usuario.nombre} (${usuario.email})`
    },
    
    // Con parámetros opcionales y genéricos
    filtrarItems<T>(items: T[], filtro?: (item: T) => boolean): T[] {
      return filtro ? items.filter(filtro) : items
    }
  },
  
  computed: {
    contadorDoble(): number {
      return this.contador * 2
    },
    
    // Computed property con type
    usuarioFormateado(): string | null {
      return this.usuarioActual ? this.procesarUsuario(this.usuarioActual) : null
    }
  }
})
</script>
```

### Definición de Store con TypeScript

```typescript
// store/index.ts
import { createStore } from 'vuex'

// Definir tipos de estado
interface RootState {
  contador: number;
  usuario: Usuario | null;
  productos: Producto[];
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

export default createStore<RootState>({
  state: {
    contador: 0,
    usuario: null,
    productos: []
  },
  
  getters: {
    contadorDoble(state): number {
      return state.contador * 2
    },
    
    productosEnStock(state): Producto[] {
      return state.productos.filter(p => p.stock > 0)
    },
    
    // Getter con parámetros
    productosPorPrecio: (state) => (precioMax: number): Producto[] => {
      return state.productos.filter(p => p.precio <= precioMax)
    }
  },
  
  mutations: {
    incrementarContador(state): void {
      state.contador++
    },
    
    establecerUsuario(state, usuario: Usuario | null): void {
      state.usuario = usuario
    },
    
    agregarProducto(state, producto: Producto): void {
      state.productos.push(producto)
    }
  },
  
  actions: {
    async cargarUsuario({ commit }, id: number): Promise<void> {
      try {
        const response = await fetch(`/api/usuarios/${id}`)
        const usuario = await response.json()
        commit('establecerUsuario', usuario)
      } catch (error) {
        console.error('Error al cargar usuario:', error)
        commit('establecerUsuario', null)
      }
    }
  }
})
```

### Definición de Router con TypeScript

```typescript
// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

// Definir la meta información
interface RouteMeta {
  requiresAuth: boolean;
  title: string;
  transition?: string;
}

// Ampliar la definición de ruta para incluir nuestra meta
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {}
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      title: 'Inicio'
    }
  },
  {
    path: '/profile/:id',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Perfil de Usuario',
      transition: 'slide'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Tipar los guards
router.beforeEach((to, from, next) => {
  // Acceder a la meta información con seguridad de tipos
  document.title = to.meta.title as string || 'My App'
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('token') !== null
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

## Proyectos Prácticos

Aquí encontrarás ideas de proyectos que pueden ayudarte a aplicar los conocimientos adquiridos:

### Proyecto 1: Gestor de Tareas (Todo App)

**Características:**
- CRUD completo de tareas
- Filtros por estado (Completas, Pendientes, Todas)
- Persistencia con localStorage
- Drag and drop para ordenar tareas

**Conceptos aplicados:**
- Componentes básicos
- Eventos y prop drilling
- Directivas personalizadas
- Vue Router para filtros

### Proyecto 2: Tienda en Línea

**Características:**
- Listado de productos con filtros
- Carrito de compras
- Proceso de checkout
- Autenticación de usuarios
- Historial de pedidos

**Conceptos aplicados:**
- Vuex para gestión de estado
- Componentes dinámicos
- API REST
- Rutas protegidas
- Formularios complejos

### Proyecto 3: Dashboard Administrativo

**Características:**
- Paneles de estadísticas
- Gráficos interactivos
- Gestión de usuarios
- CRUD de entidades (productos, artículos, etc.)
- Roles y permisos

**Conceptos aplicados:**
- Integración con bibliotecas gráficas
- Lazy loading de rutas y componentes
- Formularios con validación
- Optimización de rendimiento
- TypeScript

### Proyecto 4: Aplicación de Notas

**Características:**
- Editor WYSIWYG
- Etiquetas y categorización
- Búsqueda y filtros
- Sincronización con backend
- Modo offline

**Conceptos aplicados:**
- Integración de editores ricos
- Almacenamiento IndexedDB
- Service Workers
- Estado complejo

## Recursos y Referencias

### Documentación Oficial
- [Documentación de Vue 3](https://vuejs.org/)
- [Guía de Migración de Vue 2 a Vue 3](https://v3-migration.vuejs.org/)
- [Vue Router 4](https://router.vuejs.org/)
- [Vuex 4](https://vuex.vuejs.org/)

### Herramientas
- [Vue DevTools](https://devtools.vuejs.org/)
- [Volar (VSCode Extension)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Vue CLI](https://cli.vuejs.org/)
- [Vite](https://vitejs.dev/)

### Bibliotecas Complementarias
- [Pinia](https://pinia.vuejs.org/) - Alternativa a Vuex
- [VueUse](https://vueuse.org/) - Colección de composables
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Nuxt.js](https://nuxtjs.org/) - Framework para aplicaciones universales

### Ejemplos y Plantillas
- [Vue Awesome](https://github.com/vuejs/awesome-vue)
- [Vue Templates](https://vuejsexamples.com/)

### Cursos Recomendados
- "Vue.js 3: The Complete Guide" por Maximilian Schwarzmüller
- "Vue 3 Mastery" en Vue Mastery
- "Learn Vue 3 Step by Step" en Laracasts

---

## Conclusión

Este README cubre los conceptos fundamentales y avanzados de Vue 3 utilizando la Options API. Desde los conceptos básicos hasta patrones avanzados, esta guía te proporciona una hoja de ruta para convertirte en un experto en Vue 3.

Recuerda que la práctica constante es la clave. Combina el estudio teórico con proyectos prácticos para consolidar tus conocimientos.

¡Feliz codificación con Vue 3!