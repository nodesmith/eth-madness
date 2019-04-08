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
    actualTime: {
      display: 'inline-block'
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
    },
    one: {
      opacity: 0,
      animation: 'dot 1.0s infinite',
      animationDelay: '0.0s'
    },
    two: {
      opacity: 0,
      animation: 'dot 1.0s infinite',
      animationDelay: '0.1s'
    },
    three: {
      opacity: 0,
      animation: 'dot 1.0s infinite',
      animationDelay: '0.2s'
    },
    four: {
      opacity: 0,
      animation: 'dot 1.0s infinite',
      animationDelay: '0.3s'
    },
    '@keyframes dot': {
      '0%': { opacity: 0 },
      '50%': { opacity: 0 },
      '100%': { opacity: 1 }
    },
    loadingDots: {
      transform: 'translateY(-16px)'
    }
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

  render = () => {
    const { classes, loadingSource, processedBrackets } = this.props;
    const { name } = loadingSource;

    const { startTime, endTime } = this.props.loadingSource;
    const elapsedTime = endTime - startTime;
    let isRunning = (startTime !== -1 && endTime === -1) || !processedBrackets;

    const seconds = pad(Math.floor(elapsedTime / 1000), 2);
    const ms = pad(elapsedTime - (seconds * 1000), 2);
    
    return (
      <Grid item xl={1} l={2} md={2} s={3} xs={12} key={name} className={classes.root}>
        <Paper className={classes.wrapper}>
          <div className={classes.header}>{name}</div>
          <div className={classes.timer}>
            <div className={classes.timerText}>
              <div>
              {
                isRunning ? 
                (
                  <div className={classes.loadingDots}>
                    <span className={classes.one}>.</span>
                    <span className={classes.two}>.</span>
                    <span className={classes.three}>.</span>
                    <span className={classes.four}>.</span>
                  </div>)
                :
                (
                  <div className={classes.actualTime} >
                    <span id={`${name}_seconds`} className={classes.seconds} >{seconds}</span>
                    <span className={classes.period} >{'.'}</span>
                    <span id={`${name}_ms`} className={classes.milliseconds} >{ms}</span>
                  </div>)
              }
              </div>  
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
  processedBrackets: PropTypes.bool.isRequired
};

export default withStyles(styles)(LoadSourceWidget);
