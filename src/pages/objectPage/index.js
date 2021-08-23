import React, { useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import ObjectDetails from '../../components/objectDetails/objectDetails';

import styles from './index.module.scss';

const ObjectPage = ({ objects, languagePl }) => {
  const [showFullCard, setShowFullCard] = useState(true);

  const SingleObject = () => {
    const { id } = useParams();

    return (
      <ObjectDetails
        languagePl={languagePl}
        object={objects.find((object) => object.id === Number(id))}
        showFullCard={showFullCard}
        setShowFullCard={setShowFullCard}
      />
    );
  };

  return (
    <Switch>
      <Route exact path="/object">
        <div className={styles.objectPage}>
          <p>This is mobile app - You can see only object details.</p>
          <p>Objects list page is available only on touch app</p>
        </div>
      </Route>
      <Route exact path="/object/:id">
        <SingleObject />
      </Route>
    </Switch>
  );
};

export default ObjectPage;
