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
            pokeindex: 3,
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
          this.changePokeindex(this.state.pokeindex + 3)
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
      this.setState({
        search: val
      })
    }

    componentDidMount(){
      this.getData(this.state.pokeindex)
      this.scroll()
    }
    render() {
      return (
        <div>
          Search : <input type="text" value={this.state.search} onChange={ e => this.handleSearch(e.target.value)}/>
          <button type="button"  onClick={() => this.handleDetail(this.state.search)}>Find</button><br/><br/>


          {this.state.pokemons.filter(searchingFor(this.state.search)).map((pokemon)=>
            <div key={pokemon.id}>
              <div>{pokemon.name}</div>
              <img src={pokemon.image} alt={pokemon.name}></img>
              <button type="button" img={pokemon.image} onClick={() => this.handleDetail(pokemon.name)}>Detail</button>
            </div>
          )}

        </div>
      )
    }
}