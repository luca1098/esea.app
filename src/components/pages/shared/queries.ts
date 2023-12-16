import { boatEventsQuery } from '@/graphql/queries/events';
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