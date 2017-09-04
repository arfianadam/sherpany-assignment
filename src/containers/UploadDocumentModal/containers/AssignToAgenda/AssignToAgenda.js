import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import styles from './AssignToAgenda.scss';

@connect(state => ({
  files: state.createagenda.files,
  agendaList: state.createagenda.agendaList
}))
export default class AssignToAgenda extends Component {
  static propTypes = {
    agendaList: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  onChange = value => {
    this.setState({
      selected: value.value
    });
  };

  flattenAgenda = agendaList => {
    const flattenAgenda = [];
    agendaList.map(agenda => { // eslint-disable-line
      flattenAgenda.push(agenda);
      if (agenda.items.length > 0) {
        agenda.items.map(subAgenda => { // eslint-disable-line
          flattenAgenda.push(subAgenda);
        });
      }
    });
    return flattenAgenda;
  };

  render() {
    const { agendaList } = this.props;
    const { selected } = this.state;
    const flattenAgendaList = this.flattenAgenda(agendaList);
    const transformedAgendaList = flattenAgendaList.map(agenda => ({
      ...agenda, value: agenda.id, label: agenda.label
    }));
    return (
      <div className={styles.AssignToAgenda}>
        <div className={styles.container}>
          <aside>Agenda item</aside>
          <Select
            className={styles.select}
            options={transformedAgendaList}
            value={selected}
            clearable={false}
            onChange={this.onChange} />
          <button>Add</button>
        </div>
      </div>
    );
  }
}
