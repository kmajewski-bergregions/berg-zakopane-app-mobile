/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './buttonStationSelect.module.scss';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

const ButtonStationSelect = ({
  stationNames,
  selectedStation,
  handleSelectStation,
  handelShowTimetable,
  handleShowMenuStationSelect,
  showMenuStationSelect,
}) => {
  const { t } = useTranslation();

  return (
    <button
      className={showMenuStationSelect ? styles.buttonShow : styles.button}
      type="button"
      onClick={handleShowMenuStationSelect}
    >
      <div className={styles.button__buttonFirst}>
        <p className={styles.button__label}>
          {selectedStation.length === 0 ? t('timetable.selectStation') : selectedStation}
        </p>
        <Arrow className={styles.button__arrow} />
      </div>

      {showMenuStationSelect && (
        <>
          {stationNames
            .filter((station) => station !== selectedStation)
            .filter((station) => station !== 'Rejon Dworców st.8')
            .flatMap((station, index) => (
              <div
                key={index}
                className={styles.button__button}
                onClick={() => {
                  handleSelectStation(station);
                  handelShowTimetable(station);
                }}
              >
                <p className={styles.button__label}>{station}</p>
              </div>
            ))}
        </>
      )}
    </button>
  );
};

export default ButtonStationSelect;
