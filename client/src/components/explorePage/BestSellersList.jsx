import React, { useState, useEffect } from 'react';
import styles from '../card/Card.module.scss';
import axios from 'axios';
import BookCard from '../card/BookCard';
import Loading from '../loading/Loading.jsx';

const BestSellersList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/books/popular');
        setBooks(res.data.slice(0, 20));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className={styles.top_h1}>Top Bestsellers Books</h1>
          <div className={styles.explore}>
            {books.map(
              ({
                data: {
                  authors,
                  title,
                  infoLink,
                  imageLinks: { thumbnail },
                },
                id,
              }) => (
                <BookCard
                  key={infoLink}
                  authors={authors}
                  title={title}
                  thumbnail={thumbnail}
                  id={id}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellersList;
