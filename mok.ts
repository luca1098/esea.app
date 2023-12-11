import { PersonaleProps } from '@/components/pages/Gestione/Personale/schemas';

export const fakeUser = {
  name: 'User Mok',
  role: 'OWNER',
  email: 'mok@user.it',
  id: 'mok-1',
};

const fakeBoat = {
  name: 'Super boat',
  image: 'https://esea-app.s3.eu-west-2.amazonaws.com/barca-test.webp',
  maxPeople: 12,
};
export const event = {
  from: 1701241200 * 1000,
  to: 1701255600 * 1000,
  id: 'event-1s21313sad',
  boatId: 'boat-id',
  titolo: 'Escursione con skipper',
  clienteId: 'client-id',
  skipperId: 'skipper-id',
};
export const event2 = {
  from: 1701262809 * 1000,
  to: 1701280809 * 1000,
  id: 'event-1s21313sad',
  boatId: 'boat-id',
  titolo: 'Escursione con skipper',
  clienteId: 'client-id',
  skipperId: 'skipper-id',
};

export const fakeBoats = [
  { ...fakeBoat, id: 'boat-id', events: [event, event2] },
  { ...fakeBoat, id: 'boat-id-2' },
  { ...fakeBoat, id: 'boat-id-3' },
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
];
