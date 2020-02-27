import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      count: 0,
      points: 0,
      toReward: 0,
      reward: 0
    }
    this.updateCount = this.updateCount.bind(this)
    this.resetScore = this.resetScore.bind(this)
  }

  componentDidMount() {
    fetch(window.location.href + 'count')
      .then(response => response.json())
      .then(data => {
        this.setState({
          count: data.count,
          points: data.points
        })
      })
  }

  updateCount = () => {
    fetch(window.location.href + 'count/push')
      .then(response => response.json())
      .then(data => {
        this.setState({
          count: data.count,
          points: data.points,
          toReward: data.toReward,
          reward: data.reward
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
        </h1> {/*Render the button if the player has points, otherwise render reset button */}
        {this.state.points > 0 ? <button onClick={this.updateCount}>Push here</button> : <button onClick={this.resetScore}>Out of points! Click here to reset to 20 points</button>} 
        <h2>
          You have {this.state.points} points
        </h2>
        <h2>
          { ? divClicks to a reward {this.state.toReward} : null}
        </h2>
        <h2> {/*Render message of win only when winning*/}
          {this.state.reward > 0 ? <div>You won {this.state.reward} points!</div> : null}
        </h2>
        <h3>
          This site uses cookies to track your score. By using this site you agree to their use. Make sure cookies are turned on before playing!
        </h3>
      </div>
    )
  }
} export default App