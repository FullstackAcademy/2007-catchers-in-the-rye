import React, { Component } from "react"
import { connect } from "react-redux"
import loadCostumesDispatch from "../../redux/actions/loadCostumes"

class SingleCostume extends Component {
  findCostumeName() {
    let thisCostume = {

    }
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