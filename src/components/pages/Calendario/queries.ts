import { calendarioParametriQuery } from '@/graphql/queries/calendario';
import { useQuery } from '@apollo/client';

type CalendarioParametriProps = {
  email: string;
};

export const useCalendarioParametri = ({ email }: CalendarioParametriProps) => {
  return useQuery(calendarioParametriQuery, {
    variables: {
      email,
    },
  });
};
