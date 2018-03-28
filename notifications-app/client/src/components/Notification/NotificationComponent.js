import React, { Component } from 'react';

export default class InputComponent extends Component {
  componentDidMount() {
    const { subscribeToNewMessages } = this.props;
    console.log(subscribeToNewMessages);
    subscribeToNewMessages();
  }

  render() {
    const { loading, data: { messages } } = this.props;
    return (
      <div>{loading ? 'loading...' : messages.map(({ id, content }) => <span key={id}>{content}</span>)}</div>
    );
  }
}