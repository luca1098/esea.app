import {
  FieldResolver,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
} from 'nexus';
import { User } from './User';

export const Boat = objectType({
  name: 'Boat',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('image');
    // t.field('services', {type:Service})
    // t.int('maxPeople');
    t.field('user', { type: User });
  },
});

export const AddBoat = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('boat', {
      type: AddBoatResponse,
      args: { args: nonNull(AddBoatArgs) },
      resolve: addBoatResolver,
    });
  },
});

const AddBoatArgs = inputObjectType({
  name: 'addBoatArgs',
  definition(t) {
    t.nonNull.string('userId'),
      t.nonNull.string('name'),
      t.nonNull.string('image'),
      t.nonNull.int('maxPeople');
  },
});
const AddBoatResponse = objectType({
  name: 'addBoatResponse',
  definition(t) {
    t.string('message'), t.boolean('error');
  },
});

const addBoatResolver: FieldResolver<'Mutation', 'AddBoat'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    await ctx.prisma.boat.create({
      data: {
        ...args.args,
      },
    });

    return { error: false, message: 'Barca inserita con con successo' };
  } catch (e: any) {
    return {
      error: true,
      message: e.message,
    };
  }
};
