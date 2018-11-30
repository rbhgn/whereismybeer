import React, { Component } from 'react'

export default class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);


    addBubbles(window.innerWidth, window.innerHeight)
    updateBubbles()
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  render() {
    return <Canvas angle={this.state.angle} />
  }
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }
  
  saveContext(ctx) {
    this.ctx = ctx;
  }
  
  componentDidUpdate() {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);
    bubbles.map(v => {
      this.ctx.beginPath();
      this.ctx.arc(v.x, v.y, v.r, 0, 2*Math.PI)
      this.ctx.strokeStyle="#ffffff"
      this.ctx.globalAlpha= 0.8
      this.ctx.lineWidth=0.5
      this.ctx.stroke()
      this.ctx.closePath()
      return v
    })
    this.ctx.restore();
  }
  
  render() {
    return <PureCanvas contextRef={this.saveContext}></PureCanvas>;
  }
}

class PureCanvas extends Component {
  shouldComponentUpdate() { return false; }
  
  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', top: '0', left:'0', zIndex: 1}}>
      <canvas width={ window.innerWidth } height={ window.innerHeight } 
        ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
      />
      </div>
    )
  }
}


const bubbles = []

const updateBubbles =  () => {
  for (let i = bubbles.length - 1; i >= 0; i--) {
      
      if (bubbles[i].y < 70) {
        if (bubbles.length > 600) {
          bubbles.splice(0, 1)
        }
      } else {
        bubbles[i].y -= 1
      }
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = [3, 4, 5][Math.floor(Math.random() * 3) ]
  }
}

const addBubbles = (width, height) => {
  const x = Math.floor( (Math.random() * width) )
  const y = height
  const bubble = new Bubble(x, y)
  if (Math.random() < .5) {
    bubbles.push(bubble)
  }
}