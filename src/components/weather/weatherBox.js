import React from 'react';

import { useTranslation } from 'react-i18next';
import { getIcon } from '../../helpers/weather';
import styles from './weatherBox.module.scss';

const WeatherBox = ({ weatherData }) => {
  const { t } = useTranslation();
  const date = new Date();

  return (
    <div className={styles.weather}>
      <div className={styles.weather__column}>
        <img
          className={styles.weather__icon}
          src={`${process.env.PUBLIC_URL}/assets/img/weather/dark/${
            date.getHours() < 21 && date.getHours() > 7 ? 'day' : 'night'
          }/${getIcon(weatherData.weatherCode)}`}
          alt="Ikona pogody"
        />
        <p className={styles.weather__temperature}>{weatherData.temperatureValue}&deg;C</p>
      </div>
      <div className={styles.weather__column}>
        <p className={styles.weather__paragraph}>
          <img
            className={styles.weather__iconSmall}
            src={`${process.env.PUBLIC_URL}/assets/img/weather_temp.svg`}
            alt="Point icon"
          />
          <span style={{ fontWeight: 400 }}>
            {t('weatherBox.perceivedTemperature')}&nbsp;
            <span>{weatherData.perceivedTemperature}&deg;C</span>
          </span>
        </p>
        <p className={styles.weather__paragraph}>
          <img
            className={styles.weather__iconSmall}
            src={`${process.env.PUBLIC_URL}/assets/img/weather_wind.svg`}
            alt="Point icon"
          />
          {t('weatherBox.wind')}&nbsp;
          <span>
            {weatherData.windDirection}&nbsp;
            {weatherData.windValue}km/h&nbsp;
          </span>
        </p>
      </div>
      <div className={styles.weather__column}>
        <p className={styles.weather__paragraph}>
          <img
            className={styles.weather__iconSmall}
            src={`${process.env.PUBLIC_URL}/assets/img/weather_humidity.svg`}
            alt="Point icon"
          />
          {t('weatherBox.humidity')}&nbsp;<span>{weatherData.humidityValue}%</span>
        </p>
        <p className={styles.weather__paragraph}>
          <img
            className={styles.weather__iconSmall}
            src={`${process.env.PUBLIC_URL}/assets/img/weather_pressure.svg`}
            alt="Point icon"
          />
          {t('weatherBox.pressure')}&nbsp;<span>{weatherData.atmosphericPressure} hPa</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherBox;
