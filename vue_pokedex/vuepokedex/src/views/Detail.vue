<template>
  <div class="container">

    <p>{{ currentPokemon.length }}</p>

    <div class="row">
      <div class="col-sm-6">

        <div class="row">
          <ul class="list-group" style="width:100%">
            <li class="list-group-item bg-dark text-white">Pokemon No.{{ currentPokemon.number }}</li>
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
                      <li class="list-group-item bg-dark text-white" style="font-size: 12px">{{ evo.name }}</li>
                    </ul>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="col-sm-6">
        <ul class="list-group" style="width:100%;height:100%;">
          <li class="list-group-item bg-dark text-white">Detail Information</li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-sm-8">
                <p class="text-left">{{ currentPokemon.name }}</p>
              </div>
              <div class="col-sm-4">
                <p class="text-right">Lv1</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
              <progress class="nes-progress is-success" value="100" max="100"></progress>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-8">
                <p class="text-left" style="font-size: 14px"> {{ currentPokemon.classification }} </p>
              </div>
              <div class="col-sm-4">
                <p class="text-right" style="font-size: 12px">HP: 26 / 26 </p>
              </div>
            </div>

            <!-- Types -->
            <div class="row">
              <div class="col-sm-2">
                Type:
              </div>
              <div class="col-sm-10">
                <div class="row">
                  <div v-for="type in currentPokemon.types" :key="type">
                    <div class="bg-primary text-white" style="margin-left: 20px; padding: 5px;border-radius: 10px; border: 3px solid black">{{ type }}</div>
                  </div>
                </div>
              </div>
            </div>
            <br>

            <!-- Weight -->
            <div class="nes-container with-title is-rounded">
              <p class="title">Weight</p>
              <div class="row">
                <div class="col-sm-3">
                  <progress class="nes-progress is-warning" value="20" max="100" style="height: 20px;"></progress>
                </div>
                <div class="col-sm-9">
                  <p class="text-left">Min: {{ currentPokemon.weight.minimum }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3">
                  <progress class="nes-progress is-warning" value="80" max="100" style="height: 20px;"></progress>
                </div>
                <div class="col-sm-9">
                  <p class="text-left">Max: {{ currentPokemon.weight.maximum }}</p>
                </div>
              </div>
            </div>
            <br>

            <!-- Height -->
            <div class="nes-container with-title is-rounded">
              <p class="title">Height</p>
              <div class="row">
                <div class="col-sm-3">
                  <progress class="nes-progress is-error" value="20" max="100" style="height: 20px;"></progress>
                </div>
                <div class="col-sm-9">
                  <p class="text-left">Min: {{ currentPokemon.height.minimum }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3">
                  <progress class="nes-progress is-error" value="80" max="100" style="height: 20px;"></progress>
                </div>
                <div class="col-sm-9">
                  <p class="text-left">Max: {{ currentPokemon.height.maximum }}</p>
                </div>
              </div>
            </div>
            <br>

            <!-- Resistance -->
            <div class="nes-container with-title is-rounded">
              <p class="title">Weaknesses</p>
              <div class="lists">
                <ul class="nes-list is-disc">
                  <li class="text-left" v-for="weaknesses in currentPokemon.weaknesses" :key="weaknesses">{{weaknesses}}</li>
                </ul>
              </div>
            </div>
            <br>

            <!-- Attack -->
            <div class="nes-table-responsive">
              <h3>Fast Attack</h3>
              <center>
                <table class="nes-table is-bordered">
                  <thead>
                    <tr style="background-color:pink">
                      <th>Name</th>
                      <th>Type</th>
                      <th>Damage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="fast in currentPokemon.attacks.fast" :key="fast.name">
                      <td>{{fast.name}}</td>
                      <td>{{fast.type}}</td>
                      <td>{{fast.damage}}</td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </div>
            <br>

            <div class="nes-table-responsive">
              <h3>Special Attack</h3>
              <center>
                <table class="nes-table is-bordered">
                  <thead>
                    <tr style="background-color: lightsalmon">
                      <th>Name</th>
                      <th>Type</th>
                      <th>Damage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="special in currentPokemon.attacks.special" :key="special.name">
                      <td>{{special.name}}</td>
                      <td>{{special.type}}</td>
                      <td>{{special.damage}}</td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </div>




          </li>
        </ul>
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