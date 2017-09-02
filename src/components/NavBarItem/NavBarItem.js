import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './NavBarItem.scss';

export default class NavBarItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, onClick, active } = this.props;
    return (
      <li className={styles.NavBarItem}>
        <button
          onClick={onClick(item.slug)}
          className={active ? styles.active : ''}
        >
          {item.label}
        </button>
      </li>
    );
  }
}
