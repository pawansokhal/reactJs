import React from 'react';
class Countdown extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 0, title: '' };
    this.timer = 0;
    // this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let milliseconds_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let milliseconds = Math.ceil(milliseconds_for_seconds);
    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds,
      "ms": milliseconds
    };
    return obj;
  }


  secondsToTimeNew(minutes) {
    // let hours = Math.floor(secs / (60 * 60));
    let min = minutes.split(":");
    // let divisor_for_minutes = secs % (60 * 60);
    // let minutes = Math.floor(divisor_for_minutes / 60);

    // let divisor_for_seconds = divisor_for_minutes % 60;
    // let milliseconds_for_seconds = divisor_for_minutes % 60;
    // let seconds = Math.ceil(divisor_for_seconds);
    // let milliseconds = Math.ceil(milliseconds_for_seconds);

    let obj = {
      // "h": hours,
      "m": min[0],
      "s": min[1],
    };
    return obj;
  }



  componentDidMount() {


    document.querySelector('.countdown-wrap').addEventListener("newMessage", (e) => {
      
      // e.detail
      let data = e.detail.data;
      // console.log('data', data)
      let datetime = JSON.parse(data.custom_data);
      let sec = new Date((Date.parse(datetime.expiry_time) - Date.parse(new Date())))
      let final = (sec.getTime() / 1000)
      let timeLeftVar = this.secondsToTime(final);
      this.setState({ time: timeLeftVar, title: data.title, seconds: final});
      if (this.timer === 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }, false);
    // Listen for the event.
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    let sec = this.state.seconds
    return (
      <div className="countdown-wrap">
        {sec > 0 ?
          <React.Fragment>
            <h1 className="text-center">{this.state.title}</h1>
            <div className="countdown">
              <div className="bloc-time min" data-init-value={0}>
                <span className="count-title">Minutes</span>
                <div className="figure min min-1">
                  <span className="top">{this.state.time.m}</span>
                  <span className="top-back">
                    <span>{this.state.time.m}</span>
                  </span>
                  <span className="bottom">{this.state.time.m}</span>
                  <span className="bottom-back">
                    <span>{this.state.time.m}</span>
                  </span>
                </div>
              </div>
              <div className="bloc-time sec" data-init-value={0}>
                <span className="count-title">Seconds</span>
                <div className="figure sec sec-1">
                  <span className="top">{this.state.time.s}</span>
                  <span className="top-back">
                    <span>{this.state.time.s}</span>
                  </span>
                  <span className="bottom">{this.state.time.s}</span>
                  <span className="bottom-back">
                    <span>{this.state.time.s}</span>
                  </span>
                </div>
              </div>
            </div>
          </React.Fragment>
          : null}
      </div>

    );
  }
}
export default Countdown