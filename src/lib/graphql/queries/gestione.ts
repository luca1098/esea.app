import { gql } from '@apollo/client';

export const gestioneParametriQuery = gql`
  query GestioneParametri($email: String!) {
    gestioneParametri(email: $email) {
      email
      boats {
        id
        image
        name
      }
    }
  }
`;
