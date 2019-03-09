import React, { PureComponent } from 'react'

export default class WindowScrollListener extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      threshold: 0,
      direction: null,
      position: null
    }
  }

  componentDidMount(){
    this.prev = window.scrollY;
    window.addEventListener('scroll', e => this.handleScrollEvent(e), false);
  }

  componentWillMount() {
    window.removeEventListener('scroll',  e => this.handleScrollEvent(e), false)
  }

  calcThreshold() {
    this.setState(() => ({threshold: this.state.threshold + 1}))
    window.clearTimeout(this.timer);
    this.timer = setTimeout(() => { 
      this.setState(() => ({threshold: 0}))
    }, 450);
  }

  handleScrollEvent(e) {
    this.calcThreshold();

    const window = e.currentTarget;

    this.prev > window.scrollY
      ? this.props.direction('up')
      : this.props.direction('down')

    // this.props.scrollEvent({
    //   direction: this.prev > window.scrollY ? 'up' : 'down',
    //   position: window.scrollY,
    //   threshold: this.state.threshold
    // })

    this.prev = window.scrollY;
  }

  render() {
    return (
      <React.Fragment/>
    )
  }
}
