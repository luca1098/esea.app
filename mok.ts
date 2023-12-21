import { PersonaleProps } from '@/components/pages/Gestione/Personale/schemas';

export const fakeUser = {
  name: 'User Mok',
  role: 'OWNER',
  email: 'mok@user.it',
  id: 'mok-1',
};

export const serviziMok = [
  {
    id: 'service-1',
    label: 'Escursione ai delfini',
    key: 'escursione-delfini',
  },
  {
    id: 'service-2',
    label: 'Noleggio con skipper ',
    kay: 'noleggio-skipper',
  },
];

const fakeBoat = {
  name: 'Super boat',
  image: 'https://esea-app.s3.eu-west-2.amazonaws.com/barca-test.webp',
  maxPeople: 12,
  services: serviziMok,
};
export const event = {
  from: 1701241200000,
  to: 1701255600000,
  id: 'event-1s21313sad',
  boatId: 'boat-id',
  titolo: 'Escursione con skipper',
  clienteId: 'client-id',
  skipperId: 'skipper-id',
};
export const event2 = {
  from: 1701262809 * 1000,
  to: 1701280809 * 1000,
  id: 'event-1s213131sad',
  boatId: 'boat-id',
  titolo: 'Escursione con skipper',
  clienteId: 'client-id',
  skipperId: 'skipper-id',
};

export const fakeBoats = [
  { ...fakeBoat, id: 'boat-id' },
  { ...fakeBoat, id: 'boat-id-2' },
  { ...fakeBoat, id: 'boat-id-4' },
  { ...fakeBoat, id: 'boat-id-3' },
  { ...fakeBoat, id: 'boat-id-8' },
];

export const personaleMok: PersonaleProps[] = [
  {
    id: 'pers-1',
    name: 'Mariapia Carta',
    image: '',
    salary: 25,
    birthday: 787104000 * 1000,
    role: 'ASSISTENT',
    salaryType: 'HOUR',
  },
  {
    id: 'pers-2',
    name: 'Maurizio costanzo',
    image: '',
    salary: 80,
    birthday: 787104000 * 1000,
    role: 'SKIPPER',
    salaryType: 'DAY',
  },
  {
    id: 'pers-3',
    name: 'Luigi cozza',
    image: '',
    salary: 80,
    birthday: 787104000 * 1000,
    role: 'SKIPPER',
    salaryType: 'DAY',
  },
  {
    id: 'pers-5',
    name: 'Andrea mucca',
    image: '',
    salary: 80,
    birthday: 787104000 * 1000,
    role: 'SKIPPER',
    salaryType: 'DAY',
  },
];

export const canaliMok = [
  {
    id: 'canale1',
    slug: 'sito-personale',
    label: 'Sito personale',
  },
  {
    id: 'canale2',
    slug: 'una-vita-vista-mare',
    label: 'Una vita vista mare',
  },
  {
    id: 'canale3',
    slug: 'sameboat',
    label: 'Sameboat',
  },
  {
    id: 'canale6',
    slug: 'guide-turistiche',
    label: 'Guide turistiche',
  },
];
