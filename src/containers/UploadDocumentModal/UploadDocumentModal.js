import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styles from './UploadDocumentModal.scss';

export default class UploadDocumentModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func
  };

  static defaultProps = {
    closeModal: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop = droppedFiles => {
    const { files } = this.state;
    this.setState({
      files: [...files, ...droppedFiles]
    }, () => {
      console.log(this.state.files);
    });
  }

  render() {
    const { closeModal } = this.props;
    return (
      <div className={styles.UploadDocumentModal}>
        <header>
          <span>Add documents to agenda items</span>
          <button
            className={styles.closeButton}
            data-icon="a"
            onClick={closeModal} />
        </header>
        <div className={styles.dropzoneContainer}>
          <Dropzone
            className={styles.dropzone}
            onDrop={this.onDrop} />
          <span className={styles.dropzoneLabel}>
            <i className="fa fa-plus" aria-hidden="true" />Drop new documents here
          </span>
          <span className={styles.dropzoneBrowse}>or
            <Dropzone
              className={styles.dropzoneBrowse}
              onDrop={this.onDrop}>
              Browse your computer
            </Dropzone>
          </span>
        </div>
      </div>
    );
  }
}
