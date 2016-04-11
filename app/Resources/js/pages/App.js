import React, { PropTypes } from 'react';
import AppNavbar from 'components/AppNavbar';
import { ReflorpWrapper } from 'react-reflorp';
import styles from 'css/App.scss';

const App = ({ children }) => (
  <div className={styles.app}>
    <ReflorpWrapper />
    <AppNavbar />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
