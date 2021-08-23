/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import dayjs from 'dayjs';

import ButtonObjectSelect from 'components/buttons/buttonObjectSelect';
import ButtonOpenNow from 'components/buttons/buttonOpenNow';
import ObjectList from 'components/objectList/objectList';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import ObjectDetails from '../../components/objectDetails/objectDetails';

import styles from './index.module.scss';

const ObjectPage = ({
  objects,
  languagePl,
  handleShowMenuObjectSelect,
  showMenuObjectSelect,
  setShowMenuObjectSelect,
}) => {
  const [showFilter, setShowFilter] = useState(1);
  const [showFilterTime, setShowFilterTime] = useState('');
  const [openNow, setOpenNow] = useState(false);
  const [showFullCard, setShowFullCard] = useState(true);
  const [lat, setLat] = useState(49.2956);
  const [lon, setLon] = useState(19.9512);
  const date = new Date();
  const day = date.getDay();
  const time = date.getTime();

  const handleShowFilter = (NumId) => {
    setShowFilter(NumId);
  };

  const handleGetLat = (getLat) => {
    setLat(getLat);
  };
  const handleGetLon = (getLon) => {
    setLon(getLon);
  };

  const currentTime = dayjs(time).format('HH:mm');
  const handleShowOpenNow = () => {
    setOpenNow(!openNow);
    setShowFilterTime(currentTime);
  };

  // const SingleObject = () => {
  //   const { id } = useParams();

  //   return (
  //     <div className={styles.objects__boxDetails}>
  //       <Link className={styles.objects__buttonBack} to="/object">
  //         <Arrow className={styles.objects__buttonBackIcon} />
  //       </Link>
  //       <ObjectDetails
  //         languagePl={languagePl}
  //         object={objects.find((object) => object.id === Number(id))}
  //         showFullCard={showFullCard}
  //         setShowFullCard={setShowFullCard}
  //         lat={lat}
  //         lon={lon}
  //       />
  //     </div>
  //   );
  // };

  return (
    <Switch>
      <Route exact path="/object">
        <ButtonObjectSelect
          showMenuObjectSelect={showMenuObjectSelect}
          showFilter={showFilter}
          handleShowMenuObjectSelect={handleShowMenuObjectSelect}
          handleShowFilter={handleShowFilter}
        />
        <ButtonOpenNow openNow={openNow} onPress={handleShowOpenNow} />
        <div className={styles.objects} onClick={() => setShowMenuObjectSelect(false)}>
          <div className={styles.objects__box}>
            {objects
              .filter((object) => object.categoryNumber === showFilter || showFilter === 1)
              .filter((object) =>
                openNow
                  ? showFilterTime >= (object.hour && object.hour[day].start) &&
                    showFilterTime < (object.hour && object.hour[day].end)
                  : object,
              )
              .flatMap((object) => (
                <Link
                  to={`/object/${object.id}`}
                  className={styles.objects__button}
                  key={object.id}
                  id={object.id}
                  onClick={() => {
                    handleGetLat(object.location.lat);
                    handleGetLon(object.location.lon);
                  }}
                >
                  <ObjectList languagePl={languagePl} object={object} />
                </Link>
              ))}
          </div>
        </div>
      </Route>
      <Route exact path="/object/:id">
        <div className={styles.objects__boxDetails}>
          <Link className={styles.objects__buttonBack} to="/object">
            <Arrow className={styles.objects__buttonBackIcon} />
          </Link>
          <ObjectDetails
            languagePl={languagePl}
            objects={objects}
            showFullCard={showFullCard}
            setShowFullCard={setShowFullCard}
            lat={lat}
            lon={lon}
          />
        </div>
      </Route>
    </Switch>
  );
};

export default ObjectPage;
