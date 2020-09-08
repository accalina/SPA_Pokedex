<template>
  <div>
    <div v-for="(pokemon, index) in pokemons" :key="index">
      <img style="height: 150px" :src="pokemon.image" alt="Card image cap">
      <p>{{ pokemon.name }}</p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const getPokemonList = gql`
{
  pokemons(first: 6){
    id
    number
    name
    image
  }
}`

export default {
  data(){
      return{
        pokemons:'',
      }
  },
  apollo:{
    pokemons: {
      query: getPokemonList,
    }
  }
}
</script>