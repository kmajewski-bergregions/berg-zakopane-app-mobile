import React from 'react';

import { useTranslation } from 'react-i18next';

import styles from './header.module.scss';

const Header = ({ changeLanguage, languagePl }) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>
          <img
            className={styles.logo__logo}
            src={`${process.env.PUBLIC_URL}/assets/img/logo_zakopane_3.svg`}
            alt="Zakopane"
          />
          <p className={styles.logo__description}>{t('navigation.name')}</p>
        </div>
        <div className={styles.weather}>
          {languagePl ? (
            <>
              <button
                className={styles.weather__button}
                type="button"
                onClick={() => changeLanguage('en')}
              >
                <img
                  className={styles.weather__flag}
                  src={`${process.env.PUBLIC_URL}/assets/img/flag-poland.svg`}
                  alt="Flaga wybranego języka"
                />
                <p className={styles.weather__paragraph}>PL</p>
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.weather__button}
                type="button"
                onClick={() => changeLanguage('pl')}
              >
                <img
                  className={styles.weather__flagEn}
                  src={`${process.env.PUBLIC_URL}/assets/img/flag-en.svg`}
                  alt="Flaga wybranego języka"
                />
                <p className={styles.weather__paragraph}>EN</p>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
