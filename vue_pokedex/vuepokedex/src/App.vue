<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <PokemonList/>
  </div>
</template>

<script>
import PokemonList from "./components/PokemonList.vue";

export default {
  name: 'App',
  components: {
    PokemonList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
