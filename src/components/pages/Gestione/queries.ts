import {
  ADD_BOAT_MUTATION,
  removeBoatMutation,
} from '@/graphql/queries/barche';
import { GET_COMPANY_QUERY } from '@/graphql/queries/company';

import { useMutation } from '@apollo/client';

export const useAddBoat = (companyId: string) => {
  return useMutation(ADD_BOAT_MUTATION, {
    refetchQueries: [
      {
        query: GET_COMPANY_QUERY,
        variables: {
          companyId,
        },
      },
    ],
  });
};
export const useRemoveBoat = (companyId: string) => {
  return useMutation(removeBoatMutation, {
    refetchQueries: [
      {
        query: GET_COMPANY_QUERY,
        variables: {
          companyId,
        },
      },
    ],
  });
};
