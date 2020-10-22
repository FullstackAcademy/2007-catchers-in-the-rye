import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { Route, NavLink } from 'react-router-dom'
// import AllCostumes from './AllCostumes'
// import SingleCostume from './SingleCostume'
// import AllCategories from './AllCategories'
// import SingleCategory from './SingleCategory'

const Routes = () => {
    return (
      <Router>
        <div>
            <hr />
            {/* <Route path="/costumes" exact component={AllCostumes} />
            <Route path="/costumes/:id" component={SingleCostume} />
            <Route path="/categories" exact component={AllCategories} />
            <Route path="/categories/:id" component={SingleCategory} /> */}
      </div>
      </Router>
    );
  }

export default Routes