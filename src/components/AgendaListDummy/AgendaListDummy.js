import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgendaListItem from 'components/AgendaListItem';
import styles from './AgendaListDummy.scss';

export default class AgendaListDummy extends Component {
  static propTypes = {
    agendaList: PropTypes.array.isRequired,
    addNewItem: PropTypes.func.isRequired,
    scrollToBottom: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      newItemValue: '',
      isSubItem: false
    };
  }

  componentDidUpdate(prevProps) {
    const { agendaList, scrollToBottom } = this.props;
    if (prevProps.agendaList !== agendaList) {
      scrollToBottom();
    }
  }

  onChange = (e) => {
    this.setState({
      newItemValue: e.target.value
    });
  }

  addNewItem = (e) => {
    e.preventDefault();
    const { addNewItem, agendaList } = this.props;
    const { newItemValue, isSubItem } = this.state;
    if (newItemValue.length > 0) {
      if (isSubItem) {
        addNewItem(newItemValue, true);
      } else {
        addNewItem(newItemValue);
      }
    } else if (agendaList.length > 0) {
      this.toggleSubItem();
    }
    this.clearInput();
  }

  clearInput = () => {
    this.setState({
      newItemValue: ''
    });
  }

  toggleSubItem = () => {
    const { isSubItem } = this.state;
    this.setState({
      isSubItem: !isSubItem
    });
  }

  render() {
    const { agendaList } = this.props;
    const { newItemValue, isSubItem } = this.state;
    const lastItemIndex = agendaList.length - 1;
    let newItemIndex = agendaList.length + 1;
    if (isSubItem) {
      newItemIndex = `${agendaList.length}.${agendaList[lastItemIndex].items.length + 1}`;
    }
    return (
      <div className={styles.AgendaListDummy}>
        <ul>
          {agendaList.map((item, key) =>
            (<AgendaListItem
              item={item}
              // because react needs unique key props
              // eslint-disable-next-line
              key={key}
              index={key + 1}
            />)
          )}
          <li>
            <form onSubmit={this.addNewItem}>
              <aside>{newItemIndex}</aside>
              <input
                type="text"
                placeholder="Enter a new agenda item..."
                onChange={this.onChange}
                value={newItemValue}
              />
            </form>
          </li>
        </ul>
      </div>
    );
  }
}
