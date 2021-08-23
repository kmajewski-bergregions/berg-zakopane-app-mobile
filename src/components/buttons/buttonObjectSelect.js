/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { objectsFilters } from 'helpers/objectFilters';
import styles from './buttonObjectSelect.module.scss';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

const ButtonObjectSelect = ({
  showMenuObjectSelect,
  handleShowMenuObjectSelect,
  showFilter,
  handleShowFilter,
}) => {
  const { t } = useTranslation();

  return (
    <button
      className={showMenuObjectSelect ? styles.buttonShow : styles.button}
      type="button"
      onClick={handleShowMenuObjectSelect}
    >
      {objectsFilters
        .filter((object) => object.category === showFilter)
        .flatMap((object) => (
          <div
            className={styles.button__buttonFirst}
            id={object.category}
            key={object.category}
            onClick={() => handleShowFilter(object.category)}
          >
            <img className={styles.button__icon} src={object.logo} alt="Ikona obiektu" />
            <p className={styles.button__label}>
              {showFilter === 1 && t('button.object.all')}
              {showFilter === 2 && t('button.object.house')}
              {showFilter === 3 && t('button.object.sacred')}
              {showFilter === 4 && t('button.object.museum')}
              {showFilter === 5 && t('button.object.other')}
            </p>
            <Arrow className={styles.button__arrow} />
          </div>
        ))}

      {showMenuObjectSelect && (
        <>
          {objectsFilters
            .filter((object) => object.category !== showFilter)
            .flatMap((object) => (
              <div
                className={styles.button__button}
                id={object.category}
                key={object.category}
                onClick={() => handleShowFilter(object.category)}
              >
                <img className={styles.button__icon} src={object.logo} alt="Ikona obiektu" />
                <p className={styles.button__label}>
                  {object.category === 1 && t('button.object.all')}
                  {object.category === 2 && t('button.object.house')}
                  {object.category === 3 && t('button.object.sacred')}
                  {object.category === 4 && t('button.object.museum')}
                  {object.category === 5 && t('button.object.other')}
                </p>
              </div>
            ))}
        </>
      )}
    </button>
  );
};

export default ButtonObjectSelect;
