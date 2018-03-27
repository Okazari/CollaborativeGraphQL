import React, { Component } from 'react';
import debounce from 'lodash.debounce';

export default class InputContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    updateInputValue(inputValue) {
        this.setState({ inputValue });
    }

    submitMessage = debounce(() => {
        const { addMessage } = this.props;
        const { inputValue } = this.state;

        addMessage({ username: 'admin', content: inputValue });
    }, 500);

    render() {
        return (
            <div>
                <textarea onChange={e => this.updateInputValue(e.currentTarget.value)} placeholder="Message...">
                </textarea>
                <button onClick={this.submitMessage}>Submit</button>
            </div>
        );
    }
};