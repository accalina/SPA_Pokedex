import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

function searchingFor(temp){
  return function(x){
    return x.name.toLowerCase().includes(temp.toLowerCase()) || !temp
  }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokeindex: 24,
            pokemons: [],
            search: ""
        }
    }
    
    // Methods
    changePokemons(val){
      this.setState({pokemons: val})
    }

    changePokeindex(val){
      if (val > 0) {
        this.setState({pokeindex: val}, () => {})
        this.getData(this.state.pokeindex)
      }
    }

    scroll(){
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      
        if (bottomOfWindow) {
          this.changePokeindex(this.state.pokeindex + 24)
        }
      };
    }

    getData(index){
      const client = new ApolloClient({
        uri: 'https://graphql-pokemon2.vercel.app',
        cache: new InMemoryCache()
      });

      const GetPokemonQuery = gql`
      query getPokeIndex($pokeindex: Int!){
        pokemons(first: $pokeindex){
          id
          number
          name
          image
        }
      }`

      client
        .query({
          query: GetPokemonQuery,
          variables: {
            pokeindex: index,
          },
        })
      .then(result => {
        // console.log(result.data.pokemons)
        this.changePokemons(result.data.pokemons)
      });
    }

    handleDetail(name){    
      this.props.history.push({
        pathname: `/${name}`
      })
    }

    handleSearch(val){
      if (val === ""){
        this.getData(24)
        this.setState({
          search: val
        })
      }else{
        this.getData(151)
        this.setState({
          search: val
        })
      }
    }

    componentDidMount(){
      this.getData(this.state.pokeindex)
      this.scroll()
    }
    render() {
      return (
        <>
          <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div class="container">
              <i class="nes-pokeball" style={{marginRight: "10px"}}></i>
              <a class="navbar-brand" href="#">Pokedex</a>
              
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <button type="button"  onClick={() => this.handleDetail("")}>Home</button><br/><br/>
                  </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                  Search : <input type="text" value={this.state.search} onChange={ e => this.handleSearch(e.target.value)}/>
                  <button type="button"  onClick={() => this.handleDetail(this.state.search)}>Find</button><br/><br/>
                </div>
              </div>
            </div>
          </nav>
          <div style={{ marginBottom: "100px" }}></div>

            <div class="container">
              <div class="row">

                {this.state.pokemons.filter(searchingFor(this.state.search)).map((pokemon)=>

                <div class="card" style={{width: "22rem", margin: "10px"}} key={pokemon.id}>
                  <img class="card-img-top" style={{height: "300px"}} src={pokemon.image} alt={pokemon.name}></img>
                  <div class="card-body bg-dark">
                    <h5 class="card-title text-white">{ pokemon.name}</h5>
                    <button type="button" class="btn btn-primary" img={pokemon.image} onClick={() => this.handleDetail(pokemon.name)}>Detail</button>
                  </div>
                </div>

                )}
              </div>
            </div>


        </>
      )
    }
}