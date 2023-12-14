import { gql } from '@apollo/client';

export const boatEventsQuery = gql`
  query BoatEvents($boatId: String!) {
    boatEvents(boatId: $boatId) {
      clientId
      boatId
      from
      id
      skipperId
      titolo
      to
    }
  }
`;
