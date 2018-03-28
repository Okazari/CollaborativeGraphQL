import React, { Component } from 'react';
import Input from '../Input'

const messageStyle = {
  backgroundColor: 'lavender',
  padding: 5,
  margin: 5,
  width: 300,
}

const userStyle = {
  color: 'grey',
  margin: 5,
  padding: 5,
  borderBottom: '1px solid',
}

const contentStyle = {
  margin: 5,
  padding: 5,
  paddingLeft: 15,
  fontSize: 24,
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 400,
  margin: 'auto',
}


export default class InputComponent extends Component {
  componentDidMount() {
    const { subscribeToNewMessages } = this.props;
    subscribeToNewMessages();
  }
  
  render() {
    const { loading, data: { messages } } = this.props;
    const buildMessage = (m, i) => {
      let s = { ...messageStyle }
      s.transform = `translateX(${i%2 + messages.length%2 - 1?50:-50}px)`
      if(i%2 + messages.length%2 - 1 == 0) s.backgroundColor = 'aliceblue'
      return (
        <div style={s} key={m.id}>
          <div style={{ ...userStyle }}>
            {m.username}
          </div>
          <div style={{ ...contentStyle }}>
            {m.content}
          </div>
        </div>
      )
    }
    return (
      <div>
        <div style={{ ... containerStyle}}>
          <Input />
            {
              !loading ? messages.map(buildMessage)
              : 'Aucun message'
            }
        </div>
      </div>
    );
  }
}
