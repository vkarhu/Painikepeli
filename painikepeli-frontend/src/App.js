import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      count: 0,
      points: 0,
      toReward: 0
    }
    this.updateCount = this.updateCount.bind(this)
    this.resetScore = this.resetScore.bind(this)
  }

  componentDidMount() {
    fetch(window.location.href + 'count')
      .then(response => response.json())
      .then(data => {
        this.setState({
          count: data.count
        })
        console.log(data.value)
      })
  }

  updateCount = () => {
    fetch(window.location.href + 'count/push')
      .then(response => response.json())
      .then(data => {
        this.setState({
          count: data.count,
          points: data.points,
          toReward: data.toReward
        })
      })
  }

  resetScore = () => {
    fetch(window.location.href + 'count/reset')
      .then(response => response.json())
      .then(data => {
        this.setState({
          count: data.count,
          points: data.points,
          toReward: data.toReward
        })
      })
  }

  render() {
    return (
      <div>
        <h1>
          Painikepeli
        </h1>
        {this.state.points>0?<button onClick={this.updateCount}>push</button>:<button onClick={this.resetScore}>Out of points! Reset here</button>}
        <h2>
          You have {this.state.points} points
        </h2>
        <h2>
          Clicks to a reward {this.state.toReward}
        </h2>
        <h3>
          This site relies on cookies. Make sure cookies are turned on before playing!
        </h3>
      </div>
    )
  }
} export default App