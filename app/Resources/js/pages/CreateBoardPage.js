import React, { Component } from 'react';
import CreateBoard from 'components/CreateBoard';
import styles from 'css/CreateBoard.scss';

/* eslint-disable react/prefer-stateless-function */
export default class CreateBoardPage extends Component {
  render() {
    return (
      <div className={styles.splash}>
        <div className="container-fluid">
          <div className="well well-lg col-xs-12">
            <CreateBoard />
          </div>
        </div>
      </div>
    );
  }
}
