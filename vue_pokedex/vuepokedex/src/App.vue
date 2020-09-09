<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <i class="nes-pokeball" style="margin-right: 10px"></i>
        <a class="navbar-brand" href="#">Pokedex</a>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link v-if="currentRouteName != 'Home'" :to="{ name: 'Home'}" class="nav-link nes-btn is-primary">Home</router-link>
            </li>
          </ul>
          <div v-if="currentRouteName == 'Home'" class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Pokemon Name" aria-label="Search" v-model="pokename">
            <router-link :to="{ name: 'Detail', params: { pokename: pokename } }" class="nes-btn is-success">Search</router-link>
          </div>
        </div>
      </div>
    </nav>
    <div style="margin-bottom: 100px"></div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      pokename: ""
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
}

}
</script>

<style>
@font-face {
  font-family: "Kongtext";
  src: local("Kongtext"), url(./fonts/kongtext.ttf) format("truetype");}

#app {
  font-family: Kongtext, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
