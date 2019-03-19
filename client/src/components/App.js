import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import routes from '../routes/index';
import PropTypes from 'prop-types';
import NavBar from'./NavBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'monospace'
    ].join(','),
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: 8,
        textAlign: 'center'
      }
    },
    MuiFormHelperText: {
      contained: {
        margin: '4px 4px 0',
        textAlign: 'center'
      }
    },
    MuiPaper: {
      elevation2: {
        border: '1px green #e0e0e0'
      },
      rounded: {
        borderRadius: 2
      }
    }
  }
});

/**
 * Top level App wrapper component.  Wraps main routes in a theme:
 * https://material-ui.com/api/mui-theme-provider/
 */
const App = ({ history }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <div>
          <NavBar location={history.location}/>
          { routes }
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  history: PropTypes.object,
}

export default App
