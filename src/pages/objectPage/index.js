import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ObjectDetails from '../../components/objectDetails/objectDetails';

import styles from './index.module.scss';

const ObjectPage = ({ objects, languagePl }) => {
  const [showFullCard, setShowFullCard] = useState(true);

  return (
    <Switch>
      <Route exact path="/object">
        <div className={styles.objectPage}>
          <p>This is mobile app - You can see only object details.</p>
          <p>Objects list page is available only on touch app</p>
        </div>
      </Route>
      <Route exact path="/object/:id">
        <div className={styles.objects__boxDetails}>
          <ObjectDetails
            languagePl={languagePl}
            objects={objects}
            showFullCard={showFullCard}
            setShowFullCard={setShowFullCard}
          />
        </div>
      </Route>
    </Switch>
  );
};

export default ObjectPage;
