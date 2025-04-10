<script>

export default {
  data() {
    return {
      selectedMaterial: null,
      materialOptions: [
                { value: 'todos', label: 'Todos' },
                { value: 'unicolores', label: 'Unicolores' },
                { value: 'maderas', label: 'Maderas' },
                { value: 'piedras', label: 'Piedras' },
                { value: 'metales', label: 'Metales' },
            ]
    };
  },
}
</script>

<template>

  <div class="app">
    <Button variant="primary">Click me</Button>
    <Button variant="danger">Click me</Button>

    <Tarjeta title="Tarjeta de ejemplo" subtitle="Subtítulo opcional" variant="secondary" shadow hover>
      <p>Este es el contenido principal de la tarjeta.</p>

      <template #footer>
        <div class="Tarjeta-actions">
          <Button variant="green">Aceptar</Button>
          <Button variant="green">Cancelar</Button>
        </div>
      </template>
    </Tarjeta>
    <SelectDiv v-model="selectedMaterial" :options="materialOptions" placeholder="Seleccionar material" />
  </div>
</template>

<style scoped>

.app {
  display: flex;
  flex-direction: column;
  background-color: rgb(219, 214, 214);
  gap: 10px;
  height: 100dvh;

  align-items: center;

  Button {
    max-width: 100px;
  }
}
</style>
