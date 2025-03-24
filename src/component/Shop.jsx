import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation
import '../css/shop.css';
import MainHeading from './MainHeading';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [showPurchasedBooks, setShowPurchasedBooks] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Get the search term from the URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get('search') || '';

  // Fetch books from Open Library API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://openlibrary.org/subjects/fiction.json?limit=150'
        );
        if (response.data && response.data.works) {
          const processedBooks = response.data.works.map((book) => {
            const price = (Math.random() * 20 + 9.99).toFixed(2);
            return {
              id: book.key.split('/').pop(),
              title: book.title,
              author: book.authors ? book.authors[0]?.name : 'Unknown Author',
              coverId: book.cover_id || book.cover_i,
              description: book.description || 'No description available for this book.',
              price: price,
              rating: (Math.random() * 5).toFixed(1),
              publicationYear: book.first_publish_year || 'Unknown',
              pages: Math.floor(Math.random() * 500 + 100),
            };
          });
          setBooks(processedBooks.slice(0, 100));
        } else {
          throw new Error('Failed to fetch books');
        }
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Set the initial search term from the URL
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  // Filter and sort books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    } else if (sortBy === 'priceAsc') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === 'priceDesc') {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortBy === 'rating') {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return 0;
  });

  // Get current books for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open modal with book details
  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  // Add to cart
  const addToCart = (book) => {
    const existingItem = cart.find((item) => item.id === book.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
    const notification = document.getElementById('cart-notification');
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Toggle cart visibility
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // Buy now
  const buyNow = (book) => {
    setPurchasedBooks([...purchasedBooks, book]); // Add book to purchased books
    alert(`"${book.title}" has been purchased successfully!`);
  };

  // Toggle purchased books view
  const togglePurchasedBooks = () => {
    setShowPurchasedBooks(!showPurchasedBooks);
  };

  if (loading) {
    return (
      <div>
        <MainHeading />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing books for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <MainHeading />
      <div className="shop-container">
        {/* Search, Sort, and Cart Tools */}
        <div className="shop-tools">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="search-icon">🔍</i>
          </div>
          <div className="sort-dropdown">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortBy} onChange={handleSort}>
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
          {/* Purchased Books Button */}
          <button className="purchased-books-btn" onClick={togglePurchasedBooks}>
            Purchased Books
          </button>
          {/* Cart Icon */}
          <div className="cart-icon" onClick={toggleCartVisibility}>
            <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            <i>🛒</i>
          </div>
        </div>

        {/* Display Purchased Books */}
        {showPurchasedBooks && (
          <div className="purchased-books-list">
            <h3>Purchased Books</h3>
            {purchasedBooks.length === 0 ? (
              <p>No books purchased yet.</p>
            ) : (
              <div className="book-grid">
                {purchasedBooks.map((book) => (
                  <div key={book.id} className="book-card" onClick={() => openModal(book)}>
                    <div className="book-cover">
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                        alt={`Cover of ${book.title}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-book-cover.jpg';
                        }}
                      />
                    </div>
                    <div className="book-info">
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">by {book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Display Cart Items */}
        {isCartVisible && (
          <div className="cart-items">
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <div className="cart-item">
                      <img
                        src={`https://covers.openlibrary.org/b/id/${item.coverId}-M.jpg`}
                        alt={`Cover of ${item.title}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-book-cover.jpg';
                        }}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h4>{item.title}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                        <div className="cart-item-actions">
                          <button
                            className="view-details-btn"
                            onClick={() => openModal(item)}
                          >
                            View Details
                          </button>
                          <button
                            className="remove-from-cart-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Main Book Grid */}
        {!showPurchasedBooks && (
          <>
            <div className="book-grid">
              {currentBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="book-cover">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                      alt={`Cover of ${book.title}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-book-cover.jpg';
                      }}
                    />
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <div className="book-price-rating">
                      <span className="book-price">${book.price}</span>
                      <span className="book-rating">⭐ {book.rating}</span>
                    </div>
                    <button
                      className="view-details-btn"
                      onClick={() => openModal(book)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filteredBooks.length === 0 && (
              <div className="no-results">
                <h3>No books found matching "{searchTerm}"</h3>
                <p>Try a different search term or browse our collection.</p>
              </div>
            )}
            {/* Pagination */}
            {filteredBooks.length > 0 && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  &laquo; Prev
                </button>
                {Array.from({ length: Math.ceil(sortedBooks.length / booksPerPage) }).map((_, index) => {
                  if (
                    index === 0 ||
                    index === Math.ceil(sortedBooks.length / booksPerPage) - 1 ||
                    (index >= currentPage - 2 && index <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (
                    index === currentPage - 3 ||
                    index === currentPage + 3
                  ) {
                    return <span key={index} className="ellipsis">...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedBooks.length / booksPerPage)}
                  className="page-btn"
                >
                  Next &raquo;
                </button>
              </div>
            )}
          </>
        )}

        {/* Book Details Modal */}
        {showModal && selectedBook && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModal}>
                &times;
              </button>
              <div className="modal-book-details">
                <div className="modal-book-cover">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${selectedBook.coverId}-L.jpg`}
                    alt={`Cover of ${selectedBook.title}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-book-cover.jpg';
                    }}
                  />
                </div>
                <div className="modal-book-info">
                  <h2>{selectedBook.title}</h2>
                  <h3>by {selectedBook.author}</h3>
                  <div className="book-meta">
                    <span className="book-year">Published: {selectedBook.publicationYear}</span>
                    <span className="book-pages">Pages: {selectedBook.pages}</span>
                    <span className="book-rating">Rating: ⭐ {selectedBook.rating}</span>
                  </div>
                  <div className="book-price-large">${selectedBook.price}</div>
                  <p className="book-description">{selectedBook.description}</p>
                  <div className="book-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(selectedBook)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="buy-now-btn"
                      onClick={() => buyNow(selectedBook)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        )}

        {/* Cart notification */}
        <div id="cart-notification" className="cart-notification">
          Item added to cart!
        </div>
      </div>
    </div>
  );
};

export default Shop;