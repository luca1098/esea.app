import { calendarioParametriQuery } from '@/graphql/queries/calendario';
import { useQuery } from '@apollo/client';
import { CalendarioParamentriResponseSchema } from './schemas';

type CalendarioParametriProps = {
  email: string;
};

export const useCalendarioParametri = ({ email }: CalendarioParametriProps) => {
  const { data, ...rest } = useQuery(calendarioParametriQuery, {
    variables: {
      email,
    },
  });
  return {
    data: data
      ? CalendarioParamentriResponseSchema?.parse(data)?.calendarioParametri
      : data,
    ...rest,
  };
};
