/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { zakopaneStyle } from 'helpers/aboutTrail';
import { useTranslation } from 'react-i18next';
import { getIcon } from '../../helpers/weather';
import styles from './aboutTrail.module.scss';
import Footer from '../footer/footer';

const AboutTrail = ({ languagePl }) => {
  const { t } = useTranslation();
  const date = new Date();

  const [weatherDataObject, setWeatherDataObject] = useState([]);
  const [weatherForecastObject, setWeatherForecastObject] = useState([]);
  const lat = 49.29378;
  const lon = 19.95375;

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

  return (
    <>
      {zakopaneStyle.flatMap((object, indexNum) => (
        <div className={styles.object} key={indexNum}>
          <div className={styles.object__imageBox}>
            {object.imageUrl.flatMap((image, imageIndex) => (
              <img className={styles.object__image} src={image} key={imageIndex} alt="Zdjęcie" />
            ))}
          </div>
          <div className={styles.object__descriptionBox}>
            <h2 className={styles.object__name}>{languagePl ? object.name.pl : object.name.en}</h2>
            <p className={styles.object__category}>
              {languagePl ? object.category.pl : object.category.en}
            </p>
            <div className={styles.info}>
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
                <img
                  className={styles.info__photo}
                  src={object.imageUrl[1]}
                  alt="Zdjęcie obiektu"
                />
                <p className={styles.info__paragraph}>
                  {' '}
                  {languagePl ? object.description.pl[2] : object.description.en[2]}
                </p>
                <p className={styles.info__paragraph}>
                  <span style={{ fontStyle: 'italic', fontWeight: 400 }}>
                    {languagePl ? object.description.pl[3] : object.description.en[3]}{' '}
                  </span>
                </p>
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[4] : object.description.en[4]}
                </p>
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[5] : object.description.en[5]}
                </p>
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[6] : object.description.en[6]}
                </p>
                <img
                  className={styles.info__photo}
                  src={object.imageUrl[6]}
                  alt="Zdjęcie obiektu"
                />
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[7] : object.description.en[7]}
                </p>
                <img
                  className={styles.info__photo}
                  src={object.imageUrl[7]}
                  alt="Zdjęcie obiektu"
                />
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[8] : object.description.en[8]}
                </p>
                <img
                  className={styles.info__photo}
                  src={object.imageUrl[8]}
                  alt="Zdjęcie obiektu"
                />
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[9] : object.description.en[9]}
                </p>
                <img
                  className={styles.info__photo}
                  src={object.imageUrl[9]}
                  alt="Zdjęcie obiektu"
                />
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[10] : object.description.en[10]}
                </p>
                <img
                  className={styles.info__photo}
                  src={object.imageUrl[10]}
                  alt="Zdjęcie obiektu"
                />
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[11] : object.description.en[11]}
                </p>
                <img
                  className={styles.info__photo}
                  src={object.imageUrl[11]}
                  alt="Zdjęcie obiektu"
                />
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[12] : object.description.en[12]}
                </p>
                <p className={styles.info__paragraph}>
                  {languagePl ? object.description.pl[13] : object.description.en[13]}
                </p>

                <div className={styles.info__logoBox}>
                  <p className={styles.info__logoBoxParagraph}>{t('cardDetails.logo')}</p>
                  {object.partnersLogo.flatMap((logo, index) => (
                    <img key={index} className={styles.info__logoBoxLogo} src={logo} alt="Logo" />
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
                Zakopane Krupówki
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
          </div>
          <Footer />
        </div>
      ))}
    </>
  );
};

export default AboutTrail;
