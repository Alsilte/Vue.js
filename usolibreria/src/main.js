// main.js o main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Importa los componentes de la librería
import { Button, Card, Input, Select, SelectDiv } from 'componentes'
// Importa los estilos de la librería usando la ruta definida en exports
import 'componentes/style.css'

const app = createApp(App)

app.component('Button', Button)
app.component('Tarjeta', Card)
app.component('Input', Input)
app.component('Select', Select)
app.component('SelectDiv', SelectDiv)

app.mount('#app')
