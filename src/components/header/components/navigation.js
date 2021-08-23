import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './navigation.module.scss';
import { ReactComponent as MapIcon } from '../../../assets/icon_map.svg';
import { ReactComponent as ObjectIcon } from '../../../assets/icon_object.svg';
import { ReactComponent as EventIcon } from '../../../assets/icon_events.svg';
import { ReactComponent as TimetableIcon } from '../../../assets/icon_timetable.svg';
import { ReactComponent as WeatherIcon } from '../../../assets/icon_weather.svg';
import { ReactComponent as TrialIcon } from '../../../assets/icon_trial.svg';

const Navigation = ({ languagePl }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink
            className={styles.navigation__link}
            activeClassName={styles.navigation__linkActive}
            exact
            to="/"
          >
            <MapIcon className={styles.navigation__icon} width={58} height={58} />
            {t('navigation.first')}
            <div className={styles.navigation__underline} />
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink
            className={styles.navigation__link}
            activeClassName={styles.navigation__linkActive}
            to="/object"
          >
            <ObjectIcon className={styles.navigation__icon} width={61} height={60} />
            {t('navigation.second')}
            <div className={styles.navigation__underline} />
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          {languagePl ? (
            <NavLink
              className={styles.navigation__link}
              activeClassName={styles.navigation__linkActive}
              to="/events"
            >
              <EventIcon className={styles.navigation__icon} width={57} height={57} />
              {t('navigation.third')}
              <div className={styles.navigation__underline} />
            </NavLink>
          ) : (
            <div className={styles.navigation__linkDisabled}>
              <EventIcon className={styles.navigation__icon} width={57} height={57} />
              {t('navigation.third')}
              <div className={styles.navigation__underline} />
            </div>
          )}
        </li>
        <li className={styles.navigation__item}>
          <NavLink
            className={styles.navigation__link}
            activeClassName={styles.navigation__linkActive}
            to="/timetable"
          >
            <TimetableIcon className={styles.navigation__icon} width={55} height={55} />
            {t('navigation.fourth')}
            <div className={styles.navigation__underline} />
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink
            className={styles.navigation__link}
            activeClassName={styles.navigation__linkActive}
            to="/weather"
          >
            <WeatherIcon className={styles.navigation__icon} width={60} height={59} />
            {t('navigation.fifth')}
            <div className={styles.navigation__underline} />
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink
            className={styles.navigation__link}
            activeClassName={styles.navigation__linkActive}
            to="/trail"
          >
            <TrialIcon className={styles.navigation__icon} width={55} height={60} />
            {t('navigation.sixth')}
            <div className={styles.navigation__underline} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
