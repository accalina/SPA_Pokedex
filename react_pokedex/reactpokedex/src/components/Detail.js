import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export default class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            details: [],
            readyToRender: false,
            pokename: ""
        }
    }
    // Methods

    detailPokemons(val){
      this.setState({details: val, readyToRender: true})
    }

    getdata(name){
      const client = new ApolloClient({
        uri: 'https://graphql-pokemon2.vercel.app',
        cache: new InMemoryCache()
      });
      
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
      
        client
        .query({
          query: getPokemonDetail,
          variables: {
            pokename: name,
          },
        })
      .then(result => {
        console.log(result.data.currentPokemon)
        this.detailPokemons(result.data.currentPokemon)
      });
    }

    componentDidMount () {
      let { pokename } = this.props.match.params
      this.getdata(pokename)
      this.setState({pokename: pokename})
    }
    
    render() {
      const readyToRender = this.state.readyToRender
      const { details } = this.state
      return (
        <div>
          {readyToRender && details ? (
            <div>
              <h2>Pokemon no. {details.number}</h2>
              <img src={details.image} alt=""/>
              <h2>{details.name}</h2>
            </div>
          ) : (
            <p>Pokemon {this.state.pokename} Not Found...</p>
          )}
        </div>
      );
    }
}