import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import MadeWithBasketball from './MadeWithBasketball';

const styles = theme => ({
  root: {
    flexGrow: 0,
  },
  header: {
    textAlign: 'center',
    fontFamily: 'monospace',
    [theme.breakpoints.down('sm')]: {
      // https://css-tricks.com/fitting-text-to-a-container/
      fontSize: '5.1vw',
    },
    fontSize: '1.7rem',
    marginTop: theme.spacing.unit * 3
  },
  title: {
    fontFamily: 'monospace',
    fontSize: '1.6rem'
  },
  bodyText: {
    fontFamily: 'monospace',
    fontSize: '1.1rem'
  },
  ol: {
    fontFamily: 'monospace',
  },
  normalLink: {
    textDecoration: 'none',
    color: 'black'
  },
  createButton: {
    textDecoration: 'none',
    width: '100%'
  },
});

/**
 * This is the 'home' page of EthMadness.  The component is mainly a formatted
 * wall of text explaining how the game works.
 */
function HomePage(props) {
  const { classes } = props;

  const sizes = { xl: 7, lg: 8, md: 9, sm: 10, xs: 12};

  return (
    <div style={{ padding: 12 }}> { /* https://material-ui.com/layout/grid/#negative-margin */}
      <Grid container className={classes.root} justify="center" spacing={24}>
        <Grid item {...sizes}>
          <Typography className={classes.header}>
            <span role="img" aria-label="basketball icon">🏀</span> Welcome to Eth Madness! <span role="img" aria-label="basketball icon">🏀</span>
          </Typography>
        </Grid>
        <Grid item {...sizes}>
          <Typography className={classes.title}>
            What is this?
          </Typography>

          <Typography className={classes.bodyText}>
            Eth Madness is the answer to the question 'How do I combine college basketball and decentralized technology, the two most important things in life?'
            Eth Madness is a smart contract based NCAA bracket challenge.
          </Typography>
        </Grid>
        <Grid container item {...sizes} justify="center" style={{ marginTop: 16}}>
          <NavLink to={{ pathname: '/enter', search: props.location.search}} className={classes.createButton}>
            <Button fullWidth variant="contained" color="primary">Create a Bracket Now!</Button>
          </NavLink>
        </Grid>

        <Grid item {...sizes}>
          <Typography className={classes.title}>
            The Prize:
          </Typography>

          <ul className={classes.ol}>
            <li><Typography className={classes.bodyText}>First Place: <b>350 DAI</b></Typography></li>
            <li><Typography className={classes.bodyText}>Second Place: <b>100 DAI</b></Typography></li>
            <li><Typography className={classes.bodyText}>Third Place: <b>50 DAI</b></Typography></li>
          </ul>
          
          <Typography className={classes.bodyText}>
            There is no buy-in for Eth Madness, you'll have to look elsewhere for your gambling fix.  
            But we're offering a prize pool of <a className={classes.normalLink} href="https://coinmarketcap.com/currencies/dai/" target="_blanl"><b>500 DAI</b></a> to the best three brackets submitted!
          </Typography>

        </Grid>

      <Grid item {...sizes}>
        <Typography className={classes.title}>
          How it works:
        </Typography>
        <ol className={classes.ol}>
          <li><Typography className={classes.bodyText}>
          <NavLink  to={{ pathname: '/enter', search: props.location.search}}>
            Create a bracket</NavLink> and make your picks.</Typography>
          </li>
          <li><Typography className={classes.bodyText}>Submit your bracket via MetaMask or other Web3 provider - it's stored on chain.</Typography></li>
          <li><Typography className={classes.bodyText}>Check your progress during the tournament via the <NavLink to={{ pathname: '/leaders', search: props.location.search}}>Leaderboard</NavLink>.</Typography></li>
          <li><Typography className={classes.bodyText}>After <strike>Gonzaga</strike> the national champion has been crowned, 5 oracles will submit the results.  If 75% of them submit the same results, the 3 winners will receive their DAI!</Typography></li>
        </ol>

          <Typography className={classes.bodyText}>
            That was a bit of a simplification - for all the nitty, gritty details - <a href="https://github.com/nodesmith/eth-madness">check out the code yourself</a>! Everything is open source.  One thing to note, there 
            will be no ties.  The contract will not allow you to submit the exact same bracket as another person.
          </Typography>
          <Typography style={{marginTop: 16}} className={classes.bodyText}>
            The smart contract can be found here: <a href="https://etherscan.io/address/0x10e612F9c80ed35D74a6B34aAeb18Db881cCB51E">0x10e612F9c80ed35D74a6B34aAeb18Db881cCB51E</a>
          </Typography>
        </Grid>

        <Grid item {...sizes}>
          <Typography className={classes.title}>
            What you'll need:
          </Typography>

          <Typography className={classes.bodyText}>
            To play Eth Madness, you'll only need two things:
          </Typography>
          <ol>
            <li><Typography className={classes.bodyText}>An Ethereum wallet (for example: <a href="https://metamask.io/">MetaMask</a>)</Typography></li>
            <li><Typography className={classes.bodyText}>A tiny amount of Ether to cover your bracket submission's gas cost.</Typography></li>
          </ol>
        </Grid>
        <MadeWithBasketball sizes={sizes} />
      </Grid>
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);