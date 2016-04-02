import React, { PropTypes } from 'react';
import AppNavbar from 'components/AppNavbar';
import { ReflorpWrapper } from 'react-reflorp';
import styles from 'css/App.scss';

const App = ({ children }) => (
  <ReflorpWrapper>
    <div className={styles.app}>
        <AppNavbar />
        {children}
    </div>
  </ReflorpWrapper>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
