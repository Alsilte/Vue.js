<template>
    <div class="header">
        <img :src="logo" alt="Logo" class="header__logo">
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {
            logo: new URL('@/assets/img/logo.png', import.meta.url).href
        };
    }
};
</script>

<style lang="scss">
.header {
    &__logo {

        width: 100px;
        height: auto;
    }
}
</style>
