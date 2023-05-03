import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './TitleInfo.module.scss';

const TitleInfo = ({ title, isBook, isLoading }) => {
  const [infoArray, setInfoArray] = useState([]);
  const {
    // Destructuring for movies and tv shows
    poster_path,
    tagline,
    overview,
    release_date,
    runtime,
    production_countries,
    original_language,
    genres,
    backdrop_path,
    title: titleName,
    // Destructuring for books
    pageCount,
    language,
    imageLinks,
    description,
    authors,
    categories,
    publishedDate,
  } = title;
  // const { thumbnail, smallThumbnail, small, medium, large } = imageLinks;

  const posterURL = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

  const languageNamesInEnglish = new Intl.DisplayNames(['en'], {
    type: 'language',
  });

  // const [added, setAdded] = useState(false);
  const [hearted, setHearted] = useState(false);

  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime % 60;

  useEffect(() => {
    if (!isBook) {
      const shortInfoArray = [
        { tag: 'Genre', data: genres.map((genre) => genre.name).join(', ') },
        { tag: 'Release Date', data: release_date },
        { tag: 'Runtime', data: `${runtimeHours}h ${runtimeMinutes}m` },
        { tag: 'Country', data: production_countries[0].name },
        { tag: 'Language', data: languageNamesInEnglish.of(original_language) },
      ];
      setInfoArray(shortInfoArray);
    } else {
      const cleanedCategories = new Set();
      categories?.map((set) =>
        set.split(' / ').map((single) => cleanedCategories.add(single))
      );

      const shortInfoArray = [
        { tag: 'Author', data: authors.join(', ') },
        { tag: 'Page Count', data: pageCount },
        { tag: 'Language', data: languageNamesInEnglish.of(language) },
        { tag: 'Published Date', data: publishedDate },
        {
          tag: 'Genre',
          data: Array.from(cleanedCategories).slice(5).join(', '),
        },
      ];
      setInfoArray(shortInfoArray);
    }
  }, [title]);

  // For rendering icons
  const Icons = () => {
    return (
      <>
        <div onClick={() => setHearted((pre) => !pre)}>
          <Icon
            icon={
              hearted
                ? 'material-symbols:heart-minus'
                : 'material-symbols:heart-plus-outline'
            }
            width="35"
            height="35"
          />
        </div>
        <Icon icon="material-symbols:share-outline" width="35" height="35" />
        <Icon icon="material-symbols:reviews-rounded" width="35" height="35" />
      </>
    );
  };

  return (
    <>
      {!isLoading && (
        <div className={styles.info_container}>
          <div
            className={styles.upper_container}
            style={{
              '--background-img': `url(${
                isBook ? imageLinks?.large : posterURL
              })`,
            }}
          >
            <div className={styles.overlay}></div>
            <div className={styles.upper_container_left}>
              <img
                src={
                  isBook
                    ? imageLinks?.small
                    : `https://image.tmdb.org/t/p/w300${poster_path}`
                }
                alt="movie poster"
                className={styles.poster_image}
              />
              <div className={styles.icons_container_under_poster}>
                {Icons()}
              </div>
              <h2 className={styles.title_name}>{titleName}</h2>
            </div>
            <div className={styles.upper_container_right}>
              <h2 className={styles.title_name}>{titleName}</h2>
              <h2 className={styles.tag_line}>{tagline}</h2>
              <p className={styles.overview}>
                {isBook ? description : overview}
              </p>
              <div className={styles.mapped_info_container}>
                {infoArray.map((info) => {
                  return (
                    <div key={info.tag} className={styles.mapped_info}>
                      <h3>{info.tag}</h3>
                      <p>{info.data}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.icons}>
            <div className={styles.icons_container}>{Icons()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default TitleInfo;
