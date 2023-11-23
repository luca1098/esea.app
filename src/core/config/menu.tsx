import {
  CalendarIcon,
  DocsIcon,
  GestioneIcon,
  HomeIcon,
  StatsIcon,
  UserIcon,
} from '@/kit/Icons/icons';
import { Role } from '../shared/types/user';
import { IconType } from 'react-icons';
import { navigation } from './navigation';

export type MenuItemProps = {
  id: string;
  path: string;
  label: string;
  icon?: IconType;
  disabled?: boolean;
};

const ownerMenu: MenuItemProps[] = [
  {
    id: '1',
    path: navigation.private.dashboard,
    label: 'Dashboard',
    icon: HomeIcon,
    disabled: false,
  },
  {
    id: '2',
    path: navigation.private.calendario,
    label: 'Calendario',
    icon: CalendarIcon,
    disabled: false,
  },
  {
    id: '3',
    path: navigation.private.statistiche,
    label: 'Statistiche',
    icon: StatsIcon,
    disabled: false,
  },
  {
    id: '4',
    path: navigation.private.skippers,
    label: 'Skippers',
    icon: UserIcon,
    disabled: false,
  },
  {
    id: '5',
    path: navigation.private.documenti,
    label: 'Documenti',
    icon: DocsIcon,
    disabled: false,
  },
  {
    id: '6',
    path: navigation.private.gestione.index,
    label: 'Gestione',
    icon: GestioneIcon,
    disabled: false,
  },
];

const adminMenu: MenuItemProps[] = [
  {
    id: '1',
    path: navigation.admin.dashboard,
    label: 'Dashboard',
    icon: HomeIcon,
    disabled: false,
  },
  {
    id: '2',
    path: navigation.admin.statistiche,
    label: 'Statistiche',
    icon: StatsIcon,
    disabled: false,
  },
  {
    id: '3',
    path: navigation.admin.clienti,
    label: 'Clienti',
    icon: UserIcon,
    disabled: false,
  },
  {
    id: '4',
    path: navigation.admin.barche,
    label: 'Barche',
    icon: DocsIcon,
    disabled: false,
  },
];

export const menuByUserRole: Record<Role, MenuItemProps[]> = {
  OWNER: ownerMenu,
  ADMIN: adminMenu,
};

export const publicMenu: MenuItemProps[] = [
  {
    id: '1',
    path: navigation.public.feature,
    label: 'Feature',
    disabled: false,
  },
  {
    id: '2',
    path: navigation.public.pricing,
    label: 'Prezzo',
    disabled: false,
  },
];
