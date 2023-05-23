import React, { useState, useEffect } from 'react';
import TvShowCard from '../card/TvShowCard';
import styles from '../card/Card.module.scss';
import axios from 'axios';
import Loading from '../loading/Loading.jsx';

const TvShowsList = () => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/tvshows/popular');
        setTVShows(response.data.slice(0, 20));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  return (
    <>
      {' '}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className={styles.top_h1}>Top Popular English TV Shows</h1>
          <div className={styles.explore}>
            {tvShows.map((tvShow) => (
              <TvShowCard
                key={tvShow.id}
                title={tvShow.name}
                posterPath={tvShow.poster_path}
                id={tvShow.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TvShowsList;
