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
            pokename: "",
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
          details: pokemon(name: $pokename){
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
        console.log(result.data.details)
        this.detailPokemons(result.data.details)
      });
    }
    changePage(name){
      this.setState({details: [], readyToRender:false, pokename: name})
      this.getdata(name)
      this.props.history.push({
        pathname: `/${name}`
      })
    }

    initData(){
      let { pokename } = this.props.match.params
      this.setState({pokename: pokename})
      this.getdata(pokename)
    }

    componentDidMount () {
      this.initData()
    }
    
    render() {
      const readyToRender = this.state.readyToRender
      const { details } = this.state
      return (
        <>
          <div id="app">
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
                      <button type="button" class="nav-link nes-btn is-primary" onClick={() => this.props.history.push({pathname: `/`})}>Home</button><br/><br/>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div style={{ marginBottom: "30px" }}></div>

            {readyToRender && details ? (
                <div class="container">
                  <div style={{ marginBottom: "100px" }}></div>
                  <div class="row">
                    <div class="col-sm-6">

                      <div class="row">
                        <ul class="list-group" style={{width:"100%"}}>
                          <li class="list-group-item bg-dark text-white">Pokemon No.{ details.number }</li>
                          <li class="list-group-item">
                            <img class="card-img-top" src={details.image} alt="Loading..."></img>
                          </li>
                        </ul>
                      </div>
                      <div style={{ marginBottom: "30px" }}></div>
                      <div class="row">
                        <ul class="list-group" style={{width:"100%"}}>
                          <li class="list-group-item bg-dark text-white">Evolution</li>
                          <li class="list-group-item" style={{height:"200px"}}>
                            <div class="row" style={{height:"150px"}}>

                            {details.evolutions ? (
                              details.evolutions.map((evo)=>
                              <div class="col-sm-4" key={evo.name}>
                                <a href="javascript:;" onClick={() => this.changePage(evo.name)}>
                                  <ul class="list-group" style={{width:"100%", height:"100%"}}>
                                    <li class="list-group-item">
                                      <img class="card-img-top" style={{height: "100px"}} src={evo.image} alt="Loading..."></img>
                                    </li>
                                    <li class="list-group-item bg-dark text-white" style={{fontSize: "12px"}}>{ evo.name }</li>
                                  </ul>
                                </a>
                              </div>
                            )) : (
                              <div class="col-sm-12">
                                <a href="javascript:;">
                                  <ul class="list-group" style={{width:"100%", height:"100%"}}>
                                    <li class="list-group-item bg-danger text-white" style={{fontSize: "12px"}}>No Evolution Found</li>
                                  </ul>
                                </a>
                              </div>
                            )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <ul class="list-group" style={{width:"100%", height:"100%"}}>
                        <li class="list-group-item bg-dark text-white">Detail Information</li>
                        <li class="list-group-item">
                          <div class="row">
                            <div class="col-sm-8">
                              <p class="text-left">{ details.name }</p>
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
                              <p class="text-left" style={{fontSize: "14px"}}> { details.classification } </p>
                            </div>
                            <div class="col-sm-4">
                              <p class="text-right" style={{fontSize: "12px"}}>HP: 26 / 26 </p>
                            </div>
                          </div>

                          {/* Types */}
                          <div class="row">
                            <div class="col-sm-2">
                              Type:
                            </div>
                            <div class="col-sm-10">
                              <div class="row">
                              {details.types.map((type)=>
                                <div key={type}>
                                  <div class="bg-primary text-white" style={{marginLeft: "20px", padding: "5px", borderRadius: "10px", border: "3px solid black"}}>{ type }</div>
                                </div>
                              )}
                              </div>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* <!-- Weight --> */}
                          <div class="nes-container with-title is-rounded">
                            <p class="title">Weight</p>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-warning" value="20" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Min: { details.weight.minimum }</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-warning" value="80" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Max: { details.weight.maximum }</p>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* <!-- Height --> */}
                          <div class="nes-container with-title is-rounded">
                            <p class="title">Height</p>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-error" value="20" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Min: { details.height.minimum }</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-error" value="80" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Max: { details.height.maximum }</p>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* <!-- Resistance --> */}
                          <div class="nes-container with-title is-rounded">
                            <p class="title">Weaknesses</p>
                            <div class="lists">
                              <ul class="nes-list is-disc">
                                {details.weaknesses.map((weaknesses)=>
                                <li class="text-left" key={weaknesses}>{weaknesses}</li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* // <!-- Attack --> */}
                          <div class="nes-table-responsive">
                            <h3>Fast Attack</h3>
                            <center>
                              <table class="nes-table is-bordered">
                                <thead>
                                  <tr style={{backgroundColor: "pink"}}>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Damage</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {details.attacks.fast.map((fast)=>
                                  <tr key={fast.name}>
                                    <td>{fast.name}</td>
                                    <td>{fast.type}</td>
                                    <td>{fast.damage}</td>
                                  </tr>
                                  )}
                                </tbody>
                              </table>
                            </center>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          <div class="nes-table-responsive">
                            <h3>Special Attack</h3>
                            <center>
                              <table class="nes-table is-bordered">
                                <thead>
                                  <tr style={{backgroundColor: "lightsalmon"}}>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Damage</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {details.attacks.special.map((special)=>
                                  <tr key={special.name}>
                                    <td>{special.name}</td>
                                    <td>{special.type}</td>
                                    <td>{special.damage}</td>
                                  </tr>
                                )}
                                </tbody>
                              </table>
                            </center>
                          </div>

                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            ) : (details ? (
              <div class="container">
                  <div style={{ marginBottom: "100px" }}></div>
                  <div class="row">
                    <div class="col-sm-6">

                      <div class="row">
                        <ul class="list-group" style={{width:"100%"}}>
                          <li class="list-group-item bg-dark text-white">Pokemon No. Loading...</li>
                          <li class="list-group-item">
                            <img class="card-img-top" src={details.image} alt="Loading..."></img>
                          </li>
                        </ul>
                      </div>
                      <div style={{ marginBottom: "30px" }}></div>
                      <div class="row">
                        <ul class="list-group" style={{width:"100%"}}>
                          <li class="list-group-item bg-dark text-white">Evolution</li>
                          <li class="list-group-item" style={{height:"200px"}}>
                            <div class="row" style={{height:"150px"}}>
                              <div class="col-sm-4">
                                <a href="javascript:;" >
                                  <ul class="list-group" style={{width:"100%", height:"100%"}}>
                                    <li class="list-group-item">
                                      <img class="card-img-top" style={{height: "100px"}} src="" alt="Loading..."></img>
                                    </li>
                                    <li class="list-group-item bg-dark text-white" style={{fontSize: "12px"}}>Loading...</li>
                                  </ul>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <ul class="list-group" style={{width:"100%", height:"100%"}}>
                        <li class="list-group-item bg-dark text-white">Detail Information</li>
                        <li class="list-group-item">
                          <div class="row">
                            <div class="col-sm-8">
                              <p class="text-left">Loading...</p>
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
                              <p class="text-left" style={{fontSize: "14px"}}> { details.classification } </p>
                            </div>
                            <div class="col-sm-4">
                              <p class="text-right" style={{fontSize: "12px"}}>HP: Loading... </p>
                            </div>
                          </div>

                          {/* Types */}
                          <div class="row">
                            <div class="col-sm-2">
                              Type:
                            </div>
                            <div class="col-sm-10">
                              <div class="row">
                                <div>
                                  <div class="bg-primary text-white" style={{marginLeft: "20px", padding: "5px", borderRadius: "10px", border: "3px solid black"}}>Loading...</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* <!-- Weight --> */}
                          <div class="nes-container with-title is-rounded">
                            <p class="title">Weight</p>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-warning" value="20" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Min: Loading...</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-warning" value="80" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Max: Loading...</p>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* <!-- Height --> */}
                          <div class="nes-container with-title is-rounded">
                            <p class="title">Height</p>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-error" value="20" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Min: Loading...</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-3">
                                <progress class="nes-progress is-error" value="80" max="100" style={{height: "20px"}}></progress>
                              </div>
                              <div class="col-sm-9">
                                <p class="text-left">Max: Loading...</p>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* <!-- Resistance --> */}
                          <div class="nes-container with-title is-rounded">
                            <p class="title">Weaknesses</p>
                            <div class="lists">
                              <ul class="nes-list is-disc">
                                <li class="text-left">Loading...</li>
                              </ul>
                            </div>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          {/* // <!-- Attack --> */}
                          <div class="nes-table-responsive">
                            <h3>Fast Attack</h3>
                            <center>
                              <table class="nes-table is-bordered">
                                <thead>
                                  <tr style={{backgroundColor: "pink"}}>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Damage</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                  </tr>
                                </tbody>
                              </table>
                            </center>
                          </div>
                          <div style={{ marginBottom: "30px" }}></div>

                          <div class="nes-table-responsive">
                            <h3>Special Attack</h3>
                            <center>
                              <table class="nes-table is-bordered">
                                <thead>
                                  <tr style={{backgroundColor: "lightsalmon"}}>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Damage</th>
                                  </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                  </tr>
                                </tbody>
                              </table>
                            </center>
                          </div>

                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            ) : (
              <p>Pokemon not found</p>
            )
            )}
          </div>
        </>
      );
    }
}
