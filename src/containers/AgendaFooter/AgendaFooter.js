import React, { Component } from 'react';
import styles from './AgendaFooter.scss';

export default class AgendaFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.AgendaFooter}>
        <h3>This is footer</h3>
      </div>
    );
  }
}
