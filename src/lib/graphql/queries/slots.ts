import { gql } from '@apollo/client';

export const GET_UNAVIABLE_SLOT_QUERY = gql`
  query UnaviableSlot($boatId: String!) {
    unaviableSlot(boatId: $boatId) {
      from
      id
      to
    }
  }
`;
