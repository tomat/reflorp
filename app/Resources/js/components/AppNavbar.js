import React, { PropTypes } from 'react';
import { Navbar } from 'react-bootstrap';
import NavbarBrand from 'components/NavbarBrand';
import styles from 'css/AppNavbar.scss';

const AppNavbar = ({ children }) => (
  <div className={styles.appNavbar}>
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <NavbarBrand brand={'reflorp'} />
        </Navbar.Brand>
      </Navbar.Header>
      {children}
    </Navbar>
  </div>
);

AppNavbar.propTypes = {
  children: PropTypes.node,
};

export default AppNavbar;
