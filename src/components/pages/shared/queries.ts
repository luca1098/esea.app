import { CanaliResponseSchema } from '@/core/types/canale';
import { CANALI_QUERY } from '@/graphql/queries/canale';
import { addEventMutation, boatEventsQuery } from '@/graphql/queries/events';
import { useQuery } from '@apollo/client';

type BoatEventsParams = {
  boatId: string;
};

export const useBoatEvents = ({ boatId }: BoatEventsParams) => {
  return useQuery(boatEventsQuery, {
    variables: {
      boatId,
    },
  });
};

import { useMutation } from '@apollo/client';

export const useAddEvent = (boatId: string) => {
  return useMutation(addEventMutation, {
    refetchQueries: [
      {
        query: boatEventsQuery,
        variables: {
          boatId,
        },
      },
    ],
  });
};
export const useCanali = () => {
  const { data, ...rest } = useQuery(CANALI_QUERY);

  return {
    data: data ? CanaliResponseSchema.parse(data).canali : data,
    ...rest,
  };
};
