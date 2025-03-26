<template>
    <div class="buttons">
        <button v-for="(item, itemIndex) in botones" :key="itemIndex" class="buttons__button" @click="setAction(item)">

            <span class="buttons__button__tooltip">{{ item.nombre === 'boton1' ? tooltipText : item.tooltip }}</span>
            <img :src="item.nombre === 'boton1'
                ? (isOpen ?  backIcon : closeIcon)
                : item.img" :alt="item.nombre" class="buttons__button__icon">
        </button>
    </div>
</template>
<script>
export default {
    name: 'ButtonsComponent',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            botones: [
                {
                    nombre: 'boton1',
                    accion: 'accion1',
                    img: '/assets/icons/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg',
                    
                },
                {
                    nombre: 'boton2',
                    accion: 'accion3',
                    img: new URL('@/assets/icons/logout_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg', import.meta.url).href,
                    tooltip: 'Logout'
                },
                {
                    nombre: 'boton3',
                    accion: 'accion4',
                    img: new URL('@/assets/icons/settings_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg', import.meta.url).href,
                    tooltip: 'Settings'
                },
                {
                    nombre: 'boton4',
                    accion: 'accion5',
                    img: new URL('@/assets/icons/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg', import.meta.url).href,
                    tooltip: 'Menu'

                }
            ]
        };
    },
    methods: {
        setAction(button) {
            if (button.nombre === 'boton1') {
                this.$emit('menuOpen', !this.isOpen);
            }
        }
    },
    computed: {
        closeIcon() {
            return new URL('@/assets/icons/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg', import.meta.url).href;
        },
        backIcon() {
            return new URL('@/assets/icons/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg', import.meta.url).href;
        },
        tooltipText(){
            return this.isOpen ? 'Close Menu' : 'Back'
        }
    }
};
</script>

<style lang="scss">
.buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 100vh;
    padding-right: 10px;
    padding-bottom: 50px;

    &__button {
        background-color: black;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &:hover {
            background-color: rgb(0, 0, 0);
        }

        &:nth-child(1) {
            margin-top: 350px;
            margin-bottom: auto;
        }

        &:nth-child(n+2) {
            margin-top: 0;
            margin-bottom: 10px;
        }

        &__icon {
            width: 20px;
            height: 20px;
        }

        &__tooltip {
            position: absolute;
            top: 55%;
            right: 130%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 40px;
            font-size: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease-in-out;
            white-space: nowrap;

            .buttons__button:hover & {
                opacity: 1;
            }
        }
    }
}
</style>
