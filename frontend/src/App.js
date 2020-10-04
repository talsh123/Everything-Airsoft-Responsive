// React
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { toggleLogged, setShoppingCartInfo, updateAmount, removeItem, setUser } from './actions';

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
    logged: state.loggedReducer,
    shoppingCartInfo: state.shoppingCartInfoReducer,
    user: state.setUserReducer
  }
}

const mapDispatchToProps = () => {
  return {
    toggleLogged, setShoppingCartInfo, updateAmount, removeItem, setUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(App);
