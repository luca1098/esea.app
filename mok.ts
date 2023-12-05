export const fakeUser = {
  name: 'User Mok',
  role: 'OWNER',
  email: 'mok@user.it',
  id: 'mok-1',
};

const fakeBoat = {
  name: 'Super boat',
  image:
    'https://www.unavitavistamare.com/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FOVR10jQXSze4HwfTVUFA&w=1920&q=75',
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

export const fakeBoats = [
  { ...fakeBoat, id: 'boat-id', events: [event] },
  { ...fakeBoat, id: 'boat-id-2' },
  { ...fakeBoat, id: 'boat-id-3' },
];
