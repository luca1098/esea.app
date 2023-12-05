import { gql } from '@apollo/client';

export const addBoatMutation = gql`
  mutation Boat($args: addBoatArgs!) {
    boat(args: $args) {
      error
      message
    }
  }
`;
