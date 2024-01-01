import { gql } from '@apollo/client';

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($name: String!, $logo: String) {
    createCompany(name: $name, logo: $logo) {
      message
      valido
      id
    }
  }
`;
