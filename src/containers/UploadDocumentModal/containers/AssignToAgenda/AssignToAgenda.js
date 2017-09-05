import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import Fuse from 'fuse.js';
import { addDocumentToAgenda, uncheckAll } from 'redux/modules/createagenda';
import { flattenAgenda } from 'helpers/polyfill';
import styles from './AssignToAgenda.scss';

const fuseOptions = {
  keys: ['label'],
  id: 'id'
};

@connect(state => ({
  files: state.createagenda.files,
  agendaList: state.createagenda.agendaList,
  firstCheck: state.createagenda.firstCheck
}))
export default class AssignToAgenda extends Component {
  static propTypes = {
    agendaList: PropTypes.array.isRequired,
    firstCheck: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { firstCheck } = this.props;
    if (firstCheck !== nextProps.firstCheck) {
      const flattenAgendaList = flattenAgenda(nextProps.agendaList);
      const transformedAgendaList = flattenAgendaList.map(agenda => ({
        ...agenda, value: agenda.id, label: agenda.label
      }));
      const hasNum = nextProps.firstCheck.num;
      const hasName = nextProps.firstCheck.name;
      const fuse = new Fuse(transformedAgendaList, fuseOptions);
      let searchResult = '';
      if (hasNum) {
        searchResult = fuse.search(hasNum);
        if (searchResult.length > 0) {
          searchResult = searchResult[0];
        }
      }
      if ((searchResult.length === 0) && hasName) {
        searchResult = fuse.search(hasName);
        if (searchResult.length > 0) {
          searchResult = searchResult[0];
        } else {
          searchResult = '';
        }
      }
      if (searchResult.length === 0) {
        searchResult = '';
      }

      this.setState({
        selected: searchResult
      });
    }
  }

  onChange = value => {
    this.setState({
      selected: value.value
    });
  };

  addDocument = () => {
    const { dispatch } = this.props;
    const { selected } = this.state;
    dispatch(addDocumentToAgenda(selected));
    dispatch(uncheckAll());
    this.setState({
      selected: ''
    });
  }

  render() {
    const { agendaList } = this.props;
    const { selected } = this.state;
    const flattenAgendaList = flattenAgenda(agendaList);
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
          <button
            onClick={this.addDocument}
            className={selected.length === 0 ? styles.disabled : ''}
            disabled={selected.length === 0}>Add</button>
        </div>
      </div>
    );
  }
}
