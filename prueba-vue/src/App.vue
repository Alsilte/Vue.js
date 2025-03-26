<template>
  <div class="app">
    <Header class="app__header" />
    <div class="app__main">
      <Content class="app__main__content" :class="{ 'cerrado': isOpen }" />
      <Menu class="app__main__menu" :class="{ 'cerrado': isOpen }" />
      <Buttons 
        class="app__main__buttons"  
        :class="{ 'cerrado': isOpen }" 
        @menuOpen="setOpenMenu"
        :isOpen="isOpen" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import Buttons from './components/Buttons.vue';
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  data() {
    return {
      isOpen: true,
    };
  },

  components: {
    Header,
    Content,
    Menu,
    Buttons
  },

  methods: {
    cerrarMenu() {
      console.log('Estado anterior:', this.isOpen);
      this.isOpen = !this.isOpen;
      console.log('Nuevo estado:', this.isOpen);
    },
    setOpenMenu(bool){
      this.isOpen = bool
    }
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100dvw;
  color: black;

  &__header {
    margin-left: 10px;
    position: absolute;
    z-index: 1;

  }

  &__main {
    display: flex;
    flex-direction: row;
    height: 100vh;
    position: relative;
    overflow: hidden;

    &__content {
      width: calc(100vw - 350px);
      background-color: burlywood;
      color: black;
      transition: 0.35s ease-in-out width;
      -webkit-transition: 0.35s ease-in-out width;
      -moz-transition: 0.35s ease-in-out width;
      -ms-transition: 0.35s ease-in-out width;
      -o-transition: 0.35s ease-in-out width;

      &.cerrado {
        width: 100vw;
        transition: 0.35s ease-in-out width;
        -webkit-transition: 0.35s ease-in-out width;
        -moz-transition: 0.35s ease-in-out width;
        -ms-transition: 0.35s ease-in-out width;
        -o-transition: 0.35s ease-in-out width;
      }
    }

    &__menu {
      width: 450px;
      background-color: rgb(211, 210, 210);
      color: black;
      overflow: hidden;
      position: absolute;
      right: 0;
      margin-right: 0;
      top: 0;
      height: 100%;
      transition: 0.35s ease-in-out margin-right;
      -webkit-transition: 0.35s ease-in-out margin-right;
      -moz-transition: 0.35s ease-in-out margin-right;
      -ms-transition: 0.35s ease-in-out margin-right;
      -o-transition: 0.35s ease-in-out margin-right;

      &.cerrado {
        margin-right: -450px;
        overflow: hidden;
        transition: 0.35s ease-in-out margin-right;
        -webkit-transition: 0.35s ease-in-out margin-right;
        -moz-transition: 0.35s ease-in-out margin-right;
        -ms-transition: 0.35s ease-in-out margin-right;
        -o-transition: 0.35s ease-in-out margin-right;
      }
    }

    &__buttons {
      position: absolute;
      right: 450px;
      top: 0;
      width: 10%;
      height: 100%;
      color: black;
      z-index: 10;
      transition: 0.35s ease-in-out right;
      -webkit-transition: 0.35s ease-in-out right;
      -moz-transition: 0.35s ease-in-out right;
      -ms-transition: 0.35s ease-in-out right;
      -o-transition: 0.35s ease-in-out right;

      &.cerrado {
        right: 0;
        transition: 0.35s ease-in-out right;
        -webkit-transition: 0.35s ease-in-out right;
        -moz-transition: 0.35s ease-in-out right;
        -ms-transition: 0.35s ease-in-out right;
        -o-transition: 0.35s ease-in-out right;
      }

    }
  }
}
</style>