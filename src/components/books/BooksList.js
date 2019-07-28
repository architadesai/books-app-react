import React, {Component} from 'react';
import StarRatings from '../../../node_modules/react-star-ratings';


class BooksList extends Component {


    constructor() {
        super();
        this.state = {
            bookClicked: false
        }
    }

    render(props) {
        
        const cartStyle = {
            fontSize:'20px'
        }

        return (
            <tr>
                <th scope="row">{ this.props.bookID }</th>
                <td> { this.props.title } </td>
                <td>{ this.props.authors }</td>
                <td>{ this.props.price }</td>
                {/* <td>{ this.props.avgRating }</td> */}
                <td style={{ width: '8%' }}>
                    <StarRatings 
                    rating={ this.props.avgRating }
                    starDimension="13px"
                    starSpacing="0px"
                    numberOfStars={ 5 }
                    />
                </td>
                <td>{ this.props.ratingCount }</td>
                
                <td>{ this.props.langCode }</td>  
                <td>{ this.props.isbn }</td>
                <td> 
                    <button className="text-center" style={ cartStyle }>
                        <i className="fa fa-cart-plus"></i>
                    </button> 
                </td>
            </tr>
        )
    }
}

export default BooksList;
