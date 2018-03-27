import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const AddMessage = gql`
    mutation addMessage($username: String!, $content: String!) {
        addMessage(username: $username, content: $content) {
            id
            content
        }
    }
`;

export default InputComponent =>
    <Mutation mutation={AddMessage} >
        {mutate => <InputComponent addMessage={variables => mutate({ variables })} />}
    </Mutation>