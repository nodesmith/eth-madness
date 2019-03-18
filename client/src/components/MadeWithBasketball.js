import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footer: {
    textAlign: 'center',
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4
  }
});


const MadeWithBasketball = ({classes, sizes}) => {
  return (
    <Grid item {...sizes} className={classes.footer}>
      <Typography>Made with <span role="img" aria-label="basketball">🏀</span>by <a target="_blank" rel="noopener noreferrer" href="https://nodesmith.io">Nodesmith</a></Typography>
    </Grid>
  );
}

export default withStyles(styles)(MadeWithBasketball);
