import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AgendaHeaderDummy.scss';

export default class AgendaHeaderDummy extends Component {
  static propTypes = {
    create: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    create: false
  };

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentDidUpdate() {
    this.hiddenTitleInput.style.display = 'inline';
    if (this.hiddenTitleInput.offsetWidth > 150) {
      this.titleInput.style.width = `${this.hiddenTitleInput.offsetWidth.toString()}px`;
    } else {
      this.titleInput.style.width = '150px';
    }
    this.hiddenTitleInput.style.display = 'none';
  }

  onChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const { create, title } = this.props;
    return (
      <div className={`${styles.AgendaHeaderDummy} ${create ? styles.create : ''}`}>
        <div className={styles.title}>
          <input
            value={title}
            onChange={this.onChange}
            ref={ref => { this.titleInput = ref; }}
            type="text"
            placeholder="Your Agenda Title" />
          <span
            ref={ref => { this.hiddenTitleInput = ref; }}
          >{title}</span>
        </div>
      </div>
    );
  }
}
