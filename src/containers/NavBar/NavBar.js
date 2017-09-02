import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBarDummy from 'components/NavBarDummy';
import { switchTab } from 'redux/modules/createagenda';

@connect(store => ({
  activeTab: store.createagenda.activeTab
}))
export default class NavBar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick = (tab) => (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(switchTab(tab));
  }

  render() {
    const { items, category, activeTab } = this.props;
    return (
      <NavBarDummy
        items={items}
        category={category}
        onClick={this.onClick}
        activeTab={activeTab}
      />
    );
  }
}
