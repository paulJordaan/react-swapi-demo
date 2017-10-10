import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SwapiTable from './Components/SwapiTable';
import AppBar from 'material-ui/AppBar';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
              title={<span>Swapi React Demo</span>}
              iconElementLeft={<span/>}
            />
          <div style={style.container}>
            <SwapiTable />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const style = {
  container: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}

export default App;
