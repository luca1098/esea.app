import { addBoatMutation, removeBoatMutation } from '@/graphql/queries/barche';
import { GET_COMPANY_QUERY } from '@/graphql/queries/company';

import { useMutation } from '@apollo/client';

export const useAddBoat = (companyId: string) => {
  return useMutation(addBoatMutation, {
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
