import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GlobalStyle from 'theme/GlobalStyle';
import { objects } from 'helpers/objects';
import Header from '../components/header/header';
import LandingPage from './landingPage';
import ObjectPage from './objectPage';
import TrailPage from './trailPage';

const App = () => {
  const { i18n } = useTranslation();
  const [languagePl, setLanguagePl] = useState(true);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguagePl(!languagePl);
  };

  return (
    <div>
      <GlobalStyle />
      <Router>
        <Header changeLanguage={changeLanguage} languagePl={languagePl} />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/object">
            <ObjectPage objects={objects} languagePl={languagePl} />
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
