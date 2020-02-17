import React, { Component } from 'react'
import './App.css'
class App extends Component {
  state = {
    count: 0
  }
  componentDidMount() {
    fetch(window.location.href + '/count')
    .then(response => response.json())
    .then(data => {
      this.setState({
        count: data.count
      })
    })
  }
  
  
  render() {
    return (
      <div>
       {this.state.count}
      </div>
    )
  }
}export default App