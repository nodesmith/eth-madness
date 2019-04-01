import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Typography, Paper } from '@material-ui/core';

const styles = theme => {
  // const keyFrames = {};
  // for (let i = 0; i <= 10; i++) {
  //   keyFrames[`${i * 10}%`] = {
  //     transform: `translateY(${(-i % 10) * 56}px)`
  //   }
  // }

  const keyFrames = {
    to: {
      transform: `translateY(${-10 * 56}px)`
    }
  }

  return {
    root: {
      textAlign : 'center',
      fontFamily: 'digital',
      color: '#419df4',
    },
    timer: {
      height: 50,
    },
    header: {
      paddingTop: theme.spacing.unit,
      fontSize: 18,
    },
    timerText: {
      lineHeight: '56px',
      fontSize: '50px',
      opacity: .8
    },
    wrapper: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      display: 'inline-block',
      borderRadius: 2,
    },
    period: {
      marginLeft: -7,
      marginRight: -7,
      display: 'inline-block',
      // padding: 0,
      transform: 'translateY(-9px)'
    },
    cell: {
      display: 'inline-block',
      overflow: 'hidden',
      height: 50
    },
    cells10000: {
      animation: 'cell-transition 100s steps(10, end) infinite paused'
    },
    cells1000: {
      animation: 'cell-transition 10s steps(10, end) infinite paused'
    },
    cells100: {
      animation: 'cell-transition 1s steps(10, end) infinite paused'
    },
    cells10: {
      animation: 'cell-transition 100ms steps(10, end) infinite paused'
    },
    running: {
      animationPlayState: 'running'
    },
    paused: {
      animationPlayState: 'paused'
    },
    '@keyframes cell-transition': keyFrames,
    
  }
};

const pad = (val, digits) => {
  let res = val.toString();
  while (res.length < digits) {
    res = '0' + res;
  }

  return res.substring(0, 2);
}

/**
 * Component for comparing different web3 providers
 */
class LoadSourceWidget extends Component {
  state = {
    elapsedTime: 0,
    intervalId: -1,
    isRunning: false
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { startTime, endTime } = this.props.loadingSource;
    const { isRunning } = this.state;
    if (startTime !== -1 && endTime === -1 && !isRunning) {
      this.setState({isRunning: true});
    } else if (endTime !== -1 && isRunning) {
      this.setState({isRunning: false});
    }

    //   // Start the timer
    //   if (this.state.intervalId !== -1) {
    //     window.clearInterval(this.state.intervalId);
    //   }

    //   const name = this.props.loadingSource.name;

    //   const intervalId = window.setInterval(() => {
    //     if (this.props.loadingSource.endTime === -1) {
    //       const elapsedTime = Date.now() - this.props.loadingSource.startTime;
    //       this.setState({elapsedTime});

    //       const seconds = pad(Math.floor(elapsedTime / 1000), 2);
    //       document.getElementById(`${name}_seconds`).innerHTML = seconds;

    //       const ms = pad(elapsedTime - (seconds * 1000), 2);
    //       document.getElementById(`${name}_ms`).innerHTML = ms;
    //     } else {
    //       this.setState({elapsedTime: this.props.loadingSource.endTime - this.props.loadingSource.startTime});
    //       window.clearInterval(this.state.intervalId);
    //     }
    //   }, 77);

    //   this.setState({intervalId});
    // }
  }

  createCell = (durationMs) => {
    const { classes } = this.props;
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push((<div key={`${i}_${durationMs}`} className={classes.cellNumber}>{i}</div>));
    }

    const stateClass = this.state.isRunning ? classes.running : classes.paused;
    return (
      <div className={classes.cell}>
        <div className={[classes[`cells${durationMs}`], stateClass].join(' ')} >
        {items}
       </div>
      </div>
    )
  }

  render = () => {
    const { classes, loadingSource } = this.props;
    const { elapsedTime } = this.state;
    const { name } = loadingSource;

    const seconds = pad(Math.floor(elapsedTime / 1000), 2);
    const ms = pad(elapsedTime - (seconds * 1000), 2);
    
    return (
      <Grid item xl={1} l={2} md={2} s={3} xs={12} key={name} className={classes.root}>
        <Paper className={classes.wrapper}>
          <div className={classes.header}>{name}</div>
          <div className={classes.timer}>
            <div className={classes.timerText}>
              {this.createCell(10000)}
              {this.createCell(1000)}
              <div className={classes.period} >{'.'}</div>
              {this.createCell(100)}
              {this.createCell(10)}
{/*               
              <span id={`${name}_seconds`} className={classes.seconds} >{seconds}</span>
              <span className={classes.period} >{'.'}</span>
              <span id={`${name}_ms`} className={classes.milliseconds} >{ms}</span> */}
            </div>
          </div>
        </Paper>
      </Grid>
    );
  }
}

LoadSourceWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingSource: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadSourceWidget);
