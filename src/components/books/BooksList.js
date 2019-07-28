import React, {Component} from 'react';


class BooksList extends Component {


    constructor() {
        super();
        this.state = {
            bookClicked: false
        }
    }

    render(props) {
        
        return (
            <tr>
                <th scope="row">{ this.props.bookID }</th>
                <td> { this.props.title } </td>
                <td>{ this.props.authors }</td>
                <td>{ this.props.price }</td>
                <td>{ this.props.avgRating }</td>
                <td>{ this.props.ratingCount }</td>
                <td>{ this.props.langCode }</td>  
                <td>{ this.props.isbn }</td>
            </tr>
        )
    }
}

export default BooksList;
