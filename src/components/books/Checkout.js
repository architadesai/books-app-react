import React, {Component} from 'react';

class Checkout extends Component {

    render(props){

        const cardStyle = {
            margin: '7% auto'
        }

        return(
            <div className="container">
                <div className="card text-center" style={ cardStyle }>
                    <div className="card-header">
                        SHOPPING CART
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"> { this.props.title } </h5>
                        <p className="card-text">By { this.props.authors } </p>
                        <p className="card-text">Price: ₹{ this.props.price } </p>
                        <button className="btn btn-primary">Proceed to Buy</button>
                    </div>
                </div>
            </div>
        
        )
    }
}

export default Checkout;
