import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './buttonOpenNow.module.scss';
import { ReactComponent as Clock } from '../../assets/icon_clock.svg';

const ButtonOpenNow = ({ onPress, openNow }) => {
  const { t } = useTranslation();

  return (
    <button
      className={openNow ? styles.buttonActive : styles.button}
      type="button"
      onClick={onPress}
    >
      <Clock className={openNow ? styles.button__clockActive : styles.button__clock} />
      <p className={openNow ? styles.button__labelActive : styles.button__label}>
        {t('button.openNow')}
      </p>
      {openNow && <div className={styles.button__close}>x</div>}
    </button>
  );
};

export default ButtonOpenNow;
