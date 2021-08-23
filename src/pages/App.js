/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import GlobalStyle from 'theme/GlobalStyle';
import styled from 'styled-components';

import { objects } from 'helpers/objects';
import Header from '../components/header/header';
import LandingPage from './landingPage';
import ObjectPage from './objectPage';
import EventsPage from './eventsPage';
import TimetablePage from './timetablePage';
import WeatherPage from './weatherPage';
import TrailPage from './trailPage';

const ScreenLimit = styled.div`
  display: none;

  @media screen and (min-width: 1081px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 100000;
    background-color: #83929c;
  }
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 36px;
  color: white;
`;

const App = () => {
  const { i18n } = useTranslation();
  const [languagePl, setLanguagePl] = useState(true);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguagePl(!languagePl);
  };
  const [showSmallCard, setShowSmallCard] = useState(false);
  const [showFullCard, setShowFullCard] = useState(false);
  const [showMenuObjectSelect, setShowMenuObjectSelect] = useState(false);
  const handleShowMenuObjectSelect = () => {
    setShowMenuObjectSelect(!showMenuObjectSelect);
  };

  const [showMenuEventSelect, setShowMenuEventSelect] = useState(false);
  const handleShowMenuEventSelect = () => {
    setShowMenuEventSelect(!showMenuEventSelect);
  };

  const [showMenuStationSelect, setShowMenuStationSelect] = useState(false);
  const handleShowMenuStationSelect = () => {
    setShowMenuStationSelect(!showMenuStationSelect);
  };

  const [weatherData, setWeatherData] = useState([]);

  const [backToLandingPage, setBackToLandingPage] = useState(false);
  const [screensaverTimeout, setScreensaverTimeout] = useState(-1);
  const timeRunning = 90 * 1000;

  const [windowWidth, setWindowWidth] = useState(0);
  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  const startTimeout = () => {
    if (windowWidth > 950) {
      clearTimeout(screensaverTimeout);
      const timeout = setTimeout(() => {
        setBackToLandingPage(true);
        setShowSmallCard(false);
        setShowFullCard(false);
      }, timeRunning);
      setScreensaverTimeout(timeout);
    }
  };

  const appTouched = () => {
    if (windowWidth > 950) {
      setBackToLandingPage(false);
      startTimeout();
    }
  };

  useEffect(() => {
    async function fetchData() {
      const lat = 49.2956;
      const lon = 19.9512;
      axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        url: `https://api.bergregions.pl/api/v1/weather?lat=${lat}&lon=${lon}`,
      }).then((response) => {
        setWeatherData(response.data.currentCondition);
      });
    }
    fetchData();

    const check = () => {
      const minutes = new Date().getMinutes();
      if (minutes === 0 || minutes === 30) {
        fetchData();
      }
    };

    setInterval(() => {
      check();
    }, 1000 * 60);
  }, []);

  return (
    <div onClick={appTouched}>
      <GlobalStyle />
      <Router>
        <ScreenLimit>
          <Text>Maksymalna szerokość aplikacji to 1080px</Text>
        </ScreenLimit>
        <Header
          changeLanguage={changeLanguage}
          languagePl={languagePl}
          weatherData={weatherData}
          setShowMenuObjectSelect={setShowMenuObjectSelect}
          setShowMenuEventSelect={setShowMenuEventSelect}
        />
        {backToLandingPage && <Redirect to="/" />}
        <Switch>
          <Route exact path="/">
            <LandingPage
              objects={objects}
              languagePl={languagePl}
              handleShowMenuObjectSelect={handleShowMenuObjectSelect}
              showMenuObjectSelect={showMenuObjectSelect}
              setShowMenuObjectSelect={setShowMenuObjectSelect}
              showSmallCard={showSmallCard}
              setShowSmallCard={setShowSmallCard}
              showFullCard={showFullCard}
              setShowFullCard={setShowFullCard}
            />
          </Route>
          <Route path="/object">
            <ObjectPage
              objects={objects}
              languagePl={languagePl}
              handleShowMenuObjectSelect={handleShowMenuObjectSelect}
              showMenuObjectSelect={showMenuObjectSelect}
              setShowMenuObjectSelect={setShowMenuObjectSelect}
            />
          </Route>
          <Route path="/events">
            <EventsPage
              handleShowMenuEventSelect={handleShowMenuEventSelect}
              showMenuEventSelect={showMenuEventSelect}
              setShowMenuEventSelect={setShowMenuEventSelect}
            />
          </Route>
          <Route path="/timetable">
            <TimetablePage
              handleShowMenuStationSelect={handleShowMenuStationSelect}
              showMenuStationSelect={showMenuStationSelect}
              setShowMenuStationSelect={setShowMenuStationSelect}
            />
          </Route>
          <Route path="/weather">
            <WeatherPage />
          </Route>
          <Route path="/trail">
            <TrailPage languagePl={languagePl} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
