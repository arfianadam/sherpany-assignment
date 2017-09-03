import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AgendaDetails from 'containers/page/Agenda/components/AgendaDetails';
import AgendaList from 'containers/page/Agenda/components/AgendaList';
import styles from './AgendaContent.scss';

@connect(store => ({
  activeTab: store.createagenda.activeTab
}))
export default class AgendaContent extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollToBottom = () => {
    this.container.scrollTop = this.container.scrollHeight;
  }

  render() {
    const { activeTab } = this.props;
    const scrollToBottom = this.scrollToBottom;
    function getTabComponent(tab) {
      switch (tab) {
        case 'details':
          return <AgendaDetails />;
        case 'agenda':
          return <AgendaList scrollToBottom={scrollToBottom} />;
        default:
          return null;
      }
    }
    return (
      <div
        className={styles.AgendaContent}
        ref={ref => { this.container = ref; }}
      >
        {getTabComponent(activeTab)}
      </div>
    );
  }
}
