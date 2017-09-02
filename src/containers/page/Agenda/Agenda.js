import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import { connect } from 'react-redux';
import AgendaHeader from 'containers/AgendaHeader';
import styles from './Agenda.scss';

export default class Agenda extends Component {
  render() {
    return (
      <div className={styles.Agenda}>
        <Helmet title="Agenda" />
        <AgendaHeader create />
      </div>
    );
  }
}
