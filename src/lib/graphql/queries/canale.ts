import { gql } from '@apollo/client';

export const CANALI_QUERY = gql`
  query Query {
    canali {
      label
      id
    }
  }
`;
