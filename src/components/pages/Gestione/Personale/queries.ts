import {
  ADD_PERSONALE_MUTATION,
  PERSONALE_QUERY,
  REMOVE_PERSONALE_MUTATION,
} from '@/graphql/queries/personale';
import { useMutation, useQuery } from '@apollo/client';
import { PersonaleResponseSchema } from './schemas';

export const usePersonale = (companyId: string) => {
  const { data, ...rest } = useQuery(PERSONALE_QUERY, {
    variables: {
      companyId,
    },
  });

  return {
    data: data ? PersonaleResponseSchema.parse(data).companyPersonale : data,
    ...rest,
  };
};

export const useAddPersonale = (companyId: string) => {
  return useMutation(ADD_PERSONALE_MUTATION, {
    refetchQueries: [
      {
        query: PERSONALE_QUERY,
        variables: {
          companyId,
        },
      },
    ],
  });
};
export const useDeletePersonale = (companyId: string) => {
  return useMutation(REMOVE_PERSONALE_MUTATION, {
    refetchQueries: [
      {
        query: PERSONALE_QUERY,
        variables: {
          companyId,
        },
      },
    ],
  });
};
