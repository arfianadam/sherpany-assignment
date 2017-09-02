import React, { Component } from 'react';
import styles from './AgendaDetails.scss';

export default class AgendaDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.AgendaDetails}>
        <h1>Some details about the agenda</h1>
      </div>
    );
  }
}
