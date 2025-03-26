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