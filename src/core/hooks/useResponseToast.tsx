import { useToast } from '@chakra-ui/react';
import { EseaResponse } from '../types/services';
import { GraphQLError } from 'graphql';

const useResponseToast = <T extends EseaResponse>() => {
  const toast = useToast();

  const errorToast = (errors: readonly GraphQLError[] | undefined, data: T) => {
    if (errors) {
      errors.forEach((e) => {
        toast({
          title: 'Errore',
          description: e.message,
          status: 'error',
          isClosable: true,
        });
      });
    }
    if (!data.valido) {
      toast({
        title: 'Errore',
        description: data?.message,
        status: 'error',
        isClosable: true,
      });
    }
  };
  const successToast = (data: T) => {
    toast({
      title: 'Successo',
      description: data?.message,
      status: 'success',
      isClosable: true,
    });
  };

  return {
    errorToast,
    successToast,
  };
};

export default useResponseToast;
