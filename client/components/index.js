import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import AllCostumes from './AllCostumes'
// import SingleCostume from './SingleCostume'
import AllCategories from './category/AllCategories'
import SingleCategory from './category/SingleCategory'
import NavBar from './NavBar'
import Home from './Home'
import Login from './Login'

const Routes = () => {
  return (
    <Router>
      <div>
        {/* <hr />
        <p>Buy our costumes!</p> */}
        <Route render={() => <NavBar />} />
        <Switch>
          <Route exact path="/home" exact component={Home}></Route> 
          {/* <Route exact path="/categories" component={AllCategories} />
          <Route path="/categories/:id" component={SingleCategory} />
          <Route path="/login" component={Login} /> */}

          {/* <Route path="/costumes" exact component={AllCostumes} />
            <Route path="/costumes/:id" component={SingleCostume} />
             */
          }
        </Switch>
      </div>
    </Router>
  );
}

export default Routes