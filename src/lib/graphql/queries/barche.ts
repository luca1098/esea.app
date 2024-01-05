import { gql } from '@apollo/client';

export const ADD_BOAT_MUTATION = gql`
  mutation AddBoatMutation(
    $companyId: String!
    $name: String
    $image: String
    $maxPeople: Int
    $services: [ServiceArgs!]
    $unaviableSlots: [SlotsArgs!]
  ) {
    addBoat(
      companyId: $companyId
      name: $name
      image: $image
      maxPeople: $maxPeople
      services: $services
      unaviableSlots: $unaviableSlots
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
