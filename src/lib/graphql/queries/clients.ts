import { gql } from '@apollo/client';

export const ADD_CLIENT_MUTATION = gql`
  mutation Mutation($args: addClientArgs!) {
    addClient(args: $args) {
      message
      valido
      id
    }
  }
`;
