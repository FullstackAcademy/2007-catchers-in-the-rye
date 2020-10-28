import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux"
import AllCategories from './category/AllCategories'
import SingleCategory from './category/SingleCategory'
import CreateCostume from './costume/CreateCostume'
import NavBar from './NavBar'
import Home from './Home'
import Login from './authentication/Login'
import SingleCostume from "../components/costume/SingleCostume"
import loadCostumesDispatch from '../redux/actions/loadCostumes';
import Cart from './Cart'

const Routes = () => {
  return (
    <Router>
      <div>
        <Route render={() => <NavBar />} />
        <div className="container">
        <main>
        <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/categories" exact component={AllCategories} />
          <Route path="/categories/:title" component={SingleCategory} />
          <Route path="/costumes/:name/:id" component={SingleCostume} />
          <Route path= "costumes/add" exact component={CreateCostume} />
          <Route path= "/login" exact component={Login} />
          <Route path= "/cart" exact component={Cart} />
        </Switch>
        </main>
        </div>
      </div>
    </Router>
  );
}


const mapStateToProps = (state) => {
  return {
    costumes: state.costumes,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoadCostumes: () => dispatch(loadCostumesDispatch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)