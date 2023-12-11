import { FormProvider, useForm } from 'react-hook-form';
import { NuovoPersonaleFormSchema, NuovoPersonaleFormValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/kit/Input/InputField';
import SelectField from '@/kit/Input/SelectField';
import {
  PersonaleRoleProps,
  PersonaleSalaryProps,
} from '@/core/shared/types/personale';
import { personaleRoleConfig, salaryConfig } from '../config';
import FileUploaderField from '@/kit/Input/FileUploaderField';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import Button from '@/kit/Button/Button';
import CurrencyInputFormField from '@/kit/Input/CurrencyInputField';
import DataPickerField from '@/kit/Input/DataPickerField';

const defaultValues: NuovoPersonaleFormValues = {
  name: '',
  birthday: null,
  salary: null,
  salaryType: 'HOUR',
  role: 'COLLABORATOR',
};

const NuovoPersonaleForm = () => {
  const methods = useForm<NuovoPersonaleFormValues>({
    resolver: zodResolver(NuovoPersonaleFormSchema),
    defaultValues,
  });

  const onSubmit = (values: NuovoPersonaleFormValues) => {
    console.log({ values });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid
          gap={2}
          templateColumns={{
            base: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
        >
          <GridItem colSpan={2}>
            <FileUploaderField name='image' maxFiles={1} maxSize={1} />
          </GridItem>
          <GridItem>
            <InputField name='name' label='Nome e cognome' />
          </GridItem>
          <GridItem>
            <DataPickerField name='birthday' label='Data di nascita' />
          </GridItem>
          <GridItem colSpan={2}>
            <SelectField<PersonaleRoleProps>
              name='role'
              label='Ruolo'
              options={personaleRoleConfig}
              getOptionLabel={({ label }) => label}
              getKey={({ key }) => key}
              getValue={({ key }) => key}
            />
          </GridItem>
          <GridItem>
            <CurrencyInputFormField name='salary' label='Paga' />
          </GridItem>
          <GridItem>
            <SelectField<PersonaleSalaryProps>
              name='salaryType'
              label='Paga per'
              options={salaryConfig}
              getOptionLabel={({ label }) => label}
              getKey={({ key }) => key}
              getValue={({ key }) => key}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Flex justifyContent={'end'} mt={2}>
              <Button label='Crea nuovo personale' type='submit' />
            </Flex>
          </GridItem>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default NuovoPersonaleForm;
