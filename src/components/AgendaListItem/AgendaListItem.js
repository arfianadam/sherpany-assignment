import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AgendaListItem.scss';

export default class AgendaListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, index } = this.props;
    const isMainItem = !item.items;
    return (
      <li className={`${styles.AgendaListItem} ${isMainItem ? styles.main : styles.sub}`}>
        <aside className={styles.itemIndex}>{index}</aside>
        <span>{item.text}</span>
      </li>
    );
  }
}
