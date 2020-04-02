import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChamge: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChamge, robots, isPending } = this.props;

    const filterRobotos = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1>RoboFriends</h1>
          <SearchBox searchChange={onSearchChamge} />
          <Scroll>
            <CardList robots={filterRobotos} />
          </Scroll>
        </div>
      )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);