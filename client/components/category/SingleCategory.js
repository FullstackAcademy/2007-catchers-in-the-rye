import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/singleCategory'

class SingleCategory extends Component {
  constructor(props){
    super(props)
    this.state = {
      category: {}
    }
  }
  async componentDidMount(){
    const category = this.props.categories.find(c => c.title = this.props.match.params.title)
    //console.log(category)
    //const selectedCategory = await this.props.selectCategory(category.id)
    // console.log(selectedCategory)
    if (category){
      this.setState({category})
    }
  }
  render() {
    const {category} = this.state
    const costumesInCategory = this.state.category.costumes
    console.log(typeof(costumesInCategory))
    return (
      <div id="singleCategory">
        <h1>{category.title}</h1>
          {/* <ul>
            {costumesInCategory.map(costume => {
              return (
                <li>
                  <div>
                    {costume.imageUrl}
                    {costume.costumeName}
                  </div>
                </li>
              )
            })}
          </ul> */}
      </div>
    )
  }
};

// const mapStateToProps = (state, ownProps) => {
//   const selectedId = ownProps.match.params.id * 1
//   const selectedCategory = state.selectedCategory
//   return {
//     selectedId,
//     selectedCategory
//   }
// };

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: id => {
      dispatch(selectCategory(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)