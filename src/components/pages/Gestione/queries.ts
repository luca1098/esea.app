import { addBoatMutation, removeBoatMutation } from '@/graphql/queries/barche';
import { gestioneParametriQuery } from '@/graphql/queries/gestione';
import { useMutation, useQuery } from '@apollo/client';

type GestioneParametriBoat = {
  email: string;
};

export const useGestioneParametri = ({ email }: GestioneParametriBoat) => {
  return useQuery(gestioneParametriQuery, {
    variables: {
      email,
    },
  });
};

export const useAddBoat = ({ email }: GestioneParametriBoat) => {
  return useMutation(addBoatMutation, {
    refetchQueries: [
      {
        query: gestioneParametriQuery,
        variables: {
          email,
        },
      },
    ],
  });
};
export const useRemoveBoat = ({ email }: GestioneParametriBoat) => {
  return useMutation(removeBoatMutation, {
    refetchQueries: [
      {
        query: gestioneParametriQuery,
        variables: {
          email,
        },
      },
    ],
  });
};
