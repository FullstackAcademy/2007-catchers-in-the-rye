// Not in use now, but may be re-appropriated for admin use later

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fetchCategories } from '../../redux/categories/allCategories';

// class AllCategories extends Component {
//   componentDidMount() {
//     this.props.fetchCategories();
//   }

//   render() {
//     const { categories } = this.props;
//     return (
//       <div id="allCategories">
//         <h1>All Categories</h1>
//         <ul id="categoryList">
//           {
//                             categories.map((category) => (
//                               <li key={category.id} className="category">
//                                 <Link to={`/categories/${category.title}`}>{category.title}</Link>
//                               </li>
//                             ))
//                         }
//         </ul>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   categories: state.categories,
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchCategories: () => {
//     dispatch(fetchCategories());
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);
