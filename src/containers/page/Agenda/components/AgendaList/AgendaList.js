import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgendaListDummy from 'components/AgendaListDummy';
import { connect } from 'react-redux';
import { addNewItem } from 'redux/modules/createagenda';
import styles from './AgendaList.scss';

@connect(state => ({
  agendaList: state.createagenda.agendaList
}))
export default class AgendaList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    agendaList: PropTypes.array.isRequired,
    scrollToBottom: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  addNewItem = (item, isSubItem = false) => {
    const { dispatch } = this.props;
    dispatch(addNewItem(item, isSubItem));
  }

  render() {
    const { agendaList, scrollToBottom } = this.props;
    return (
      <div className={styles.AgendaList}>
        <AgendaListDummy
          addNewItem={this.addNewItem}
          agendaList={agendaList}
          scrollToBottom={scrollToBottom}
        />
      </div>
    );
  }
}
