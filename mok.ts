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
