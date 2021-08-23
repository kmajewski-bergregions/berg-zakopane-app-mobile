/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import dayjs from 'dayjs';

import EventList from 'components/eventList/eventList';
import EventDetails from 'components/eventDetails/eventDetails';
import ButtonEventSelect from 'components/buttons/buttonEventSelect';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import styles from './index.module.scss';
import './react-datepicker.css';

registerLocale('pl', pl);

const EventsPage = ({ handleShowMenuEventSelect, showMenuEventSelect, setShowMenuEventSelect }) => {
  const [eventsList, setEventList] = useState();
  // eslint-disable-next-line no-unused-vars
  const [showFilter, setShowFilter] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeFilterOnOff, setTimeFilterOnOff] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url: `https://api.bergregions.pl/api/v1/region-feature/24460239?featureType=EVENTS`,
    }).then((response) => {
      setEventList(response.data);
    });
  }, [setEventList]);

  // const handlerShowFilter = (id) => {
  //   setShowFilter(id);
  // };

  const startDateString = dayjs(startDate).format('YYYY-MM-DD');
  const endDateString = dayjs(endDate).format('YYYY-MM-DD');

  return (
    <Switch>
      <Route exact path="/events">
        <ButtonEventSelect
          showMenuEventSelect={showMenuEventSelect}
          handleShowMenuEventSelect={handleShowMenuEventSelect}
          showFilter={showFilter}
        />
        <div className={styles.events} onClick={() => setShowMenuEventSelect(false)}>
          <div className={styles.picker}>
            <div className={styles.picker__box}>
              <img
                className={styles.picker__icon}
                src={`${process.env.PUBLIC_URL}/assets/img/icon_calendar.svg`}
                alt="Ikona kalendarza"
              />
              <DatePicker
                locale="pl"
                calendarStartDay={1}
                dateFormat="yyyy-MM-dd"
                className={styles.picker__input}
                selected={startDate}
                defaultValue={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setTimeFilterOnOff(true);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className={styles.picker__box}>
              <img
                className={styles.picker__icon}
                src={`${process.env.PUBLIC_URL}/assets/img/icon_calendar.svg`}
                alt="Ikona kalendarza"
              />
              <DatePicker
                locale="pl"
                calendarStartDay={1}
                dateFormat="yyyy-MM-dd"
                className={styles.picker__input}
                selected={endDate}
                defaultValue={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setTimeFilterOnOff(true);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <div className={styles.events__container}>
            {eventsList?.events
              .filter((attraction) =>
                timeFilterOnOff
                  ? (attraction.startDate <= startDateString &&
                      attraction.endDate >= endDateString) ||
                    (attraction.startDate >= startDateString && attraction.endDate <= endDateString)
                  : attraction,
              )
              .flatMap((attraction) => (
                <Link
                  to={`/events/${attraction.id}`}
                  className={styles.events__button}
                  key={attraction.id}
                  id={attraction.id}
                >
                  <EventList attraction={attraction} />
                </Link>
              ))}
          </div>
        </div>
      </Route>
      <Route path="/events/:id">
        <div className={styles.eventsDetails}>
          <Link className={styles.events__buttonBack} to="/events">
            <Arrow className={styles.events__buttonBackIcon} />
          </Link>
          <EventDetails eventsList={eventsList} />
        </div>
      </Route>
    </Switch>
  );
};

export default EventsPage;
