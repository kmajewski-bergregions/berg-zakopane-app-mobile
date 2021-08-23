/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { eventFilters } from 'helpers/eventFilters';
import styles from './buttonEventSelect.module.scss';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

const ButtonEventSelect = ({ showMenuEventSelect, handleShowMenuEventSelect, showFilter }) => {
  const { t } = useTranslation();

  return (
    <button
      className={showMenuEventSelect ? styles.buttonShow : styles.button}
      type="button"
      onClick={handleShowMenuEventSelect}
    >
      <div className={styles.button__buttonFirst}>
        <img
          className={styles.button__icon}
          src={`${process.env.PUBLIC_URL}/assets/img/event_all.svg`}
          alt="Ikona obiektu"
        />
        <p className={styles.button__label}>{t('button.event.all')}</p>
        <Arrow className={styles.button__arrow} />
      </div>

      {showMenuEventSelect && (
        <>
          {eventFilters
            .filter((object) => object.category !== showFilter)
            .flatMap((event) => (
              <div className={styles.button__button} id={event.category} key={event.category}>
                <img className={styles.button__icon} src={event.logo} alt="Ikona obiektu" />
                <p className={styles.button__labelDisabled}>
                  {event.category === 2 && t('button.event.culture')}
                  {event.category === 3 && t('button.event.sport')}
                  {event.category === 4 && t('button.event.festivals')}
                  {event.category === 5 && t('button.event.kids')}
                  {event.category === 6 && t('button.event.tickets')}
                  {event.category === 7 && t('button.event.outdoor')}
                  {event.category === 8 && t('button.event.others')}
                </p>
              </div>
            ))}
        </>
      )}
    </button>
  );
};

export default ButtonEventSelect;
