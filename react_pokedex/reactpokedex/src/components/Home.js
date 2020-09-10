import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

function searchingFor(temp){
  return function(x){
    const testresult = x.name.toLowerCase().includes(temp.toLowerCase()) || !temp
    return testresult
  }
}

function searchingForPoketype(temp){
  return function(x){
    const test = x.types.filter((item) => {
      return item.toLowerCase().includes(temp.toLowerCase()) || !temp
    })
    if (test != ""){return true} else {return false}
  }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokeindex: 24,
            pokemons: [],
            search: "",
            filterType: false,
            poketype: "",
            fetchAllData: false,
            navbarFilter: false
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
          number
          types
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
        this.setState({fetchAllData: false, search: val})
      }else{
        this.getData(151)
        this.setState({fetchAllData: true, search: val}, ()=>{})
      }
    }

    startFiltering(val){
      if (val === "none"){
        this.getData(24)
        this.setState({fetchAllData: false, poketype: "", filterType: false}, ()=>{})
      }else if (val === "back"){
        this.getData(24)
        this.setState({navbarFilter: false})
      }else{
        this.getData(151)
        this.setState({fetchAllData: true, poketype: val, filterType: true}, ()=>{})
      }
    }

    componentDidMount(){
      this.getData(this.state.pokeindex)
      this.scroll()
    }
    render() {
      return (
        <>
          <div id="app">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <i className="nes-pokeball" style={{marginRight: "10px"}} onClick={() => this.props.history.push({pathname: `/`})}></i>
                <p className="navbar-brand" onClick={() => this.props.history.push({pathname: `/`})}> Pokedex </p>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active"></li>
                  </ul>

                  

                  {this.state.navbarFilter ? (
                    
                    <div className="form-inline my-2 my-lg-0">
                    <label for="success_select">Filter</label>
                    <div class="nes-select is-success">
                      <select required id="success_select" value={this.state.poketype} onChange={ e => this.startFiltering(e.target.value)}>
                      <option value="none">Clear Filter</option>
                      <option value="back">Back to Search</option>
                      <option value="Grass">Grass</option>
                      <option value="Fire">Fire</option>
                      <option value="Water">Water</option>
                      <option value="Poison">Poison</option>
                      <option value="Bug">Bug</option>
                      <option value="Dark">Dark</option>
                      <option value="Dragon">Dragon</option>
                      <option value="Electric">Electric</option>
                      <option value="Fairy">Fairy</option>
                      <option value="Fighting">Fighting</option>
                      <option value="Flying">Flying</option>
                      <option value="Ghost">Ghost</option>
                      <option value="Ground">Ground</option>
                      <option value="Ice">Ice</option>
                      <option value="Normal">Normal</option>
                      <option value="Psychic">Psychic</option>
                      <option value="Rock">Rock</option>
                      <option value="Steel">Steel</option>
                      </select>
                    </div>
                  </div>
                  ): (
                    <div className="form-inline my-2 my-lg-0">
                    <div className="nes-field"><input className="nes-input" placeholder="Search" type="text" value={this.state.search} onChange={ e => this.handleSearch(e.target.value)}/></div>
                    <button type="button" className="nav-link nes-btn is-success" style={{marginLeft: "10px"}} onClick={() => this.handleDetail(this.state.search)}>Find</button><br/><br/>
                    <button type="button" className="nav-link nes-btn is-warning" style={{marginLeft: "10px"}}  onClick={() => this.setState({navbarFilter: true})}>Filter</button><br/><br/>
                  </div>
                  )}
                  

                  
                </div>
              </div>
            </nav>
            <div style={{ marginBottom: "100px" }}></div>
            <div className="container">
              <div className="row">

                {this.state.filterType ? (this.state.pokemons.filter(searchingForPoketype(this.state.poketype)).map((pokemon)=>
                <div className="card" style={{width: "22rem", margin: "10px"}} key={pokemon.id}>
                  <img className="card-img-top" style={{height: "300px"}} src={pokemon.image} alt={pokemon.name}></img>
                  <div className="card-body bg-dark">
                    <h5 className="card-title text-white">{ pokemon.name}</h5>
                    <button type="button" className="nav-link nes-btn is-primary" img={pokemon.image} onClick={() => this.handleDetail(pokemon.name)}>Detail</button>
                  </div>
                </div>
                )): (this.state.pokemons.filter(searchingFor(this.state.search)).map((pokemon)=>
                      <div className="card" style={{width: "22rem", margin: "10px"}} key={pokemon.id}>
                        <img className="card-img-top" style={{height: "300px"}} src={pokemon.image} alt={pokemon.name}></img>
                        <div className="card-body bg-dark">
                          <h5 className="card-title text-white">{ pokemon.name}</h5>
                          <button type="button" className="nav-link nes-btn is-primary" img={pokemon.image} onClick={() => this.handleDetail(pokemon.name)}>Detail</button>
                        </div>
                      </div>
                ))}


              </div>
            </div>
          </div>


        </>
      )
    }
}