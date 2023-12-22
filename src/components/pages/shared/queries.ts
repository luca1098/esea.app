import { CanaliResponseSchema } from '@/core/types/canale';
import { CANALI_QUERY } from '@/graphql/queries/canale';
import {
  COMPANY_EVENT_QUERY,
  addEventMutation,
  BOAT_EVENT_QUERY,
} from '@/graphql/queries/events';
import { useQuery } from '@apollo/client';
import {
  BoatEventsResponseSchema,
  CompanyEventsResponseSchema,
} from './schemas';

type BoatEventsParams = {
  boatId: string;
};

export const useBoatEvents = ({ boatId }: BoatEventsParams) => {
  const { data, ...rest } = useQuery(BOAT_EVENT_QUERY, {
    variables: {
      boatId,
    },
  });
  return {
    data: data ? BoatEventsResponseSchema.parse(data).boatEvents : data,
    ...rest,
  };
};

import { useMutation } from '@apollo/client';

export const useAddEvent = (boatId: string, companyId: string) => {
  return useMutation(addEventMutation, {
    refetchQueries: [
      {
        query: BOAT_EVENT_QUERY,
        variables: {
          boatId,
        },
      },
      {
        query: COMPANY_EVENT_QUERY,
        variables: {
          companyId,
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

export const useCompanyEvent = (companyId: string) => {
  const { data, ...rest } = useQuery(COMPANY_EVENT_QUERY, {
    variables: {
      companyId,
    },
  });

  return {
    data: data ? CompanyEventsResponseSchema.parse(data).companyEvents : data,
    ...rest,
  };
};
