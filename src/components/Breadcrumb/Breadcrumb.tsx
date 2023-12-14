import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const { asPath } = useRouter();
  const [, ...rest] = asPath.split('?')[0].split('/');

  if (asPath === '/private') {
    rest.push('dashboard');
  }

  return (
    <ChakraBreadcrumb py={4}>
      {rest.map((routes, index) => (
        <BreadcrumbItem
          key={index}
          fontSize={'xs'}
          textTransform={'capitalize'}
          isCurrentPage={index + 1 === rest.length}
        >
          <BreadcrumbLink
            href={routes === 'private' ? '' : routes.toLowerCase()}
          >
            {routes.replaceAll('-', ' ').split('#')[0]}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;
