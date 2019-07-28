import React, {Component} from 'react';
import './App.css';
import BooksList from './components/books/BooksList';

class App extends Component {

    constructor() {
        super();
        this.state = {
            books: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
		});
		
		// Used CORS proxy to overcome cross-site error when fetching from API
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'http://starlord.hackerearth.com/books';

		fetch(proxyurl + url)
            .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        loading: false,
                        books: data
                    })
                })
    }

    render() {
        const books = this.state.loading ? "Loading" : this.state.books;
        if(books === "Loading") {
            return (
                <h1 className="text-center" style={{ marginTop: '15%' }}>Loading...</h1>
            )
        }
        else if (books !== "Loading" && Object.keys(books).length === 0) {
            return (
                <h1>Sorry, the API server seems to be down!</h1>
            )
        }

        else if(books !== "Loading" && Object.keys(books).length !== 0) {
			console.log("Books are : ", books.slice(0,10))
			console.log("Total books: ", books.length)
			let someBooks = books.slice(0,20);
			// let self = this;
			const booksComponents = someBooks.map(function(book, index){ 
				return(
					<BooksList key={ index }
							bookID = { book.bookID }
							title={ book.title }
							authors={ book.authors }
							price={ book.price }
							avgRating={ book.average_rating }
							ratingCount={ book.ratings_count }
							langCode={ book.language_code }
							isbn={ book.isbn }
					/>
				)            
			});
			return (
				<div>
					<input type="search" 
						className="form-control"
						placeholder="Search by Book or Author's Name..." />
					
					<div className="table-responsive">
						<table className="table table-dark table-hover">
							<thead>
								<tr>
									<th scope="col">Book ID</th>
									<th scope="col">Title</th>
									<th scope="col">Authors</th>
									<th scope="col">Price</th>
									<th scope="col">Rating</th>
									<th scope="col">Total Ratings</th>
									<th scope="col">Language Code</th>
									<th scope="col">ISBN</th>
									<th scope="col">Checkout</th>
								</tr>
							</thead>
							<tbody>
								{ booksComponents }
							</tbody>
						</table>
					</div>
				</div>
            );
        }
    }
}


export default App;
