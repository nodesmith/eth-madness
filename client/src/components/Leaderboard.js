import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography, CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import MadeWithBasketball from './MadeWithBasketball';
import EventCacheComparison from './EventCacheComparison';

const styles = theme => ({
  root: {
    padding: 12
  },
  container: {
    margin: '0 auto',
  },
  header: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  searchContainer: {
    marginBottom: theme.spacing.unit * 2,
    overflow: 'hidden'
  },
  searchInput: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left'
  },
  tableContainer: {
    overflowX: 'auto',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.spacing.unit * 4
  }
});

/**
 * Shows the leaderboard for the EthMadness challenges.  This is a data table containing
 * a row for every submitted bracket.  Each row shows the submitted bracket's nickname,
 * score, submitted address, & a link to view the bracket.
 * 
 * The data for this component comes from smart contract event logs - fetching this would normally
 * be really slow, but this app uses Nodesmith's 'smart contract event cache' to make this fast.
 * https://beta.docs.nodesmith.io/#/ethereum/eventcache 
 */
class Leaderboard extends Component {
  componentDidMount() {
    this.props.reloadEntries();
  }

  render = () => {
    
    const { classes, entryCount, searchValue, changeSearch, data, loadingSources, reloadEntries } = this.props;
    const isLoading = entryCount < 0;
    const sizes = { xl: 7, lg: 8, md: 9, sm: 11, xs: 12};

    return (
      <div className={classes.root}>
        <Grid container justify="center" >
          <Grid item {...sizes}>
            <div className={classes.header}>
              <Typography variant="h4" align="center">Leaderboard</Typography>
              <Typography variant="caption" align="center">
                {isLoading ? `Loading...` : `${entryCount} entries`}
              </Typography>
            </div>
          </Grid>
          <Grid item {...sizes}>
            <EventCacheComparison processedBrackets={!isLoading} loadingSources={loadingSources} reloadData={reloadEntries}/>
          </Grid>
          <Grid item {...sizes}>
          <div className={classes.searchContainer}>
            <TextField disabled={isLoading} InputProps={{classes: {input: classes.searchInput}}} fullWidth variant="outlined" 
              label="Search by bracket name or submitter address" margin="dense"
              value={searchValue} onChange={(event) => changeSearch(event.target.value)}/>
          </div>
          </Grid>
          <Grid item {...sizes}>
          <Paper className={classes.tableContainer}>
            <Table padding="dense" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Bracket Name</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell>Submitter</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  isLoading ? 
                  (
                    <TableRow>
                      <TableCell colSpan={3}>
                      <div className={classes.loadingContainer}>
                        <CircularProgress />
                      </div>
                      </TableCell>
                    </TableRow>
                  ) 
                  :
                  data.map(row => (
                    <TableRow key={row.entryIndex}>
                      <TableCell component="th" scope="row">
                        <NavLink to={{ pathname: `/bracket/${row.entryIndex}`, search: this.props.location.search}}>
                          {row.bracketName || '(Unnamed Bracket)'} 
                        </NavLink>
                      </TableCell>
                      <TableCell align="center">{row.score > 0 ? row.score : '-'}</TableCell>
                      <TableCell align="left">{row.entrant}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
          </Grid>
          <MadeWithBasketball sizes={sizes} />
        </Grid>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  entryCount: PropTypes.number.isRequired,
  reloadEntries: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired, 
  changeSearch: PropTypes.func.isRequired,
  loadingSources: PropTypes.object.isRequired,
};

export default withStyles(styles)(Leaderboard);
