import { gql } from '@apollo/client';

export const PERSONALE_QUERY = gql`
  query CompanyPersonale($companyId: String!) {
    companyPersonale(companyId: $companyId) {
      image
      id
      name
      role
      salary
      birtday
      salaryType
      companyId
    }
  }
`;

export const ADD_PERSONALE_MUTATION = gql`
  mutation AddPersonale($args: addPersonaleArgs!) {
    addPersonale(args: $args) {
      message
      valido
    }
  }
`;
