import { Heading, Stack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type PageTitleProps = {
  title: string;
  endElement?: ReactNode;
};
const PageTitle = ({ title, endElement }: PageTitleProps) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Heading as={'h1'} pb={6}>
        {title}
      </Heading>
      {endElement ? endElement : null}
    </Stack>
  );
};

export default PageTitle;
