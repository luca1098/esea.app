import { CREATE_COMPANY_MUTATION } from '@/graphql/queries/company';
import { useMutation } from '@apollo/client';

export const useCreateCompany = () => {
  return useMutation(CREATE_COMPANY_MUTATION);
};
