const API = "https://api.github.com/users/";
const requestMaxTimeMs = 3000

const app = Vue.createApp({
    data() {
        return {
            search: null,
            result: null,
            error: null,
            favorites: new Map()
        };
    },
    
    computed: {
        isFavorite(){
            return this.result && this.favorites.has(this.result.login)
        },
        
        allFavorites(){
            return Array.from(this.favorites.values())
        }
    },
    
    created(){
        const savedFavorites = JSON.parse(window.localStorage.getItem('favorites'))
        if(savedFavorites && savedFavorites.length){
            const favorites = new Map(savedFavorites.map(favorite => [favorite.login, favorite]))
            this.favorites = favorites
        }
    },
    
    methods: {
        async doSearch() {
            const foundInFavorites = this.favorites.get(this.search)
            
            const shouldRequestAgain = (() => {
                if(!!foundInFavorites){
                    const {lastRequestTime} = foundInFavorites
                    const now = Date.now()
                    return (now - lastRequestTime) > requestMaxTimeMs
                }
                return false
            })()
            
            if(!!foundInFavorites && !shouldRequestAgain){
                console.log("Encontrado y se usa la versión de la caché")
                this.result = foundInFavorites
                this.error = null
                this.search = null
                return // Add return to stop execution here
            }
            
            this.result = this.error = null
            try {
                console.log("No encontrado o la versión de cache es muy vieja")
                const response = await fetch(API + this.search)
                
                if(!response.ok) throw new Error("User not found")
                
                const data = await response.json()
                this.result = data
                // Solo actualizamos lastRequestTime si el usuario existe en favoritos
                if(foundInFavorites) {
                    foundInFavorites.lastRequestTime = Date.now()
                }
            } catch (error) {
                this.error = error
            } finally {
                this.search = null
            }
            
        },
        
        addFavorite(){
            this.result.lastRequestTime = Date.now()
            this.favorites.set(this.result.login, this.result)
            this.updatedStorage();
            
        },
        
        removeFavorite(){
            this.favorites.delete(this.result.login)
            this.updatedStorage();
        },
        
        showFavorite(favorite){
            this.result = favorite;
        },
        
        checkFavorite(id){
            return this.result?.login === id
        },
        
        updatedStorage() {
            window.localStorage.setItem('favorites', JSON.stringify(this.allFavorites))
        },
    },
    
})

app.component('app-profile', {
    props: ['result', 'isFavorite'],
    methods: {
        addFavorite() {
            this.$emit('add-favorite');
        },
        removeFavorite() {
            this.$emit('remove-favorite');
        }
    },
    template:
        `
    <div class="result">
        <a v-if="!isFavorite" href="#" class="result__toggle-favorite" @click="addFavorite">Add Favorite⭐</a>
        <a v-else href="#" class="result__toggle-favorite" @click="removeFavorite">Remove Favorite ⭐</a>
        <h2 class="result__name">{{result.name}}</h2>
        <img :src="result.avatar_url" :alt="result.name" class="result__avatar">
            <p class="result__bio">{{result.bio}}
            <br>
                <a :href="result.blog" target="_blank" class="result__blog">{{result.blog}}</a>
            </p>
    </div>
    `
})