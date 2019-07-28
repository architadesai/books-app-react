import React, {Component} from 'react';
import './App.css';
import BooksList from './components/books/BooksList';
import Checkout from './components/books/Checkout';

class App extends Component {

    constructor() {
        super();
        this.state = {
            books: [],
			loading: false,
			checkoutBook: false,
			checkoutBookID: -1,
			showSearchedBooks: false,
			searchedBooks: []
		}
		this.handleBookCheckout = this.handleBookCheckout.bind(this);
		this.searchBooks = this.searchBooks.bind(this);
	}
	
	handleBookCheckout(event, book_id) {
        this.setState({
            checkoutBook: true,
            checkoutBookID: book_id
        });
	}
	
	searchBooks(event) {
		if(event.key === 'Enter') {

			let search_term = event.target.value.toLowerCase();
			const books = this.state.books;
			let resulted_books = [];
			// Find books by title & authors having the search term
			books.find(function(element){
				let current_book = element;
				if(typeof current_book.title === 'string' || current_book.title instanceof String) {
					let current_book_title = current_book.title.toLowerCase();
					let current_book_author = current_book.authors.toLowerCase();

					if(current_book_title.includes(search_term)) {
						resulted_books.push(element);
					}
					else if(current_book_author.includes(search_term)) {
						resulted_books.push(element);
					}
				}
			})

			// If books exist for searched keyword
			if(resulted_books.length !== 0) {
				this.setState({
					showSearchedBooks: true,
					searchedBooks: resulted_books
				});
			}
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
			 // When a book will be checked out
			if(this.state.checkoutBook === true) {
				let book_id = this.state.checkoutBookID;
				// returns the index of element in the list with our desired book ID
				let book_index_in_list = books.findIndex((elem) => elem.bookID === book_id)

                return(
                    <Checkout 
						title={ books[book_index_in_list].title }
						authors= {books[book_index_in_list].authors }
						price={ books[book_index_in_list].price }
                    />
                )
			}
			
			let someBooks;
			if(this.state.showSearchedBooks === true) {
				someBooks = this.state.searchedBooks;
			}
			// Show first 20 books when app loads
			else {
				someBooks = books.slice(0,20);
			}
			// console.log("Total books in DB: ", books.length)

			let self = this;
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
							checkoutBook={self.handleBookCheckout}
					/>
				)            
			});
			return (
				<div>
					<input type="search" 
						className="form-control"
						placeholder="Search by Book or Author's Name..." 
						onKeyDown={ this.searchBooks }
					/>
					
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
