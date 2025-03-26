<template>
    <div class="menu">

        <div class="menu__tabs">
            <button v-for="(tab, index) in tabs" 
                :key="index" 
                @click="activeTab = tab.name"
                :class="{ 'active': activeTab === tab.name }" class="menu__tab-button">
                {{ tab.label }}
            </button>
        </div>
        <div class="menu__content">
            <div v-if="activeTab === 'ambientes'" class="menu__ambientes">
                <div class="menu__ambientes__galeria">
                    <div v-for="(item, itemIndex) in img" :key="itemIndex" class="menu__ambientes__item">
                        <img :src="item.img" :alt="item.name">
                    </div>
                </div>
                <div class="menu__ambientes__separator"></div>
                <div class="menu__ambientes__360">
                    <img :src="tresSesenta" alt="360 View">
                </div>
            </div>

            <div v-if="activeTab === 'resumen'" class="menu__resumen">
            </div>

            <div v-if="activeTab === 'materiales'" class="menu__materiales">
                <div class="materiales">
                    <div class="menu__applicaciones">
                        <p>Aplicaciones</p>
                        <div class="menu__applicaciones__botones">
                            <button>Encimera</button>
                            <button>Panel</button>
                            <button>Murete</button>
                        </div>
                    </div>
                    <div class="menu__design">
                        <p>DISEÑO APLICADO</p>
                    </div>
                    <hr class="menu__separator">
                    <div class="menu__search">
                        <input type="search" class="input" placeholder="Buscar">
                    </div>
                    <div class="menu__filter">
                        <div class="menu__filter__select">
                            <p>Materiales
                                <select name="select">
                                    <option value="value1">Value 1</option>
                                    <option value="value2" selected>Sup. decorativas</option>
                                    <option value="value3">Value 3</option>
                                </select>
                            </p>
                            <p>Efectos
                                <select name="select">
                                    <option value="value1">Value 1</option>
                                    <option value="value2" selected>Maderas</option>
                                    <option value="value3">Value 3</option>
                                </select>
                            </p>
                            <p>Gama
                                <select name="select">
                                    <option value="value1">Value 1</option>
                                    <option value="value2" selected>Duo</option>
                                    <option value="value3">Value 3</option>
                                </select>
                            </p>
                        </div>
                        <div class="menu__filter__data">
                            <img :src="syncIcon" alt="Sync Icon">
                            <button>Ver todos  |</button>
                            
                            <button>{{ disponibles }} diseños disponibles</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    name: 'MenuComponent',
    data() {
        return {
            activeTab: 'ambientes',
            tabs: [
                { name: 'ambientes', label: 'AMBIENTES' },
                { name: 'materiales', label: 'MATERIALES' },
                { name: 'resumen', label: 'RESUMEN' },

            ],

            img: [
                { name: 'img1', img: new URL('@/assets/img/num1.png', import.meta.url).href },
                { name: 'img2', img: new URL('@/assets/img/num2.png', import.meta.url).href },
                { name: 'img3', img: new URL('@/assets/img/num3.png', import.meta.url).href },
                { name: 'img4', img: new URL('@/assets/img/num4.png', import.meta.url).href },
                { name: 'img5', img: new URL('@/assets/img/num5.png', import.meta.url).href },
                { name: 'img6', img: new URL('@/assets/img/num6.png', import.meta.url).href },
            ],
            syncIcon: new URL('@/assets/icons/sync_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg', import.meta.url).href,
            tresSesenta: new URL('@/assets/img/360.png', import.meta.url).href
        };
    }
}
</script>

<style lang="scss">
.menu {
    color: white;
    background-color: #020101;
    padding: 0px 15px;

    &>div {
        margin-bottom: 30px;

    }

    &__ambientes {

        display: flex;
        flex-direction: column;
        gap: 20px;

        &__galeria {
            display: grid;
            grid-template-columns: repeat(2, 1fr);



            img {
                border-radius: 10px;
                padding: 2%;
                width: calc(400px/2);

                &:hover {
                    border: 1px solid black;
                    border-radius: 5px;

                }
            }
        }

        &__separator {
            width: 100%;
            height: 2px;
            background-color: gray;
        }

        &__360 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            img {
                border-radius: 10px;
                padding: 2%;
                width: calc(400px/2);

                &:hover {
                    border: 1px solid black;
                    border-radius: 5px;

                }
            }


        }

    }

    &__tabs {
        display: flex;
        width: 100vw;
        height: 8vh;
    }

    .menu__tab-button {
        width: calc(430px/3);
        border: none;
        background-color: transparent;


        &.active {
                background-color: #020101; 
                color: white; 
                border-radius: 0 0 5% 5%; 
            }
    }

    &__separator {
        width: 100%;
        height: 2px;
        background-color: gray;
        margin-bottom: 30px;

    }

    &__applicaciones {

        &__botones {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 4vh;
            background-color: rgb(243, 243, 243);
            margin-top: 20px;
            border-radius: 10px;



            button {
                width: 100%;
                height: 4vh;
                border: none;
                background-color: rgb(243, 243, 243);
                border-radius: 4px;

                &:hover {
                    background-color: #020101;
                    color: white;
                }
            }
        }
    }

    &__design {
        font-weight: bold;
        font-size: 70%;
        margin-top: 40px;
    }

    &__search {

        input {
            background-color: rgb(243, 243, 243);
            border: none;
            border-radius: 5px;
            color: #191919;
            width: 100%;
            height: 3dvh;
            padding-left: 2%;
            background-color: rgb(243, 243, 243);
            background-image: url('@/assets/icons/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
            background-repeat: no-repeat;
            background-position: calc(100% - 10px) center;

        }
    }

    &__filter {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &__select {
            display: flex;
            flex-direction: row;

            p {
                display: flex;
                flex-direction: column;
                width: calc(90%/3);
                padding: 5px;

                select {
                    margin-top: 8px;
                    border: none;
                    border-radius: 5px;
                    height: 2vw;
                    background-color: rgb(243, 243, 243);

                }
            }
        }


        &__data {
            display: flex;
            flex-direction: row;
            align-items: center;


            &__separator {
                width: 10px;
                height: 80%;
                background-color: rgb(0, 0, 0);
            }

            button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                background-color: rgba(243, 243, 243, 0);

            }
        }
    }


}
</style>