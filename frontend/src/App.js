// React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { addItems, updateItemsAmount, removeItems, setUser } from './actions';

// Components
import { NavBar } from './components';
import { Home, SignIn, SignUp, Communities, CommunityDetails, Contact, EmailVerification } from './pages';
class App extends Component {

  render() {
    return (
      // URL dependant component rendering
      <Router>
        {/* Universal Components */}
        <NavBar />
        <Switch>
          {/* Universal Pages */}
          <Route exact path='/' component={Home} />
          <Route path='/signIn' component={SignIn} />
          <Route path='/signUp' component={SignUp} />
          <Route exact path='/communities' component={Communities} />
          <Route path='/communities/:communityId' component={CommunityDetails} />
          <Route path='/contact' component={Contact} />
          <Route path='/emailVerification' component={EmailVerification} />
          {/* Non-verified user Pages */}
          {/* Verified User Pages */}
          {/* Admin User Pages */}
        </Switch>
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
