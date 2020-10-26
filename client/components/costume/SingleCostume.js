import React, { Component } from "react"
import { connect } from "react-redux"
import loadCostumesDispatch from "../../redux/actions/loadCostumes"

class SingleCostume extends Component {

  render(){
    const currentCostumeName = this.props.match.params.name
    const currentCostume = this.props.costumes.filter((costume) =>
      costume.name === thisCostumeName)
    return (
      <div clasName = "container">

        )
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    costumes: state.costumes
  }
}

const mapDispatchToProps = (dispatch) => {
  {
    return {
      dispatchLoadCostumes: () => dispatch(loadStudentsDispatch())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCostume)