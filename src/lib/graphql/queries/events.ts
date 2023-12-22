import { gql } from '@apollo/client';

export const BOAT_EVENT_QUERY = gql`
  query BoatEvents($boatId: String!) {
    boatEvents(boatId: $boatId) {
      id
      note
      people
      from
      to
      service {
        id
        label
      }
      client {
        name
        phone
        id
      }
      skipper {
        id
        name
        image
      }
    }
  }
`;

export const COMPANY_EVENT_QUERY = gql`
  query CompanyEventsQuery($companyId: String!) {
    companyEvents(companyId: $companyId) {
      companyId
      from
      id
      note
      people
      service {
        id
        label
      }
      to
      boat {
        name
        image
        id
      }
      canale {
        id
        label
      }
      skipper {
        image
        name
        id
      }
      client {
        id
        name
        phone
        email
      }
      amount
      statusDetails
      status
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

export const GET_COMPANY_EVENTS = gql`
  mutation AddEventMutation($args: createEventsArgs!) {
    createEvents(args: $args) {
      valido
      message
    }
  }
`;
export const DELETE_EVENT = gql`
  mutation Mutation($id: String!) {
    deleteEvents(id: $id) {
      message
      valido
    }
  }
`;
