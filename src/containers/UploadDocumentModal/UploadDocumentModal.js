import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { addNewFiles, toggleSelect } from 'redux/modules/createagenda';
import AssignToAgenda from './containers/AssignToAgenda';
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
        <div className={styles.searchContainer}>
          <i className={`fa fa-search ${styles.search}`} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search documents..."
            disabled />
          <div className={styles.divider} />
          <div className={styles.selectAll}>Select all</div>
          <i className={`fa fa-trash ${styles.trash}`} aria-hidden="true"></i>
        </div>
        <ul className={styles.fileList}>
          {files.map((file, key) => // eslint-disable-next-line
            (<li
              key={file.id}
              className={file.checked ? styles.checked : ''}
              onClick={this.toggleSelect(file.id)}>
              <input
                id={`file-${key}`}
                type="checkbox"
                checked={file.checked} />
              <span>{file.file.name}</span>
            </li>)
            )
          }
        </ul>
        <AssignToAgenda />
      </div>
    );
  }
}
