import React from 'react';
import { Link } from 'react-router-dom';

const Costume = (props) => {
    const { costume } = props
    return (
        <div className="costume" role="listitem">
            <div>
                <img src={costume.imageUrl} />
            </div>
            <div className="details">
                <div>{costume.costumeName}</div> 
                <br />
                <div className="old">WAS</div>
                <div className="old-price">${(costume.price / (1 - costume.discount)).toFixed(2)}</div>
                <br />
                <div className="new">NOW ONLY</div>
                <div className="new-price">${costume.price.toFixed(2)}</div>
                <br />
                <div><Link to={`/costumes/${costume.costumeName}/${costume.id}`}>Details</Link></div>
            </div>
        </div>
    )
}


export default Costume
