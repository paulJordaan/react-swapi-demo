import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.props.close}
      />
    ];

    return (
      <Dialog
        title="Planet"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
      {this.props.loading &&
        <div>
          <CircularProgress style={styles.loader}/>
        </div>}
      {!this.props.loading &&
        <List>
          <ListItem
            hoverColor="transparent"
            primaryText="Name"
            secondaryText={this.props.content.name}
          />
          <ListItem
            hoverColor="transparent"
            primaryText="Diameter"
            secondaryText={this.props.content.diameter}
          />
          <ListItem
            hoverColor="transparent"
            primaryText="Climate"
            secondaryText={this.props.content.climate}
          />
          <ListItem
            hoverColor="transparent"
            primaryText="Population"
            secondaryText={this.props.content.population}
          />
        </List>
      }
      </Dialog>
    )
  }
}

const styles = {
  loader: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  }
}
