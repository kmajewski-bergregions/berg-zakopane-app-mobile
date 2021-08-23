/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { getIcon } from '../../helpers/weather';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import { ReactComponent as Logo } from '../../assets/berg_logo.svg';
import styles from './objectDetails.module.scss';
import Footer from '../footer/footer';

const ObjectDetails = ({ languagePl, object, showFullCard, setShowFullCard }) => {
  const { t } = useTranslation();

  const date = new Date();
  const day = date.getDay();
  const [showDays, setShowDays] = useState(false);
  const [weatherDataObject, setWeatherDataObject] = useState([]);
  const [weatherForecastObject, setWeatherForecastObject] = useState([]);
  const { lat } = object.location;
  const { lon } = object.location;

  const handlerShowDays = () => {
    setShowDays(!showDays);
  };

  useEffect(() => {
    axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url: `https://api.bergregions.pl/api/v1/weather?lat=${lat}&lon=${lon}`,
    }).then((response) => {
      setWeatherDataObject(response.data.currentCondition);
      setWeatherForecastObject(response.data.today);
    });
  }, [lat]);

  let dayNumber;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 6; i++) {
    if (i === day) {
      dayNumber = i;
    }
  }

  const handleOnTouchSmallCard = () => {
    if (showFullCard === false) {
      setShowFullCard(!showFullCard);
    }
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDays(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const clickOutsideRef = useRef(null);
  useOutsideAlerter(clickOutsideRef);

  return (
    <>
      {object && (
        <div className={showFullCard ? styles.objectFull : styles.object} key={object.id}>
          <div className={showFullCard ? styles.object__imageBoxFull : styles.object__imageBox}>
            {object.imageUrl.flatMap((image, imageIndex) => (
              <img className={styles.object__image} src={image} key={imageIndex} alt="Zdjęcie" />
            ))}
          </div>
          <div className={styles.object__descriptionBox} onTouchMove={handleOnTouchSmallCard}>
            <h2 className={styles.object__name}>{languagePl ? object.name.pl : object.name.en}</h2>
            <p className={styles.object__category}>
              {languagePl ? object.category.pl : object.category.en}
            </p>
            <div className={styles.info}>
              <div className={styles.infoLeft}>
                <div className={styles.infoLeft__box}>
                  {object.hour ? (
                    <>
                      <img
                        className={styles.info__icon}
                        src={`${process.env.PUBLIC_URL}/assets/img/icon_clock.svg`}
                        alt="Time icon"
                      />
                      <div ref={clickOutsideRef}>
                        {showFullCard ? (
                          <>
                            <button
                              className={styles.info__timeButton}
                              type="button"
                              onClick={handlerShowDays}
                            >
                              <p className={styles.info__timeLabel}>
                                {day === dayNumber && (
                                  <>
                                    {day === 1 && t('cardDetails.hour.mon')}
                                    {day === 2 && t('cardDetails.hour.tue')}
                                    {day === 3 && t('cardDetails.hour.wen')}
                                    {day === 4 && t('cardDetails.hour.thu')}
                                    {day === 5 && t('cardDetails.hour.fri')}
                                    {day === 6 && t('cardDetails.hour.sat')}
                                    {day === 0 && t('cardDetails.hour.sun')}
                                    &nbsp;
                                    <span>
                                      {object.hour[dayNumber].start === null
                                        ? t('cardDetails.hour.closed')
                                        : `${object.hour[dayNumber].start} - ${object.hour[dayNumber].end}`}
                                    </span>{' '}
                                  </>
                                )}
                              </p>
                              <Arrow className={styles.info__timeArrow} />
                            </button>
                            {showDays && (
                              <div className={styles.info__dayBox} onClick={handlerShowDays}>
                                <div
                                  className={
                                    day === 1
                                      ? styles.info__dayBoxDayActive
                                      : styles.info__dayBoxDay
                                  }
                                >
                                  <p>{t('cardDetails.hour.mon')}</p>
                                  <p>
                                    {object.hour[1].start === null
                                      ? t('cardDetails.hour.closed')
                                      : `${object.hour[1].start} - ${object.hour[1].end}`}
                                  </p>
                                </div>
                                <div
                                  className={
                                    day === 2
                                      ? styles.info__dayBoxDayActive
                                      : styles.info__dayBoxDay
                                  }
                                >
                                  <p>{t('cardDetails.hour.tue')}</p>
                                  <p>
                                    {object.hour[2].start === null
                                      ? t('cardDetails.hour.closed')
                                      : `${object.hour[2].start} - ${object.hour[2].end}`}
                                  </p>
                                </div>
                                <div
                                  className={
                                    day === 3
                                      ? styles.info__dayBoxDayActive
                                      : styles.info__dayBoxDay
                                  }
                                >
                                  <p>{t('cardDetails.hour.wen')}</p>
                                  <p>
                                    {object.hour[3].start === null
                                      ? t('cardDetails.hour.closed')
                                      : `${object.hour[3].start} - ${object.hour[3].end}`}
                                  </p>
                                </div>
                                <div
                                  className={
                                    day === 4
                                      ? styles.info__dayBoxDayActive
                                      : styles.info__dayBoxDay
                                  }
                                >
                                  <p>{t('cardDetails.hour.thu')}</p>
                                  <p>
                                    {object.hour[4].start === null
                                      ? t('cardDetails.hour.closed')
                                      : `${object.hour[4].start} - ${object.hour[4].end}`}
                                  </p>
                                </div>
                                <div
                                  className={
                                    day === 5
                                      ? styles.info__dayBoxDayActive
                                      : styles.info__dayBoxDay
                                  }
                                >
                                  <p>{t('cardDetails.hour.fri')}</p>
                                  <p>
                                    {object.hour[5].start === null
                                      ? t('cardDetails.hour.closed')
                                      : `${object.hour[5].start} - ${object.hour[5].end}`}
                                  </p>
                                </div>
                                <div
                                  className={
                                    day === 6
                                      ? styles.info__dayBoxDayActive
                                      : styles.info__dayBoxDay
                                  }
                                >
                                  <p>{t('cardDetails.hour.sat')}</p>
                                  <p>
                                    {object.hour[6].start === null
                                      ? t('cardDetails.hour.closed')
                                      : `${object.hour[6].start} - ${object.hour[6].end}`}
                                  </p>
                                </div>
                                <div
                                  className={
                                    day === 0
                                      ? styles.info__dayBoxDayActive
                                      : styles.info__dayBoxDay
                                  }
                                >
                                  <p>{t('cardDetails.hour.sun')}</p>
                                  <p>
                                    {object.hour[0].start === null
                                      ? t('cardDetails.hour.closed')
                                      : `${object.hour[0].start} - ${object.hour[0].end}`}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className={styles.infoLeft__paragraph}>
                            {day === dayNumber && (
                              <>
                                {day === 1 && t('cardDetails.hour.mon')}
                                {day === 2 && t('cardDetails.hour.tue')}
                                {day === 3 && t('cardDetails.hour.wen')}
                                {day === 4 && t('cardDetails.hour.thu')}
                                {day === 5 && t('cardDetails.hour.fri')}
                                {day === 6 && t('cardDetails.hour.sat')}
                                {day === 0 && t('cardDetails.hour.sun')}
                                &nbsp;
                                <span>
                                  {object.hour[day].start === null
                                    ? t('cardDetails.hour.closed')
                                    : `${object.hour[day].start} - ${object.hour[day].end}`}
                                </span>{' '}
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className={styles.info__timeLabelClose}>
                      {languagePl ? object.permClosed.pl : object.permClosed.en}
                    </p>
                  )}
                </div>
                <div className={styles.infoLeft__box}>
                  <a
                    className={styles.infoLeft__linkToMap}
                    href={object.urlToMap}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img
                      className={styles.info__icon}
                      src={`${process.env.PUBLIC_URL}/assets/img/icon_point.svg`}
                      alt="Point icon"
                    />
                    <div>
                      <p className={styles.infoLeft__paragraph}>
                        <span>{object.street}</span>
                      </p>
                      <p className={styles.infoLeft__paragraph}>{object.city}</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className={styles.infoRight}>
                <div className={styles.infoRight__box}>
                  <img
                    className={styles.info__icon}
                    src={`${process.env.PUBLIC_URL}/assets/img/icon_phoneQr.svg`}
                    alt="Ikona telefonu"
                  />
                  <p className={styles.infoRight__paragraph}>{t('cardDetails.qrPhoto')}</p>
                </div>
                <img className={styles.infoRight__qr} src={object.qrImage} alt="Kod QR" />
              </div>
            </div>
            {showFullCard && (
              <>
                <div className={styles.info}>
                  <div className={styles.info__descriptionBox}>
                    <p className={styles.info__paragraph}>
                      {languagePl ? object.description.pl[0] : object.description.en[0]}
                    </p>
                    <img
                      className={styles.info__photo}
                      src={object.imageUrl[0]}
                      alt="Zdjęcie obiektu"
                    />
                    <p className={styles.info__paragraph}>
                      {languagePl ? object.description.pl[1] : object.description.en[1]}
                    </p>
                    {object.imageUrl[1] && (
                      <img
                        className={styles.info__photo}
                        src={object.imageUrl[1]}
                        alt="Zdjęcie obiektu"
                      />
                    )}

                    {languagePl &&
                      object.description.pl.slice(2, 20).flatMap((paragraph, index) => (
                        <p key={index} className={styles.info__paragraph}>
                          {paragraph}
                        </p>
                      ))}
                    {!languagePl &&
                      object.description.en.slice(2, 20).flatMap((paragraph, index) => (
                        <p key={index} className={styles.info__paragraph}>
                          {paragraph}
                        </p>
                      ))}

                    <div className={styles.info__logoBox}>
                      <p className={styles.info__logoBoxParagraph}>{t('cardDetails.logo')}</p>
                      {object.partnersLogo?.flatMap((logo, index) => (
                        <img
                          key={index}
                          className={styles.info__logoBoxLogo}
                          src={logo}
                          alt="Logo"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.location}>
                  {t('cardDetails.weather')}
                  <p className={styles.location__name}>
                    <img
                      className={styles.location__icon}
                      src={`${process.env.PUBLIC_URL}/assets/img/icon_point.svg`}
                      alt="Point icon"
                    />
                    {languagePl ? object.name.pl : object.name.en}
                  </p>
                </div>
                <div className={styles.weather}>
                  <div className={styles.weather__boxBorder}>
                    <h2 className={styles.weather__name}>{t('cardDetails.current')}</h2>
                    <div>
                      <img
                        className={styles.weather__icon}
                        src={`${process.env.PUBLIC_URL}/assets/img/weather/dark/${
                          date.getHours() < 21 && date.getHours() > 7 ? 'day' : 'night'
                        }/${getIcon(weatherDataObject.weatherCode)}`}
                        alt="Ikona pogody"
                      />
                      <p className={styles.weather__temperature}>
                        {weatherDataObject.temperatureValue}&deg;C
                      </p>
                    </div>
                  </div>
                  <div className={styles.weather__box}>
                    <h2 className={styles.weather__name}>{t('cardDetails.forecast')}</h2>
                    <div>
                      {weatherForecastObject.slice(10, 11).map((perceived) => (
                        <div key={perceived.hour}>
                          <img
                            className={styles.weather__icon}
                            src={`${process.env.PUBLIC_URL}/assets/img/weather/dark/${
                              date.getHours() < 21 && date.getHours() > 7 ? 'day' : 'night'
                            }/${getIcon(perceived.weatherCode)}`}
                            alt="Ikona pogody"
                          />
                          <p className={styles.weather__temperature}>
                            {perceived.perceivedTemperatureValue}&deg;C
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.berg}>
                  <Logo className={styles.berg__logo} />
                  <p className={styles.berg__content}>
                    Powered by{' '}
                    <a
                      className={styles.berg__link}
                      href="http://bergregions.pl/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>BergRegions</span>
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
          <div className={showFullCard ? styles.footer : styles.footerDisabled}>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default ObjectDetails;
