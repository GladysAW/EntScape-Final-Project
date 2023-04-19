import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './TitleInfo.module.scss';
import ViewByCategory from '../../ViewByCategory/ViewByCategory';

const TitleInfo = (props) => {
  const {
    poster_path,
    title: titleName,
    tagline,
    overview,
    release_date,
    runtime,
    production_countries,
    spoken_languages,
    genres,
  } = props.title;

  const [added, setAdded] = useState(false);
  const [hearted, setHearted] = useState(false);

  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime % 60;

  const shortInfoArray = [
    { tag: 'Release Date', data: release_date },
    { tag: 'Runtime', data: `${runtimeHours}h ${runtimeMinutes}m` },
    { tag: 'Country', data: production_countries[0].name },
    { tag: 'Language', data: spoken_languages[0].english_name },
    { tag: 'Genre', data: genres.map((genre) => genre.name).join(', ') },
  ];

  return (
    <div className={styles.info_container}>
      <div className={styles.upper_container}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt="movie poster"
        />
        <h2>{titleName}</h2>
        <div className={styles.icons_container}>
          <div onClick={() => setAdded((pre) => !pre)}>
            <Icon
              icon={added ? 'charm:tick' : 'ic:baseline-plus'}
              width="44"
              height="44"
            />
          </div>
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
          <Icon icon="icon-park-outline:write" width="35" height="35" />
        </div>
      </div>
      <div className={styles.lower_container}>
        <h3>{tagline}</h3>
        <p>{overview}</p>
        {shortInfoArray.map((info) => {
          return (
            <div key={info.tag} className={styles.mapped_info}>
              <h4>{info.tag}</h4>
              <p>{info.data}</p>
            </div>
          );
        })}
      </div>
      <ViewByCategory />
    </div>
  );
};

export default TitleInfo;