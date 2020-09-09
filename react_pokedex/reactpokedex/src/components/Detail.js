import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "Accalina"
        }
    }
    // Methods
    changeUsername(newname){
      this.setState({username: newname})
    }
    render() {
      return (
        <div>
          <h1>Detail</h1>
          <h4>Hello {this.state.username}</h4>
          <input type="text" value={this.state.username} onChange={ e => this.changeUsername(e.target.value)}/>
          <button type="button" onClick={() => this.changeUsername("Claudia")}>Click me!</button>
        </div>
      )
    }
}