/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Moment from 'react-moment';
import 'moment/locale/pl';
import 'moment/locale/en-gb';
import { useTranslation } from 'react-i18next';
import { getIcon } from '../../helpers/weather';
import styles from './header.module.scss';
import Navigation from './components/navigation';

const Header = ({
  changeLanguage,
  languagePl,
  weatherData,
  setShowMenuObjectSelect,
  setShowMenuEventSelect,
}) => {
  const { t } = useTranslation();
  const date = new Date();

  return (
    <header
      className={styles.header}
      onClick={() => {
        setShowMenuObjectSelect(false);
        setShowMenuEventSelect(false);
      }}
    >
      <div className={styles.headerTop}>
        <div className={styles.date}>
          <p className={styles.date__time}>
            <Moment interval={1000} format="HH:mm" />
          </p>
          <p className={styles.date__date}>
            {languagePl ? (
              <Moment interval={1000} format="DD MMMM YYYY" locale="pl" />
            ) : (
              <Moment interval={1000} format="DD MMMM YYYY" locale="en-gb" />
            )}
          </p>
        </div>
        <div className={styles.logo}>
          <img
            className={styles.logo__logo}
            src={`${process.env.PUBLIC_URL}/assets/img/logo_zakopane_3.svg`}
            alt="Zakopane"
          />
          <p className={styles.logo__description}>{t('navigation.name')}</p>
        </div>
        <div className={styles.weather}>
          <div className={styles.weather__container}>
            <img
              className={styles.weather__icon}
              src={`${process.env.PUBLIC_URL}/assets/img/weather/dark/${
                date.getHours() < 21 && date.getHours() > 7 ? 'day' : 'night'
              }/${getIcon(weatherData.weatherCode)}`}
              alt="Ikona pogody"
            />
            <p className={styles.weather__temperature}>{weatherData.temperatureValue}&deg;C</p>
          </div>
          {languagePl ? (
            <>
              <button
                className={styles.weather__button}
                type="button"
                onClick={() => changeLanguage('en')}
              >
                <img
                  className={styles.weather__flag}
                  src={`${process.env.PUBLIC_URL}/assets/img/flag-poland.svg`}
                  alt="Flaga wybranego języka"
                />
                <p className={styles.weather__paragraph}>PL</p>
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.weather__button}
                type="button"
                onClick={() => changeLanguage('pl')}
              >
                <img
                  className={styles.weather__flagEn}
                  src={`${process.env.PUBLIC_URL}/assets/img/flag-en.svg`}
                  alt="Flaga wybranego języka"
                />
                <p className={styles.weather__paragraph}>EN</p>
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.headerBottom}>
        <Navigation languagePl={languagePl} />
      </div>
    </header>
  );
};

export default Header;
