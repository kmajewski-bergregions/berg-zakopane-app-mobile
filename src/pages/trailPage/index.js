import React from 'react';

import AboutTrail from 'components/aboutTrail/aboutTrail';
import styles from './index.module.scss';

const TrailPage = ({ languagePl }) => (
  <div className={styles.trail}>
    <AboutTrail languagePl={languagePl} />
  </div>
);

export default TrailPage;
