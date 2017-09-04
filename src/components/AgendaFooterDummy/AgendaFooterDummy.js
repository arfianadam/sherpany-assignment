import React, { Component } from 'react';
import Button from 'components/Button';
import UploadDocumentModal from 'containers/UploadDocumentModal';
import styles from './AgendaFooterDummy.scss';

export default class AgendaFooterDummy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.AgendaFooterDummy}>
        <div className={styles.container}>
          <button className={styles.publish}>Publish</button>
          <section className={styles.buttons}>
            <div className={styles.buttonsContainer}>
              <div className={styles.divider} />
              <button className={styles.icon} data-icon="d" />
              <button className={styles.icon} data-icon="e" />
              <div className={styles.divider} />
              <button className={styles.icon} data-icon="b" />
              <button className={styles.icon} data-icon="c" />
              <Button icon="f">
                <UploadDocumentModal />
              </Button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
