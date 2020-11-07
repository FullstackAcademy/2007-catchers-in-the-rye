import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Costume extends Component {
    render() {
        const { costume, user } = this.props
        return (
            <div className="costume" role="listitem">
                <div>
                    <img src={costume.imageUrl} />
                </div>
                <div className="details">
                    <div className="costume-name">{costume.costumeName}</div> 
                    <br />
                    <div className="old">WAS</div>
                    <div className="old-price">${(costume.price / (1 - costume.discount)).toFixed(2)}</div>
                    <br />
                    <div className="new">NOW ONLY</div>
                    <div className="new-price">${costume.price}</div>
                    <br />
                    <div className="links">
                        <div><Link to={`/costumes/${costume.costumeName}/${costume.id}`}>Details</Link></div>
                        { user.userType === 'admin'
                            ? (
                                <div>
                                    <br />
                                    <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                                        Update
                                    </Link>
                                </div>
                        ) : null }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    costume: ownProps.costume,
    view: ownProps.view,
    user: state.user,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    loadCostumesDispatch: () => dispatch(loadCostumesDispatch()),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Costume);
