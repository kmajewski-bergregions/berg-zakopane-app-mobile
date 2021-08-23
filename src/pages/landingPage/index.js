/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';

import ButtonObjectSelect from 'components/buttons/buttonObjectSelect';
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl';
import { ReactComponent as Arrows } from '../../assets/arrows.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import StartLocationIcon from '../../assets/startLocation.svg';
import ObjectDetails from '../../components/objectDetails/objectDetails';
import styles from './index.module.scss';
import './map.scss';

export const isOutOfMaxBounds = (nextSW, nextNE, maxBounds) => {
  const [[maxSWLng, maxSWLat], [maxNELng, maxNELat]] = maxBounds;
  const [nextSWLng, nextSWLat] = nextSW;
  const [nextNELng, nextNELat] = nextNE;

  return (
    nextSWLng < maxSWLng || nextSWLat < maxSWLat || nextNELng > maxNELng || nextNELat > maxNELat
  );
};

const LandingPage = ({
  objects,
  languagePl,
  handleShowMenuObjectSelect,
  showMenuObjectSelect,
  setShowMenuObjectSelect,
  showSmallCard,
  setShowSmallCard,
  showFullCard,
  setShowFullCard,
}) => {
  const [viewport, setViewport] = useState({
    latitude: 49.30058625376197,
    longitude: 19.962185869215897,
    zoom: 17.5,
  });

  const bounds = [
    [19.90375, 49.19378],
    [20.05375, 49.43378],
  ];

  const onViewportChange = (newViewport) => {
    const merc = new WebMercatorViewport(newViewport);
    const newSouthWest = merc.unproject([0, newViewport.height]);
    const newNorthEast = merc.unproject([newViewport.width, 0]);
    if (!isOutOfMaxBounds(newSouthWest, newNorthEast, bounds)) {
      setViewport(newViewport);
    }
  };

  const [showFilter, setShowFilter] = useState(1);
  const [heightFull, setHeightFull] = useState('800px');
  const [showThisObject, setShowThisObject] = useState();
  const [lat, setLat] = useState(49.2956);
  const [lon, setLon] = useState(19.9512);

  const handleShowFilter = (id) => {
    setShowFilter(id);
  };

  const handleShowSmallCard = (objectId) => {
    setShowSmallCard(true);
    setShowFullCard(false);
    setHeightFull('800px');
    setShowThisObject(objectId);
  };

  const handleShowFullCard = () => {
    setShowFullCard(!showFullCard);
  };

  useEffect(() => {
    if (showFullCard) {
      setHeightFull('100%');
    } else {
      setHeightFull('800px');
    }
  }, [showFullCard]);

  const handleGetLat = (getLat) => {
    setLat(getLat);
  };
  const handleGetLon = (getLon) => {
    setLon(getLon);
  };

  return (
    <div className={styles.landing}>
      <ButtonObjectSelect
        showMenuObjectSelect={showMenuObjectSelect}
        showFilter={showFilter}
        handleShowMenuObjectSelect={handleShowMenuObjectSelect}
        handleShowFilter={handleShowFilter}
      />
      <div onClick={() => setShowMenuObjectSelect(false)}>
        <ReactMapGL
          className={styles.map}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/bergregions2020/ckrvs806z0jdh18mum3rno74e"
          width="100vw"
          height="1638px"
          // eslint-disable-next-line no-shadow
          onViewportChange={onViewportChange}
          maxZoom={17.5}
          minZoom={15}
          scrollZoom={false}
          dragRotate={false}
          doubleClickZoom={false}
          touchZoom
          touchRotate={false}
          pitch={60}
        >
          <button
            className={styles.map__button}
            type="button"
            onClick={() =>
              setViewport({
                latitude: 49.30058625376197,
                longitude: 19.962185869215897,
                zoom: 17.5,
              })
            }
          >
            <img src={StartLocationIcon} alt="Ikona" />
          </button>
          {viewport.zoom === 17.5 ? (
            <button className={styles.map__buttonPlusDisabled} type="button">
              +
            </button>
          ) : (
            <button
              className={styles.map__buttonPlus}
              type="button"
              onClick={() =>
                setViewport({
                  latitude: viewport.latitude,
                  longitude: viewport.longitude,
                  zoom: viewport.zoom + 0.5,
                })
              }
            >
              +
            </button>
          )}
          {viewport.zoom === 15 ? (
            <button className={styles.map__buttonMinusDisabled} type="button">
              -
            </button>
          ) : (
            <button
              className={styles.map__buttonMinus}
              type="button"
              onClick={() =>
                setViewport({
                  latitude: viewport.latitude,
                  longitude: viewport.longitude,
                  zoom: viewport.zoom - 0.5,
                })
              }
            >
              -
            </button>
          )}
          {objects
            .filter((object) => object.categoryNumber === showFilter || showFilter === 1)
            .flatMap((object) => (
              <Marker
                offsetTop={-80}
                offsetLeft={-25}
                latitude={object.location.lat}
                longitude={object.location.lon}
                key={object.id}
                id={object.id}
              >
                <button
                  className={styles.buttonPoint}
                  type="button"
                  onClick={() => {
                    handleShowSmallCard(object.id);
                    handleGetLat(object.location.lat);
                    handleGetLon(object.location.lon);
                    setViewport({
                      latitude: object.location.lat,
                      longitude: object.location.lon,
                      zoom: viewport.zoom,
                    });
                  }}
                >
                  <img className={styles.buttonPoint__icon} src={object.categoryLogo} alt="Punkt" />
                  {viewport.zoom === 17.5 && (
                    <p className={styles.buttonPoint__label}>
                      {languagePl ? object.name.pl : object.name.en}
                    </p>
                  )}
                </button>
              </Marker>
            ))}
          <div
            className={showSmallCard ? styles.card : styles.cardClose}
            style={{ height: heightFull }}
          >
            <div className={styles.card__boxButtons}>
              <button
                className={showFullCard ? styles.card__buttonMoreFull : styles.card__buttonMore}
                type="button"
                onClick={handleShowFullCard}
              >
                <Arrows
                  className={
                    showFullCard ? styles.card__showMoreIconFull : styles.card__showMoreIcon
                  }
                />
              </button>
              <button
                className={showFullCard ? styles.card__buttonCloseFull : styles.card__buttonClose}
                type="button"
                onClick={() => {
                  setShowSmallCard(false);
                  setShowFullCard(false);
                }}
              >
                <CloseIcon
                  className={showFullCard ? styles.card__closeIconFull : styles.card__closeIcon}
                />
              </button>
            </div>
            <div>
              <ObjectDetails
                languagePl={languagePl}
                objects={objects}
                showFullCard={showFullCard}
                setShowFullCard={setShowFullCard}
                showThisObject={showThisObject}
                lat={lat}
                lon={lon}
              />
            </div>
          </div>
        </ReactMapGL>
      </div>
    </div>
  );
};

export default LandingPage;
