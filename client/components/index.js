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



class Routes extends Component {
  async componentDidMount() {
    await this.props.dispatchLoadCostumes()
  }

  render() {
    return (
      <Router>
        <div>
          <Route render={() => <NavBar />} />
          <div className="container">
            <main>
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/categories" exact component={AllCategories} />
                <Route path="/categories/:id" component={SingleCategory} />
                <Route path="/costumes/:name" component={SingleCostume} />
                <Route path="costumes/add" exact component={CreateCostume} />
                <Route path="/login" exact component={Login} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
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