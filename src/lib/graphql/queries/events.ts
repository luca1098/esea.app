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
