<template>
  <div class="container">
    <div class="row">
      <div class="card" style="width: 22rem; margin:10px" v-for="(pokemon, index) in pokemons" :key="index">
        <img class="card-img-top" style="height: 300px" :src="pokemon.image" alt="Card image cap">
        <div class="card-body bg-dark">
          <h5 class="card-title text-white">{{ pokemon.name }}</h5>
          <router-link :to="{ name: 'Detail', params: { pokename: pokemon.name } }" class="nes-btn is-primary" style="width: 100%">Detail</router-link>
        </div>
      </div>
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
        myindex: 24
      }
  },
  methods: {
    scroll(){
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      
        if (bottomOfWindow) {
          this.myindex = this.myindex + 24
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