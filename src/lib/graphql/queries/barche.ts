import { gql } from '@apollo/client';

export const ADD_BOAT_MUTATION = gql`
  mutation AddBoat(
    $companyId: String!
    $services: [ServiceArgs!]
    $name: String
    $image: String
    $maxPeople: Int
  ) {
    addBoat(
      companyId: $companyId
      services: $services
      name: $name
      image: $image
      maxPeople: $maxPeople
    ) {
      message
      valido
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
