import React, { PropTypes } from 'react';
import AppNavbar from 'components/AppNavbar';
import styles from 'css/App.scss';

const App = ({ children }) => (
  <div className={styles.app}>
    <AppNavbar />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
