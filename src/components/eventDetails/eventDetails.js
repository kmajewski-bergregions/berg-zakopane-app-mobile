import React from 'react';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import styles from './eventDetails.module.scss';
import Footer from '../footer/footer';

const EventDetails = ({ eventsList }) => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <>
      {eventsList?.events
        .filter((event) => event.id === Number(id))
        .flatMap((event) => (
          <div className={styles.event} key={event.id}>
            <img className={styles.event__image} src={event.imageUrl} alt="Plakat wydarzenia" />
            <div className={styles.container}>
              <h2 className={styles.event__title}>{event.name}</h2>
              <div className={styles.description}>
                <div className={styles.descriptionLeft}>
                  <h4 className={styles.description__subtitle}>
                    {t('eventDetails.descriptionSubtitle')}
                  </h4>
                  <p className={styles.description__info}>
                    <img
                      className={styles.description__icon}
                      src={`${process.env.PUBLIC_URL}/assets/img/icon_clock.svg`}
                      alt="Clock icon"
                    />
                    {event.startDate} - {event.endDate}
                  </p>
                  <p className={styles.description__info}>
                    <img
                      className={styles.description__icon}
                      src={`${process.env.PUBLIC_URL}/assets/img/icon_point.svg`}
                      alt="Point icon"
                    />
                    {event.location}
                  </p>
                </div>
              </div>
              <div>
                <h3 className={styles.description__title}>{t('eventDetails.descriptionTitle')}</h3>
                <p className={styles.description__paragraph}>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      <Footer />
    </>
  );
};

export default EventDetails;
