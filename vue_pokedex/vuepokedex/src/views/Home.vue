<template>
    <div class="home">
        <PokemonList/>
    </div>
</template>

<script>
import PokemonList from "../components/PokemonList.vue";
export default {
    name: "Home",
    components: {
        PokemonList
    }
}
</script>