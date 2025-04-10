// main.js o main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Importa los componentes individualmente
import { Button, Card } from 'vue3-libreria'

const app = createApp(App)

// Registra los componentes individualmente
app.component('Button', Boton)
app.component('Card', Tarjeta)

app.mount('#app')
