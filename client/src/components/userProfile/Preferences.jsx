import React, { useState, useContext } from 'react';
import axios from 'axios';
import styles from './Preferences.module.scss';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../data/context';
import img from '../../assets/Select-cuate.png';
import { toast } from 'react-toastify';

const Preferences = () => {
  const { usersDispatch } = useContext(DataContext);
  const [bookLover, setBookLover] = useState(false);
  const [movieWatcher, setMovieWatcher] = useState(false);
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const genresList = [
    { name: 'Romance', id: '10749' },
    { name: 'Science Fiction', id: '878' },
    { name: 'Fantasy', id: '14' },
    { name: 'Mystery', id: '9648' },
    { name: 'Thriller', id: '53' },
    { name: 'Horror', id: '27' },
    { name: 'History', id: '36' },
    { name: 'Adventure', id: '12' },
    { name: 'Drama', id: '18' },
    { name: 'Crime', id: '80' },
    { name: 'Comedy', id: '35' },
  ];

  const handleBookLoverChange = () => {
    if (!bookLover) {
      setBookLover(true);
      setMovieWatcher(false);
    } else {
      setBookLover(false);
    }
  };

  const handleMovieWatcherChange = () => {
    if (!movieWatcher) {
      setMovieWatcher(true);
      setBookLover(false);
    } else {
      setMovieWatcher(false);
    }
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    const genreName = event.target.name;
    if (genres.some((genre) => genre.id === genreId)) {
      // If the genre is already in the array, remove it
      setGenres(genres.filter((genre) => genre.id !== genreId));
    } else {
      // If the genre is not in the array, add it
      setGenres([...genres, { id: genreId, name: genreName }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/users/preferences', {
        preferences: bookLover ? 'bookLover' : 'movieWatcher',
        genres: genres.map(({ id, name }) => ({ id, name })),
      });
      if (response.status === 200) {
        usersDispatch({
          type: 'UPDATE_PREFERENCES',
          payload: {
            preferences: {
              bookLover,
              movieWatcher,
            },
          },
        });
        // alert('Your preferences were submitted');
        toast.success('Your preferences have been submitted!');
        navigate('/explore');
      }
    } catch (error) {
      console.error('Failed to store preferences:', error.response.data);
    }
  };

  return (
    <div className={styles.preferences_container}>
      <div className={styles.img_container}>
        <img src={img} alt="" />
      </div>
      <div className={styles.preferences}>
        <h1> We'd love to get to know you better! </h1>
        <p>
          This will help us tailor our content to your preferences and
          interests.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.movie_books}>
            <p className={styles.label}>Do you prefer books or movies?</p>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={bookLover}
                onChange={handleBookLoverChange}
              />
              <span className={styles.checkmark}></span> Book Lover
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={movieWatcher}
                onChange={handleMovieWatcherChange}
              />
              <span className={styles.checkmark}></span> Movie Watcher
            </label>
          </div>

          <div className={styles.genres}>
            <p className={styles.label}>Select your favorite genres:</p>
            {genresList.map((genre, index) => (
              <label key={index} className={styles.checkbox}>
                <input
                  type="checkbox"
                  value={genre.id}
                  checked={genres.some((g) => g.id === genre.id)}
                  onChange={handleGenreChange}
                  name={genre.name}
                />

                <span className={styles.checkmark}></span>
                {genre.name}
              </label>
            ))}
          </div>

          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
