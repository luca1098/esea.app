import { addEventMutation, boatEventsQuery } from '@/graphql/queries/events';
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
