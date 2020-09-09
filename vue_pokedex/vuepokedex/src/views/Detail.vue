<template>
  <div class="container">

    <p>{{ currentPokemon.length }}</p>

    <div class="row">
      <div class="col-sm-6">

        <div class="row">
          <ul class="list-group" style="width:100%">
            <li class="list-group-item bg-dark text-white">{{ currentPokemon.name }}</li>
            <li class="list-group-item">
              <img class="card-img-top" :src="currentPokemon.image" alt="Card image cap">
            </li>
          </ul>
        </div>
        <hr>
        <div class="row">
          <ul class="list-group" style="width:100%">
            <li class="list-group-item bg-dark text-white">Evolution</li>
            <li class="list-group-item" style="height:200px">
              <div class="row" style="height:150px">
                <div class="col-sm-4" v-for="evo in currentPokemon.evolutions" :key="evo.name">
                  <a href="javascript:;" @click="pokename = evo.name">
                    <ul class="list-group" style="width:100%;height:100%;">
                      <li class="list-group-item">
                        <img class="card-img-top" style="height: 100px"  :src="evo.image" alt="Card image cap">
                      </li>
                      <li class="list-group-item bg-dark text-white">{{ evo.name }}</li>
                    </ul>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="col-sm-6">

      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const getPokemonDetail = gql`
query getPokeName($pokename: String!){
  currentPokemon: pokemon(name: $pokename){
    id
    number
    name
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    classification
    types
    resistant
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
    weaknesses
    fleeRate
    maxCP
    evolutions {
      name
      image
    }
    evolutionRequirements {
      amount
      name
    }
    maxHP
    image
  }
}`

export default {
    name: "Detail",
    data() {
        return {
            pokename: "",
            currentPokemon: [],
        }
    },
    methods: {
      
    },
    created() {
        this.pokename = this.$route.params.pokename;
    },
    apollo:{
      currentPokemon: {
        query: getPokemonDetail,
        variables() {
          return {
            pokename: this.pokename,
          }
        },
      }
    }
}
</script>