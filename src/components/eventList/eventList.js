import React from 'react';

import styles from './eventList.module.scss';

const EventList = ({ attraction }) => (
  <>
    <div className={styles.event} key={attraction.id}>
      <div className={styles.event__boxImage}>
        <img className={styles.event__image} src={attraction.imageUrl} alt="Zdjęcie atrakcji" />
      </div>
      <div className={styles.description}>
        <h2 className={styles.description__title}>{attraction.name}</h2>
        <p className={styles.description__paragraph}>
          <img
            className={styles.description__icon}
            src={`${process.env.PUBLIC_URL}/assets/img/icon_clock.svg`}
            alt="Clock icon"
          />
          {attraction.startDate} - {attraction.endDate}
        </p>

        <p className={styles.description__paragraph}>
          <img
            className={styles.description__icon}
            src={`${process.env.PUBLIC_URL}/assets/img/icon_point.svg`}
            alt="Point icon"
          />
          {attraction.location}
        </p>
      </div>
    </div>
  </>
);

export default EventList;
