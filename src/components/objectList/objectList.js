import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './objectList.module.scss';

const ObjectList = ({ languagePl, object }) => {
  const { t } = useTranslation();
  const date = new Date();
  const day = date.getDay();

  let dayNumber;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 6; i++) {
    if (i === day) {
      dayNumber = i;
    }
  }

  return (
    <>
      <div className={styles.objects__imageBox}>
        {object.imageUrl.flatMap((image, imageIndex) => (
          <img className={styles.objects__image} src={image} key={imageIndex} alt="Zdjęcie" />
        ))}
      </div>
      <div className={styles.objects__descriptionBox}>
        <h2 className={styles.objects__name}>{languagePl ? object.name.pl : object.name.en}</h2>
        <p className={styles.objects__category}>
          {languagePl ? object.category.pl : object.category.en}
        </p>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <div className={styles.infoLeft__box}>
              {object.hour ? (
                <>
                  <img
                    className={styles.info__icon}
                    src={`${process.env.PUBLIC_URL}/assets/img/icon_clock.svg`}
                    alt="Time icon"
                  />
                  <p className={styles.infoLeft__paragraph}>
                    {day === dayNumber && (
                      <>
                        {day === 1 && t('cardDetails.hour.mon')}
                        {day === 2 && t('cardDetails.hour.tue')}
                        {day === 3 && t('cardDetails.hour.wen')}
                        {day === 4 && t('cardDetails.hour.thu')}
                        {day === 5 && t('cardDetails.hour.fri')}
                        {day === 6 && t('cardDetails.hour.sat')}
                        {day === 0 && t('cardDetails.hour.sun')}
                        &nbsp;
                        <span>
                          {object.hour[dayNumber].start === null
                            ? t('cardDetails.hour.closed')
                            : `${object.hour[dayNumber].start} - ${object.hour[dayNumber].end}`}
                        </span>{' '}
                      </>
                    )}
                  </p>
                </>
              ) : (
                <p className={styles.infoLeft__paragraphMargin}>
                  <span>{languagePl ? object.permClosed.pl : object.permClosed.en}</span>
                </p>
              )}
            </div>
            <div className={styles.infoLeft__box}>
              <img
                className={styles.info__icon}
                src={`${process.env.PUBLIC_URL}/assets/img/icon_point.svg`}
                alt="Point icon"
              />
              <div>
                <p className={styles.infoLeft__paragraph}>
                  <span>{object.street}</span>
                </p>
                <p className={styles.infoLeft__paragraph}>{object.city}</p>
              </div>
            </div>
          </div>
          <div className={styles.infoRight}>
            <div className={styles.infoRight__box}>
              <img
                className={styles.info__icon}
                src={`${process.env.PUBLIC_URL}/assets/img/icon_phoneQr.svg`}
                alt="Ikona telefonu"
              />
              <p className={styles.infoRight__paragraph}>{t('cardDetails.qrPhoto')}</p>
            </div>
            <img className={styles.infoRight__qr} src={object.qrImage} alt="Kod QR" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ObjectList;
