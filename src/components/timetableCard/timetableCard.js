import React from 'react';

import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { ReactComponent as ArrowTime } from '../../assets/arrow_timtable.svg';
import styles from './timetableCard.module.scss';

const TimetableCard = ({ timetable }) => {
  const { t } = useTranslation();

  const travelDateConvert = dayjs(timetable.travelDate).format('DD.MM.YYYY');

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.card__bus}>
          <p className={styles.card__numberBus}>{timetable.lineNumber}</p>
          <img
            className={styles.card__icon}
            src={`${process.env.PUBLIC_URL}/assets/img/icon_bus.svg`}
            alt="Ikona autobusu"
          />
          <div className={styles.card__station}>
            <p className={styles.card__nameStation}>Zakopane rej. Dworców st. 8</p>
            <p className={styles.card__time}>{timetable.startTime}</p>

            <p className={styles.card__date}>{travelDateConvert}</p>
          </div>
          <ArrowTime className={styles.card__arrow} />
          <div className={styles.card__line} />
        </div>
      </div>
      <div className={styles.card__end}>
        <div className={styles.card__stationLong}>
          <p className={styles.card__nameStation}>{timetable.finishStation}</p>
          <p className={styles.card__time}>{timetable.finishTime}</p>
          <p className={styles.card__date}>{travelDateConvert}</p>
        </div>
        <div className={styles.card__stationLongTime}>
          <p className={styles.card__date}>{t('timetable.timeTravel')}</p>
          <p className={styles.card__minute}>
            {timetable.travelTime} {t('timetable.minutes')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimetableCard;
