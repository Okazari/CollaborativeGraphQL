import React, { Component } from 'react';
import debounce from 'lodash.debounce';

const inputStyle = {
  border: 'none',
  borderBottom: '2px solid lightgrey',
  margin: 20,
  marginBottom: 20,
}

const buttonStyle = {
  border: 'none',
  backgroundColor: 'darkseagreen',
  margin: 20,
  marginTop: 0,
  marginBottom: 5,
  padding: 10,
  color: 'white',
  cursor: 'pointer',
}

const containerStyle = {
  padding: 20,
  width: 'calc(100% - 30px)',
  border: 'solid 1px darkseagreen'
}

export default class InputContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            name: '',
        };
    }

    updateInputValue(inputValue) {
        this.setState({ inputValue });
    }

    updateName(name) {
        this.setState({ name });
    }

    submitMessage = debounce(() => {
        const { addMessage } = this.props;
        const { inputValue, name } = this.state;
        if( name && inputValue && name !== "" && inputValue !== "")
        addMessage({ username: name, content: inputValue });
    }, 500);

    render() {
        return (
            <div style={{ display: 'flex', flexDirection:'column', ...containerStyle }}>
              <input style={{ ...inputStyle }} placeholder="Username" onChange={e => this.updateName(e.currentTarget.value)}/>
              <div>
                <textarea style={{ width: 'calc(100% - 40px)', ...inputStyle}} onChange={e => this.updateInputValue(e.currentTarget.value)} placeholder="Message...">
                </textarea>
              </div>
              <button style={{ ...buttonStyle }} onClick={this.submitMessage}>Submit</button>
            </div>
        );
    }
};
