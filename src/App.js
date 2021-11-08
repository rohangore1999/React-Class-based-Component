import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 10
  }

  setProgress = (progress) => {
    this.setState(
      {
        progress: progress
      }
    )
  }

  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <News setProgress={this.setProgress} />
      </div>
    )
  }
}

