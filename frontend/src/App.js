import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toggleLogged, setShoppingCartInfo, updateAmount, removeItem, setUser} from './actions';

export class App extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  return {
    logged: state.loggedReducer,
    shoppingCartInfo: state.shoppingCartInfoReducer,
    user: state.setUserReducer
  }
})

const mapDispatchToProps = () => {
  return {
    toggleLogged, setShoppingCartInfo, updateAmount, removeItem, setUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(App);
