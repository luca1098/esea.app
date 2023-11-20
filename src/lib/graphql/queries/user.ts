import { gql } from '@apollo/client';

export const allUsersQuery = gql`
  query Users {
    users {
      id
      image
      password
      name
      email
      role
    }
  }
`;

export const userQuery = gql`
  query User($email: String!) {
    user(email: $email) {
      id
      email
      name
      image
      password
      role
    }
  }
`;

export const createUserMutation = gql`
  mutation Mutation($credentials: createUserArgs!) {
    user(credentials: $credentials) {
      error
      message
    }
  }
`;
