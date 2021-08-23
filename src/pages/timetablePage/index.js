/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import TimetableCard from 'components/timetableCard/timetableCard';
import Footer from 'components/footer/footer';
import ButtonStationSelect from 'components/buttons/buttonStationSelect';
import styles from './index.module.scss';

import { ReactComponent as Point } from '../../assets/icon_point.svg';
import { ReactComponent as ArrowTime } from '../../assets/arrow_timtable.svg';
// import { ReactComponent as Loupe } from '../../assets/loupe.svg';

const TimetablePage = ({
  handleShowMenuStationSelect,
  showMenuStationSelect,
  setShowMenuStationSelect,
}) => {
  const { t } = useTranslation();
  const [stationNames, setStationNames] = useState([]);
  const [selectedStation, setSelectedStation] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState([]);
  const [showBackground, setShowBackground] = useState(true);

  useEffect(() => {
    axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      url: `https://api.bergregions.pl/api/v1/zakopane/bus-stops/names`,
    }).then((response) => {
      setStationNames(response.data);
    });
  }, []);

  const handleSelectStation = (station) => {
    setSelectedStation(station);
  };

  const handelShowTimetable = (station) => {
    const finishStation = station;
    axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      url: `https://api.bergregions.pl/api/v1/zakopane/bus-stops/search?start=Rejon%20Dworc%C3%B3w%20st.8&stop=${finishStation}`,
    }).then((response) => {
      setSelectedTimetable(response.data);
      setShowBackground(false);
    });
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowMenuStationSelect(false);
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
    <div className={styles.timetable} ref={clickOutsideRef}>
      <h2 className={styles.timetable__title}>{t('timetable.name')}</h2>
      <div className={styles.buttonBox}>
        <div className={styles.button}>
          <Point className={styles.button__icon} />
          <p className={styles.button__labelGreen}>Zakopane rej. Dworców st. 8</p>
        </div>
        <ArrowTime className={styles.button__iconArrow} />
        <ButtonStationSelect
          stationNames={stationNames}
          selectedStation={selectedStation}
          handleSelectStation={handleSelectStation}
          handelShowTimetable={handelShowTimetable}
          showMenuStationSelect={showMenuStationSelect}
          handleShowMenuStationSelect={handleShowMenuStationSelect}
        />
      </div>
      {/* <button className={styles.buttonGreen} type="button">
        <Loupe className={styles.button__loupe} />
        <p className={styles.button__labelWhite}>{t('timetable.show')}</p>
      </button> */}

      {selectedTimetable.slice(0, 6).map((timetable) => (
        <TimetableCard key={timetable.startTime} timetable={timetable} />
      ))}

      {showBackground && (
        <img
          className={styles.timetable__background}
          src={`${process.env.PUBLIC_URL}/assets/img/busPlaceHolder.png`}
          alt="Place holder"
        />
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default TimetablePage;
