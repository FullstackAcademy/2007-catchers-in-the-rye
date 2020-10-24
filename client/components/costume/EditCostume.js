import React, { Component } from 'react'
import { connect } from 'react-redux';

class SingleCostume extends Component {
    constructor(props) {
        super(props)
        this.state = {
            costumeName: this.props.costume.costumeName,
            price: this.props.costume.price,
            quantity: this.props.costume.quantity,
            imageUrl: this.props.costume.imageUrl,
            categoryId: this.props.costume.categoryId
        }
    }
    componentDidMount = () => {
        this.props.fetchCostume(this.props.id)
        const { costumeName, price, quantity, imageUrl, categoryId } = this.props.costume
        this.setState({ costumeName, price, quantity, imageUrl, categoryId })
    }
    render () {
        const { state } = this
        const { costumeName, price, quantity, imageUrl, categoryId } = state
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id * 1
    const costume = state.singleCostume
	return {
        id,
        costume
	}
}

const mapDispatchToProps = dispatch => {
	return {
        fetchCostume: (id) => {
            await dispatch(fetchCostume(id))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCostume)