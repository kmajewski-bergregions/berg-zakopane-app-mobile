import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { weatherLocation } from 'helpers/weatherLocation';
import WeatherBox from 'components/weather/weatherBox';
import WeatherChart from 'components/weather/weatherChart';
import Footer from 'components/footer/footer';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import { ReactComponent as Point } from '../../assets/icon_point.svg';
import styles from './index.module.scss';

const WeatherPage = () => {
  const [index, setIndex] = useState(1);
  const [lat, setLat] = useState(49.29378);
  const [lon, setLon] = useState(19.95375);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState([]);

  const handleButtonRight = () => {
    if (weatherLocation.length > index) {
      setIndex(index + 1);
    } else {
      setIndex(1);
    }
  };

  const handleButtonLeft = () => {
    if (index === 1) {
      setIndex(weatherLocation.length);
    } else setIndex(index - 1);
  };

  useEffect(() => {
    let result;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      if (index === i) {
        setLat(weatherLocation[i - 1].location.lat);
        setLon(weatherLocation[i - 1].location.lon);
      }
    }
    return result;
  }, [index]);

  useEffect(() => {
    axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      url: `https://api.bergregions.pl/api/v1/weather?lat=${lat}&lon=${lon}`,
    }).then((response) => {
      setWeatherData(response.data.currentCondition);
      setWeatherForecast(response.data.today);
    });
  }, [lat]);

  return (
    <div className={styles.wrapper}>
      {weatherLocation
        .filter((location) => location.id === index)
        .flatMap((location) => (
          <div className={styles.image} key={location.id}>
            <button className={styles.image__button} type="button" onClick={handleButtonLeft}>
              <Arrow className={styles.image__arrow} />
            </button>
            <img className={styles.image__image} src={location.image} alt="Lokalizacja" />
            <p className={styles.image__location}>
              <Point className={styles.image__icon} />
              {location.name}
            </p>
            <button className={styles.image__buttonRight} type="button" onClick={handleButtonRight}>
              <Arrow className={styles.image__arrowRight} />
            </button>
          </div>
        ))}
      <WeatherBox weatherData={weatherData} />
      <WeatherChart weatherForecast={weatherForecast} />
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default WeatherPage;
