import React, { useRef } from 'react';
import styles from './LandingPage.module.scss';
import video from '../../assets/Nebula_Background.mp4';
import Animation from './landingAnimation/Animation';

const LandingPage = () => {
  const animationRef = useRef(null);

  const handleArrowClick = () => {
    animationRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <video className={styles.bg_video} autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className={styles.title}>
            <div className={styles.text_h1}>
              <h1>ENTSCAPE</h1>
            </div>
            <div className={styles.text_p}>
              <p>Explore the Universe of Entertainment</p>
            </div>
          </div>
          <div className={styles.arrow} onClick={handleArrowClick}></div>
        </div>
        <div className={styles.parallax}>
          <div ref={animationRef} className={styles.first_section}>
            <p>Discover Movies, Tv-Shows and Books </p>
            <p>..and add them to your Collection</p>
          </div>

          <div className={styles.second_section}>
            <p>
              We pride ourselves on offering tailored recommendations that are
              personalized to your unique preferences. Whether you're looking
              for a new book to read, a movie to watch, or a new tv show to try,
              we've got you covered.{' '}
            </p>
            <p>
              {' '}
              Share your preferences with us today, and let us help you find
              your next favorite thing!
            </p>{' '}
          </div>

          <div className={styles.third_section}>
            <div className={styles.animation}>
              <Animation />
            </div>
            <div className={styles.section_p}>
              <p>
                <span>Entscape</span> - one place to discover them all
              </p>
              <p className={styles.hidden}>
                ..find a title and we will link it across the Universe of
                Entertainment
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
