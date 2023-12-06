import { gql } from '@apollo/client';

export const addBoatMutation = gql`
  mutation AddBoat($args: addBoatArgs!) {
    addBoat(args: $args) {
      error
      message
    }
  }
`;

export const removeBoatMutation = gql`
  mutation DeleteBoat($boatId: String!) {
    deleteBoat(id: $boatId) {
      message
      valido
    }
  }
`;
