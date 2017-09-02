import React, { Component } from 'react';
import styles from './AgendaList.scss';

export default class AgendaList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.AgendaList}>
        <h1>Some agenda list</h1>
      </div>
    );
  }
}
