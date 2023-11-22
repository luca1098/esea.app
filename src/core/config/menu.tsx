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

export type MenuItemProps = {
  id: string;
  path: string;
  label: string;
  icon?: IconType;
  disabled?: boolean;
};

const userMenu: MenuItemProps[] = [
  {
    id: '1',
    path: '/private/dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
    disabled: false,
  },
  {
    id: '2',
    path: '/private/calendario',
    label: 'Calendario',
    icon: CalendarIcon,
    disabled: false,
  },
  {
    id: '3',
    path: '/private/statistiche',
    label: 'Statistiche',
    icon: StatsIcon,
    disabled: false,
  },
  {
    id: '4',
    path: '/private/skippers',
    label: 'Skippers',
    icon: UserIcon,
    disabled: false,
  },
  {
    id: '5',
    path: '/private/documenti',
    label: 'Documenti',
    icon: DocsIcon,
    disabled: false,
  },
  {
    id: '6',
    path: '/private/gestione',
    label: 'Gestione',
    icon: GestioneIcon,
    disabled: false,
  },
];

const adminMenu: MenuItemProps[] = [
  {
    id: '1',
    path: '/admin/',
    label: 'Dashboard',
    icon: HomeIcon,
    disabled: false,
  },
  {
    id: '2',
    path: '/admin/statistiche',
    label: 'Statistiche',
    icon: StatsIcon,
    disabled: false,
  },
  {
    id: '3',
    path: '/admin/clienti',
    label: 'Clienti',
    icon: UserIcon,
    disabled: false,
  },
  {
    id: '4',
    path: '/admin/barche',
    label: 'Barche',
    icon: DocsIcon,
    disabled: false,
  },
];

export const menuByUserRole: Record<Role, MenuItemProps[]> = {
  USER: userMenu,
  ADMIN: adminMenu,
};

export const publicMenu: MenuItemProps[] = [
  {
    id: '1',
    path: '/feature/',
    label: 'Feature',
    disabled: false,
  },
  {
    id: '2',
    path: '/pricing/',
    label: 'Prezzo',
    disabled: false,
  },
];
