import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const AddMessage = gql`
    mutation addMessage($username: String!, $content: String!) {
        addMessage(username: $username, content: $content) {
            id
            content
        }
    }
`;

export default InputComponent => graphql(AddMessage, {
    props: ({ mutate }) => ({
        addMessage: variables => mutate({ variables }),
    }),
})(InputComponent);