import { gql } from '@apollo/client';

export const boatEventsQuery = gql`
  query BoatEvents($boatId: String!) {
    boatEvents(boatId: $boatId) {
      clientId
      boatId
      from
      id
      skipperId
      serviceSlug
      to
      canaleId
      note
      people
    }
  }
`;

export const addEventMutation = gql`
  mutation AddEventMutation($args: createEventsArgs!) {
    createEvents(args: $args) {
      valido
      message
    }
  }
`;
