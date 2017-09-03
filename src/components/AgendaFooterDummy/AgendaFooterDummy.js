import React, { Component } from 'react';
import styles from './AgendaFooterDummy.scss';

export default class AgendaFooterDummy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.AgendaFooterDummy}>
        <button className={styles.publish}>Publish</button>
      </div>
    );
  }
}
