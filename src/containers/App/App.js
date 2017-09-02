import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';

@connect(
  state => ({
    notifs: state.notifs
  })
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    router: PropTypes.object.isRequired,
    notifs: PropTypes.object.isRequired,
  };

  static defaultProps = {
    user: null,
    children: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        {children}
      </div>
    );
  }
}
