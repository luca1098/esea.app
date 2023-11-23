import { navigation } from '@/core/config/navigation';
import { ActionButtonProps } from '@/kit/Button/ActionButton';

export const userPannelActions: ActionButtonProps[] = [
  { label: 'Overview', href: navigation.private.gestione.index },
  { label: 'Barche', href: navigation.private.gestione.barche },
  { label: 'Personale', href: navigation.private.gestione.personale },
];
