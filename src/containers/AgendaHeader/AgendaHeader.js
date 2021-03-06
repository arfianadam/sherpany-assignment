import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from 'containers/NavBar';
import AgendaHeaderDummy from 'components/AgendaHeaderDummy';
import { changeTitle } from 'redux/modules/createagenda';
import styles from './AgendaHeader.scss';

const items = [
  {
    label: 'Details',
    slug: 'details'
  },
  {
    label: 'Agenda',
    slug: 'agenda'
  }
];

@connect(store => ({
  title: store.createagenda.title
}))
export default class AgendaHeader extends Component {
  static propTypes = {
    create: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    create: false
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  changeTitle = (newTitle) => {
    const { dispatch } = this.props;
    dispatch(changeTitle(newTitle));
  }

  render() {
    const { create, title } = this.props;
    return (
      <div className={styles.AgendaHeader}>
        <AgendaHeaderDummy
          create={create}
          onChange={this.changeTitle}
          title={title} />
        <NavBar
          items={items}
          category="createagenda"
        />
      </div>
    );
  }
}
