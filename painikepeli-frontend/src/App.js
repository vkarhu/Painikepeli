import React, { Component } from 'react'
import './App.css'
class App extends Component {
  

  constructor() {
    super()
    this.state = {
      count: 0
    }
    
    this.updateCount = this.updateCount.bind(this)
  }
 /* 
  componentDidMount() {
    fetch(window.location.href + '/count')
    .then(response => response.json())
    .then(data => {
      this.setState({
        count: data.count
      })
    })
  }
*/
  updateCount = () => {
    console.log('in updateCount')
    fetch(window.location.href + '/count/push' )
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
      <div>
       {this.state.count}
      </div>
      <button onClick={this.updateCount}>
      push
    </button>
    </div>
    )
  }
}export default App