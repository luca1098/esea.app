import { gql } from '@apollo/client';

export const calendarioParametriQuery = gql`
  query CalendarioParametri($email: String!) {
    calendarioParametri(email: $email) {
      boats {
        id
        image
        name
        services {
          id
          label
          slug
        }
      }
    }
  }
`;
