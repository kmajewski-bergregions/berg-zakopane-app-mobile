import React from 'react';

import { useTranslation } from 'react-i18next';
import styles from './weatherChart.module.scss';
import Chart from './chart';
import { getIcon } from '../../helpers/weather';

const WeatherChart = ({ weatherForecast }) => {
  const { t } = useTranslation();
  const date = new Date();

  return (
    <div className={styles.chart}>
      <p className={styles.chart__name}>{t('weatherChart.forecast')}</p>
      <div className={styles.chartBox}>
        {weatherForecast.map((icon) => (
          <img
            className={styles.chart__icon}
            src={`${process.env.PUBLIC_URL}/assets/img/weather/dark/${
              date.getHours() < 21 && date.getHours() > 7 ? 'day' : 'night'
            }/${getIcon(icon.weatherCode)}`}
            alt="Ikona pogody"
            key={icon.hour}
          />
        ))}
        <Chart weatherForecast={weatherForecast} />
      </div>
      <div className={styles.legendBox}>
        <div className={styles.legendBox__box}>
          <div className={styles.legendBox__line} />
          <p className={styles.legendBox__paragraph}>{t('weatherChart.temperature')}</p>
        </div>
        <div className={styles.legendBox__box}>
          <div className={styles.legendBox__lineDot} />
          <div className={styles.legendBox__lineDot} />
          <div className={styles.legendBox__lineDot} />
          <div className={styles.legendBox__lineDot} />
          <div className={styles.legendBox__lineDot} />
          <div className={styles.legendBox__lineDot} />
          <p className={styles.legendBox__paragraph}>{t('weatherChart.perceivedTemperature')}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;
