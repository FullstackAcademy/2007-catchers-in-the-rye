import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllCategories from './category/AllCategories'
import SingleCategory from './category/SingleCategory'
import CreateCostume from './costume/CreateCostume'
import NavBar from './NavBar'
import Home from './Home'
import Login from './authentication/Login'



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
          <Route path="/categories/:id" component={SingleCategory} />
          <Route path= "costumes/add" exact component={CreateCostume} />
          <Route path= "/login" exact component={Login} />
        </Switch>
        </main>
        </div>
      </div>
    </Router>
  );
}

export default Routes