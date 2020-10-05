// React
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { addItems, updateItemsAmount, removeItems, setUser } from './actions';

// Components
import { NavBar } from './components';

class App extends Component {

  render() {
    return (
      <Router>
        <NavBar />
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    items: state.itemsReducer
  }
}

const mapDispatchToProps = () => {
  return {
    addItems, updateItemsAmount, removeItems, setUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(App);
