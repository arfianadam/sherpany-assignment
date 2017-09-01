import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
// import { asyncConnect } from 'redux-connect';

// @asyncConnect([{
//   promise: ({ store: { dispatch, getState } }) => {
//     const promises = [];

//     if (!isAuthLoaded(getState())) {
//       promises.push(dispatch(loadAuth()));
//     }
//     return Promise.all(promises);
//   }
// }]) This is to load auth on the server
@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user
  })
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object,
    notifs: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      const redirect = this.props.router.location.query && this.props.router.location.query.redirect;
      this.props.pushState(redirect || '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
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
