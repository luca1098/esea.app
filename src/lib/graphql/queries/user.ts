import { gql } from '@apollo/client';

export const GET_ALL_USER_QUERY = gql`
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

export const GET_USER_QUERY = gql`
  query User($email: String!) {
    user(email: $email) {
      id
      email
      name
      image
      password
      role
      companyId
      phone
      dataNascita
      codFisc
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation Mutation($credentials: createUserArgs!) {
    user(credentials: $credentials) {
      valido
      message
    }
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation Mutation($args: editUserArgs!) {
    editUser(args: $args) {
      message
      valido
    }
  }
`;
