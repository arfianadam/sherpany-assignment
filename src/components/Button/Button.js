import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.scss';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.element,
    icon: PropTypes.string
  };

  static defaultProps = {
    children: <div />,
    icon: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { children, icon } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={styles.container}>
        <button
          className={styles.Button}
          data-icon={icon}
          onClick={this.toggleModal} />
        {isOpen ? React.cloneElement(children, { closeModal: this.toggleModal }) : null}
      </div>
    );
  }
}
