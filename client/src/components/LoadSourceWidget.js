import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Typography, Paper } from '@material-ui/core';

const styles = theme => ({
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

      const name = this.props.loadingSource.name;

      const intervalId = window.setInterval(() => {
        if (this.props.loadingSource.endTime === -1) {
          const elapsedTime = Date.now() - this.props.loadingSource.startTime;
          this.setState({elapsedTime});

          const seconds = pad(Math.floor(elapsedTime / 1000), 2);
          document.getElementById(`${name}_seconds`).innerHTML = seconds;

          const ms = pad(elapsedTime - (seconds * 1000), 2);
          document.getElementById(`${name}_ms`).innerHTML = ms;
        } else {
          this.setState({elapsedTime: this.props.loadingSource.endTime - this.props.loadingSource.startTime});
          window.clearInterval(this.state.intervalId);
        }
      }, 77);

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
        <Paper className={classes.wrapper}>
          <div className={classes.header}>{name}</div>
          <div className={classes.timer}>
            <div className={classes.timerText}>
              <span id={`${name}_seconds`} className={classes.seconds} >{seconds}</span>
              <span className={classes.period} >{'.'}</span>
              <span id={`${name}_ms`} className={classes.milliseconds} >{ms}</span>
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
