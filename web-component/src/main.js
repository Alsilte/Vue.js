import './assets/main.css'
import Componente from './components/Componente.vue'

import { createApp, defineCustomElement } from 'vue'
import App from './App.vue'

// Monta la aplicación principal Vue (App.vue)
createApp(App).mount('#app')

// Define y registra el web component (Componente.vue)
const MiWebComponent = defineCustomElement(Componente);
customElements.define('mi-web-component', MiWebComponent);