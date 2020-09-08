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
query getPokeIndex($pokeindex: Int!){
  pokemons(first: $pokeindex){
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
        myindex: 10
      }
  },
  methods: {
    scroll(){
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      
        if (bottomOfWindow) {
          this.myindex = this.myindex + 10
        }
      };
    }
  },
  mounted(){
    this.scroll()
  },
  apollo:{
      pokemons: {
        query: getPokemonList,
        variables() {
          return {
            pokeindex: this.myindex,
          }
        },
      }
    }
}
</script>