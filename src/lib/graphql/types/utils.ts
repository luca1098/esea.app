import { objectType } from 'nexus';

export const getEseaCommonResponse = (name: string) => {
  return objectType({
    name,
    definition(t) {
      t.string('message'), t.boolean('valido');
    },
  });
};
