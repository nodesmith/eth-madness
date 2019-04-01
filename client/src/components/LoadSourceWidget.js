import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Typography, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    textAlign : 'center',
    fontFamily: 'digital',
    color: 'red',
  },
  timer: {
    height: 50,
    // width: 150,
    borderRadius: 2,
    fontColor: 'red'
  },
  header: {
    paddingTop: theme.spacing.unit,
    fontSize: 18,
  },
  timerText: {
    lineHeight: '56px',
    // textAlign : 'center',
    // fontFamily: 'digital',
    fontSize: '50px'
  },
  wrapper: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    display: 'inline-block',
    backgroundColor: 'black'
  },
  period: {
    marginLeft: -7,
    marginRight: -7,
  }
});

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
    intervalId: -1
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.loadingSource.startTime !== -1 && this.state.intervalId === -1) {
      // Start the timer
      if (this.state.intervalId !== -1) {
        window.clearInterval(this.state.intervalId);
      }

      const intervalId = window.setInterval(() => {
        if (this.props.loadingSource.endTime === -1) {
          this.setState({elapsedTime: Date.now() - this.props.loadingSource.startTime});
        } else {
          this.setState({elapsedTime: this.props.loadingSource.endTime - this.props.loadingSource.startTime});
          window.clearInterval(this.state.intervalId);
        }
      }, 10);

      this.setState({intervalId});
    }
  }

  render = () => {
    const { classes, loadingSource } = this.props;
    const { elapsedTime } = this.state;
    const { name } = loadingSource;

    const seconds = pad(Math.floor(elapsedTime / 1000), 2);
    const ms = pad(elapsedTime - (seconds * 1000), 2);
    
    return (
      <Grid item xl={1} l={2} md={2} s={3} xs={12} key={name} className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.header}>{name}</div>
          <div className={classes.timer}>
            <div className={classes.timerText}>
              <span className={classes.seconds} >{seconds}</span>
              <span className={classes.period} >{'.'}</span>
              <span className={classes.milliseconds} >{ms}</span>
            </div>
          </div>
        </div>
      </Grid>
    );
  }
}

LoadSourceWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingSource: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadSourceWidget);
