export const fakeUser = {
  name: 'User Mok',
  role: 'OWNER',
  email: 'mok@user.it',
  id: 'mok-1',
};

const fakeBoat = {
  name: 'boat',
  id: 'boat-id',
  image:
    'https://www.unavitavistamare.com/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FOVR10jQXSze4HwfTVUFA&w=1920&q=75',
  maxPeople: 12,
};
export const fakeBoats = [
  fakeBoat,
  { ...fakeBoat, id: 'boat-id-2' },
  { ...fakeBoat, id: 'boat-id-3' },
];
