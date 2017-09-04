import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { addNewFiles, toggleSelect } from 'redux/modules/createagenda';
import styles from './UploadDocumentModal.scss';

@connect(state => ({
  files: state.createagenda.files
}))
export default class UploadDocumentModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired
  };

  static defaultProps = {
    closeModal: () => {}
  };

  onDrop = droppedFiles => {
    const { dispatch } = this.props;
    console.log(droppedFiles);
    dispatch(addNewFiles(droppedFiles));
  }

  toggleSelect = id => () => {
    const { dispatch } = this.props;
    dispatch(toggleSelect(id));
  }

  render() {
    const { closeModal, files } = this.props;
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
            onDrop={this.onDrop}
            accept="application/pdf" />
          <span className={styles.dropzoneLabel}>
            <i className="fa fa-plus" aria-hidden="true" />Drop new documents here
          </span>
          <span className={styles.dropzoneBrowse}>or
            <Dropzone
              className={styles.dropzoneBrowse}
              onDrop={this.onDrop}
              accept="application/pdf">
              Browse your computer
            </Dropzone>
          </span>
        </div>
        <div className={styles.filesContainer}>
          <header>
            <span className={files.length > 0 ? '' : styles.disabled}>Available documents ({files.length})</span>
          </header>
        </div>
        <ul className={styles.fileList}>
          {files.map((file, key) => // eslint-disable-next-line
            (<li key={key}
              className={file.checked ? styles.checked : ''}>
              <input
                id={`file-${key}`}
                type="checkbox"
                checked={file.checked}
                onChange={this.toggleSelect(file.id)} />
              <label htmlFor={`file-${key}`}>{file.file.name}</label>
            </li>)
            )
          }
        </ul>
        <footer>This is miw.</footer>
      </div>
    );
  }
}
