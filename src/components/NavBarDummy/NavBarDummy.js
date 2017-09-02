import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBarItem from 'components/NavBarItem';
import styles from './NavBarDummy.scss';

export default class NavBarDummy extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { items, onClick, activeTab } = this.props;
    return (
      <div className={styles.NavBarDummy}>
        <ul>
          {items.map((item, key) =>
            (<NavBarItem
              item={item}
              // because react needs unique key props
              // eslint-disable-next-line
              key={key}
              onClick={onClick}
              active={activeTab === item.slug} />)
          )}
        </ul>
      </div>
    );
  }
}
