import React, { Component } from 'react'

class TopBar extends Component {

  style = {
    container: {
      width: '100%',
      background: '#ffffff',
      position: 'absolute',
      top: '0',
      left: '0',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Carter One, cursive',
      fontSize: '38px',
      color: '#b55c00',
      boxShadow: '0px 10px 20px 10px rgba(255,255,255,1)'
    }
  }

  render() {
    return (
      <div style={ this.style.container }>
        Where's My Beer?
      </div>
    )
  }
}

export default TopBar;