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
    if (item.items.length > 0) {
      return (
        <li className={styles.hasChild}>
          <ul>
            <li className={`${styles.AgendaListItem} ${styles.main}`}>
              <aside className={styles.itemIndex}>{index}</aside>
              <span>{item.text}</span>
            </li>
            {item.items.map((subItem, key) => (
              <li
                className={`${styles.AgendaListItem} ${styles.sub}`}
                // because react needs unique key props
                // eslint-disable-next-line
                key={key}
              >
                <aside className={styles.itemIndex}>{`${index}.${key + 1}`}</aside>
                <span>{subItem.text}</span>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    return (
      <li className={`${styles.AgendaListItem} ${styles.main}`}>
        <aside className={styles.itemIndex}>{index}</aside>
        <span>{item.text}</span>
      </li>
    );
  }
}
