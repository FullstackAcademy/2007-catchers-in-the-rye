import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../../redux/categories'

class CreateCostume extends Component {
    constructor () {
        super()
        this.state = {
            costumeName: '',
            price: 0,
            quantity: 0,
            imageUrl: '',
            categoryId: 0,
        }
        this.submitCostume = this.submitCostume.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.props.fetchCategories();
    }
    submitCostume (ev) {
        const { state, props } = this
        const { costumeName, price, quantity, imageUrl, categoryId } = state
        const { createCostume } = props
        ev.preventDefault()
        if (!costumeName) {
            alert("What is this costume's name?")
        } else if (price <= 0) {
            alert("Our prices may be so low they're scary, but not THIS scary! Add a price greater than 0!")
        } else if (quantity < 0) {
            alert("Quantity must be at least 0")
        } else {
            createCostume({
                costumeName: costumeName,
                price: price,
                quantity: quantity,
                imageUrl: imageUrl,
                categoryId: categoryId
            })
        }
    }
    handleChange (ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    render () {
        const { state, props, submitCostume, handleChange } = this
        const { costumeName, price, quantity, imageUrl, category } = state
        const { categories } = props
        return (
            <div>
                <p>Create New Costume</p>
                <form onSubmit = {submitCostume}>
                    <label htmlFor= "costumeName">Costume Name:</label>
                    <input name= "costumeName" type= "text" value= {costumeName} onChange= { handleChange } /><br /><br />
                    <label htmlFor= "price">Price:</label>
                    <input name= "price" type= "number" value= {price} onChange= { handleChange } /><br /><br />
                    <label htmlFor= "quantity">Quantity in Stock:</label>
                    <input name= "quantity" type= "number" value= {quantity} onChange= { handleChange } /><br /><br />
                    <label htmlFor= "imageUrl">Image URL:</label>
                    <input name= "imageUrl" type= "text" value= {imageUrl} onChange= { handleChange } /><br /><br />
                    <label htmlFor= "categoryId">Category:</label>
                    <select name= "categoryId" defaultValue= {categoryId} onChange= { handleChange }>
                        {
                            categories.map(category =>
                                <option key= {category.id} value={category.id}>{category.title}</option>)
                        }
                    </select><br /><br />
                    <button type= "submit">Create Costume</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
};

const mapDispatchToProps = dispatch => {
	return {
        fetchCategories: () => {
            dispatch(fetchCategories())
        },
        createCostume: (costume) => {
            dispatch(createCostume(costume))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCostume)