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
export const GET_COMPANY_QUERY = gql`
  query Company($companyId: String!) {
    company(id: $companyId) {
      id
      logo
      name
      boats {
        id
        image
        name
      }
      employees {
        id
        image
        name
      }
    }
  }
`;
