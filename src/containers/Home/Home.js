import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import styles from './Home.scss';

@connect(
  state => ({
    online: state.online
  })
)
export default class Home extends Component {


  render() {
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
      </div>
    );
  }
}
