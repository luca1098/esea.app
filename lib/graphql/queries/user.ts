import { gql } from '@apollo/client';

export const allUsersQuery = gql`
  query Users {
    users {
      id
      image
      name
      email
      role
    }
  }
`;
