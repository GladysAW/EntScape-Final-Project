import React from 'react';
import styles from './About.module.scss';
import Contributors from './Contributors';
import Contact from './contact/Contact';
import video from '../../assets/Bokeh Purple.mp4';

const About = () => {
  const contributors = [
    {
      h3: 'Gladys',
      role: 'Frontend Developer',
      p: "'I've always loved watching movies, but I found that I was always forgetting what I had seen or read. When I heard about this project, I knew that it was something that could help me and others like me keep track of our favorite titles and discover new ones.'",
      recommendation1: 'Favorite book: "The Alchemist" by Paulo Coelho',
      recommendation2: 'Favorite movie: "Face Off" ',
    },
    {
      h3: 'Mihaela',
      role: 'Frontend Developer',
      p: "'As a booklover and movie watcher myself, I was frustrated by the lack of a comprehensive app that allowed me to easily track my favorite titles. That's why I was inspired to work on this project and create a solution for myself and others like me.'",
      recommendation1: 'Favorite book: "East of eden" by John Steinbeck',
      recommendation2: 'Favorite movie: "A beautiful mind" ',
    },
    {
      h3: 'Niko',
      role: 'Backend Developer',
      p: "'I've always been interested in technology and its potential to improve people's lives. When I heard about this project, I saw an opportunity to use my skills to create something that could make a real difference for booklovers and movie watchers.'",
      recommendation1: 'Favorite book: "Faust" by  J. W von Goethe',
      recommendation2: 'Favorite movie: "Evil Dead (1981)" ',
    },
    {
      h3: 'Yu-An',
      role: 'Project Manager, Frontend Developer',
      p: " 'I'm passionate about creating innovative solutions to everyday problems, and I saw an opportunity to do just that with this project. By combining my technical expertise with my love of books and movies, I knew that I could help create something truly special.'",
      recommendation1: 'Favorite book: "East of eden" by John Steinbeck',
      recommendation2: 'Favorite movie: "A beautiful mind" ',
    },
  ];
  return (
    <>
      <div className={styles.about_container}>
        <div className={styles.about}>
          <div className={styles.mission}>
            <p>
              For all the bookworms and cinephiles out there,{' '}
              <span> Entscape </span>is a wonderful tribute to{' '}
              <span>the joy </span> of reading and watching movies. It's all
              about the enchanting experiences that occur when readers and movie
              lovers <span>unite</span> to exchange ideas, educate, absorb
              knowledge, engage in discussions, argue, and revel in their shared{' '}
              <span>passion</span> .
            </p>
          </div>
          <div className={styles.video}>
            <video autoPlay muted loop controls>
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <div className={styles.team}>
            <h2>Meet the team</h2>
            <div className={styles.contributors}>
              {contributors.map((contributor, index) => {
                return <Contributors key={index} {...contributor} />;
              })}
            </div>
          </div>
        </div>
        <Contact />
      </div>
    </>
  );
};

export default About;
