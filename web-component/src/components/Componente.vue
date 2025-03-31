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
h1 {
  color: blue;
}
</style>