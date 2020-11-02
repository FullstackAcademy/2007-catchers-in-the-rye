import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, browserHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';
import AllCategories from './category/AllCategories';
import SingleCategory from './category/SingleCategory';
import AllCostumes from './costume/AllCostumes';
import CreateCostume from './costume/CreateCostume';
import NavBar from './NavBar';
import Home from './Home';
import Login from './authentication/Login';
import SingleCostume from './costume/SingleCostume';
import Cart from './Cart';
import EditCostume from './costume/EditCostume';
import CreateUser from './authentication/CreateUser';
import { checkCookiesSetSession } from '../redux/authentication/session';
import OrderHistory from './OrderHistory';
import PendingOrders from './admin/PendingOrders';

class Routes extends Component {
  componentDidMount() {
    this.props.checkCookiesSetSession();
  }

  render() {
    return (
      <Router>
        <div>
          <Route render={() => <NavBar />} />
          <div className="container">
            <main>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route path="/home" exact component={AllCostumes} />
                <Route path="/categories/:id" exact component={AllCostumes} />
                <Route path="/costumes/:name/:id" exact component={SingleCostume} />
                <Route path="/costumes/add" exact component={CreateCostume} />
                <Route exact path="/costumes/:name/:costId/:catId/admin" component={EditCostume} />
                <Route path="/login" exact component={Login} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/createUser" exact component={CreateUser} />
                <Route path="/orderHistory" exact component={OrderHistory} />
                <Route path="/admin/pending" exact component={PendingOrders} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  createGuestSession: () => {
    dispatch(createGuestSession());
  },
  refreshSession: (sessionId) => {
    dispatch(refreshSession(sessionId));
  },
  checkCookiesSetSession: () => {
    dispatch(checkCookiesSetSession());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
