import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableFooter,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';

import moment from 'moment';
import Popup from '../Popup';

const baseUrl = 'https://swapi.co/api/people/'

export default class SwapiTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      popupOpen: false,
      popupContent: {},
      popupLoading: true,
      people: [],
      filteredPeople: [],
      nextLink: null,
      prevLink: null,
    }
  }

  componentDidMount() {
    this.getPeople(baseUrl);
  }

  getPeople = (url) => {
    this.setState({loading: true});

    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if(data && data.results) {
        this.setState({
          loading: false,
          people: data.results,
          filteredPeople: data.results,
          nextLink: data.next,
          prevLink: data.previous,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getPlanet = (url) => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if(data) {
        this.setState({
          popupLoading: false,
          popupContent: data
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  nextClicked = (url) => () => {
    this.getPeople(url);
  }

  prevClicked = (url) => () => {
    this.getPeople(url);
  }

  openPopup = (url) => () => {

    this.setState({
      popupOpen:true,
    });

    this.getPlanet(url)
  }

  closePopup = () =>{
    this.setState({
      popupOpen: false,
      popupContent: {},
      popupLoading: true
    });
  }

  filterTable = (chosen, index, field) => {
    if(typeof chosen === 'object' && chosen[field] !== null){

      let filterElement = chosen[field];

      let filteredArr = this.state.people.filter((obj) => {

        if(field == 'created' || field == 'edited') {
          return moment(filterElement).isSame(obj[field], 'day');

        } else {
          return obj[field] === filterElement;
        }

      });

      console.log(filteredArr);

      this.setState({
        filteredPeople: filteredArr
      })
    } else {
      this.setState({
        filteredPeople: this.state.people
      })
    }
  }

  renderTableData = (people) => {
    return (
      <TableBody displayRowCheckbox={false}>
        {people.map((person, i) => {
          return (
            <TableRow key={i}>
              <TableRowColumn>{person.name}</TableRowColumn>
              <TableRowColumn>{person.height}</TableRowColumn>
              <TableRowColumn>{person.mass}</TableRowColumn>
              <TableRowColumn>{moment(person.created).format('DD-MM-YYYY')}</TableRowColumn>
              <TableRowColumn>{moment(person.edited).format('DD-MM-YYYY H:MM:SS')}</TableRowColumn>
              <TableRowColumn>
                <FlatButton
                      label="View Planet"
                      onClick={this.openPopup(person.homeworld)}
                    />
              </TableRowColumn>
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  render() {

    let prev = this.state.prevLink !== null;
    let next = this.state.nextLink !== null;

    if(this.state.loading){
      return (
        <div style={styles.container}>
          <CircularProgress style={styles.loader} />
        </div>
      )
    }

    return (
      <div style={styles.container}>
        <Table
          selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Height</TableHeaderColumn>
              <TableHeaderColumn>Mass</TableHeaderColumn>
              <TableHeaderColumn>Created</TableHeaderColumn>
              <TableHeaderColumn>Edited</TableHeaderColumn>
              <TableHeaderColumn>Planet</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>
                <AutoComplete
                  fullWidth={true}
                  onNewRequest={(obj, index) => this.filterTable(obj, index, 'name')}
                  floatingLabelText="Filter by name"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.state.people}
                  dataSourceConfig={{
                    text: 'name',
                    value: 'name'
                  }}
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <AutoComplete
                  fullWidth={true}
                  onNewRequest={(obj, index) => this.filterTable(obj, index, 'height')}
                  floatingLabelText="Filter by height"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.state.people}
                  dataSourceConfig={{
                    text: 'height',
                    value: 'height'
                  }}
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <AutoComplete
                  fullWidth={true}
                  onNewRequest={(obj, index) => this.filterTable(obj, index, 'mass')}
                  floatingLabelText="Filter by mass"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.state.people}
                  dataSourceConfig={{
                    text: 'mass',
                    value: 'mass'
                  }}
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <AutoComplete
                  fullWidth={true}
                  onNewRequest={(obj, index) => this.filterTable(obj, index, 'created')}
                  floatingLabelText="Filter by created"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.state.people}
                  dataSourceConfig={{
                    text: 'created',
                    value: 'created'
                  }}
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
              <AutoComplete
                fullWidth={true}
                onNewRequest={(obj, index) => this.filterTable(obj, index, 'edited')}
                floatingLabelText="Filter by edited"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={this.state.people}
                dataSourceConfig={{
                  text: 'edited',
                  value: 'edited'
                }}
              /></TableHeaderColumn>
              <TableHeaderColumn>Planet</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.renderTableData(this.state.filteredPeople)}
          <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div style={styles.pagination}>
                <FlatButton label="Previous" onClick={this.prevClicked(this.state.prevLink)} primary={true} disabled={!prev}/>
                <FlatButton label="Next" onClick={this.nextClicked(this.state.nextLink)} primary={true} disabled={!next}/>
              </div>
            </TableRowColumn>
          </TableRow>
          </TableFooter>
        </Table>
        <Popup
          open={this.state.popupOpen}
          close={this.closePopup}
          content={this.state.popupContent}
          loading={this.state.popupLoading}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    marginBottom: 50
  },
  loader: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  pagination: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '20%',
  }
}
