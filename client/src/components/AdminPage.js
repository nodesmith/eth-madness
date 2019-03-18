import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as ContestState from '../utils/ContestState';

const styles = {
  root: {
    flexGrow: 1,
  },
};

/**
 * The Admin page is used by the operators of the contest. It can be used to advance the contest 
 * state (see README), add oracles, and view an overview on the stats of the contest.
 * 
 * Any functions called on the smart contract must come from the owning address of the contract - so anyone
 * could navigate to this page and see it, but only the operator would be able to do something meaningful.
 */
function AdminPage(props) {
  const { closeOracleVoting, classes, allEntries, claimTopEntry, advanceContestState, submitOracleVote, addOracle } = props;
  const contractMetadata = props;

  const { isLoading, loadAction } = props;
  if (isLoading) {
    // Trigger the load action, this shouldn't trigger one if one is already in progress
    loadAction();
    return (<Typography variant="h1" align="center">Loading...</Typography>);
  }

  const oracles = contractMetadata.oracles.map(o => (<li key={o}><Typography variant="body1">{o.oracleAddress} - {JSON.stringify(o.oracleVote)}</Typography></li>));
  
  const transitionTimes = Object.keys(ContestState).map(s => {
    const val = ContestState[s];
    if (contractMetadata.transitionTimes[val]) {
      return (<li key={s}><Typography variant="body1"><strong>{s}: </strong>{new Date(contractMetadata.transitionTimes[val]).toString()}</Typography></li>);
    }

    return null;
  });
  
  return (
    <div className={classes.root}>
      <div>
        <ul>
          <Typography variant="body1"><strong>Network Id: </strong>{contractMetadata.networkId}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Contract Address: </strong>{contractMetadata.contractAddress}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Current State: </strong>{contractMetadata.currentState}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Entry Count: </strong>{contractMetadata.entryCount}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Prize Amount: </strong>{contractMetadata.prizeAmount}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Price Token Address: </strong>{contractMetadata.prizeERC20TokenAddress}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Oracles: </strong></Typography>
          <ul>
            {oracles}
          </ul>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Transition Times: </strong></Typography>
          <ul>
            {transitionTimes}
          </ul>
        </ul>
        <ul>
          <Typography variant="body1"><strong>First: </strong>{JSON.stringify(contractMetadata.first)}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Second: </strong>{JSON.stringify(contractMetadata.second)}</Typography>
        </ul>
        <ul>
          <Typography variant="body1"><strong>Third: </strong>{JSON.stringify(contractMetadata.third)}</Typography>
        </ul>
      </div>
      <div>
        <Button variant="outlined" onClick={() => advanceContestState(parseInt(contractMetadata.currentState) + 1)}>Advance Contest State</Button>
      </div>
      <div>
        <TextField variant="outlined" id="oracle-add" label="oracle to add" margin="dense" />
        <Button variant="outlined" onClick={() => {
          const oracleAddress = document.getElementById("oracle-add").value;
          addOracle(oracleAddress);
        }}>Submit Vote</Button>
      </div>
      <div>
        <TextField variant="outlined" id="oracle-index" type="number" label="index" margin="dense" />
        <TextField variant="outlined" id="oracle-results" label="results" margin="dense" />
        <TextField variant="outlined" id="oracle-score-a" type="number" label="score a" margin="dense" />
        <TextField variant="outlined" id="oracle-score-b" type="number" label="score b" margin="dense" />
        <Button variant="outlined" onClick={() => {
          const oracleIndex = parseInt(document.getElementById("oracle-index").value);
          const results = document.getElementById("oracle-results").value;
          const scoreA = parseInt(document.getElementById("oracle-score-a").value);
          const scoreB = parseInt(document.getElementById("oracle-score-b").value);
          submitOracleVote(oracleIndex, results, scoreA, scoreB);
        }}>Submit Vote</Button>
        <Button variant="outlined" onClick={() => {
          const results = document.getElementById("oracle-results").value;
          const scoreA = parseInt(document.getElementById("oracle-score-a").value);
          const scoreB = parseInt(document.getElementById("oracle-score-b").value);
          closeOracleVoting(results, scoreA, scoreB);
        }}>Close Voting</Button>
      </div>
      <div>
        <TextField type="number" variant="outlined" id="entry-index" label="entry index" margin="dense" />
        <Button variant="outlined" onClick={() => {
          const entryIndex = parseInt(document.getElementById("entry-index").value);
          const entryCompressed = allEntries[entryIndex].entryCompressed;
          claimTopEntry(entryCompressed);
        }}>Claim Top Entry</Button>
      </div>
      
    </div>
  );
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
  allEntries: PropTypes.array.isRequired,
  contractMetadata: PropTypes.object.isRequired,
  advanceContestState: PropTypes.func.isRequired,
  submitOracleVote: PropTypes.func.isRequired,
  closeOracleVoting: PropTypes.func.isRequired,
  addOracle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadAction: PropTypes.func.isRequired,
  claimTopEntry: PropTypes.func.isRequired
};

export default withStyles(styles)(AdminPage);