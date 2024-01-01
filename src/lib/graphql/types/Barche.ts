import {
  FieldResolver,
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { User } from './User';
import { Event } from './Events';
import { Service } from './Services';
import { getErrorReturn } from '@/lib/utils';
import { Company } from './Company';

export const Boat = objectType({
  name: 'Boat',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('companyId');
    t.string('name');
    t.string('image');
    t.int('maxPeople');
    t.field('user', { type: User });
    t.field('company', { type: Company });
    t.field('events', { type: list(Event) });
    t.field('services', { type: list(Service) });
  },
});

export const AddBoat = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addBoat', {
      type: AddBoatResponse,
      args: { args: nonNull(AddBoatArgs) },
      resolve: addBoatResolver,
    });
  },
});

const AddBoatArgs = inputObjectType({
  name: 'addBoatArgs',
  definition(t) {
    t.nonNull.string('companyId'),
      t.nonNull.string('name'),
      t.nonNull.string('image'),
      t.nonNull.int('maxPeople');
  },
});
const AddBoatResponse = objectType({
  name: 'addBoatResponse',
  definition(t) {
    t.string('message'), t.boolean('valido');
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

    return { valido: true, message: 'Barca inserita con con successo' };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};

export const RemoveBoat = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteBoat', {
      type: RemoveBoatResponse,
      args: { id: nonNull(stringArg()) },
      resolve: removeBoatResolver,
    });
  },
});
//TODO URGENTE: quando cancelli una barca cancellare tutti gli eventi correlati

const RemoveBoatResponse = objectType({
  name: 'removeBoatResponse',
  definition(t) {
    t.string('message'), t.boolean('valido');
  },
});

const removeBoatResolver: FieldResolver<'Mutation', 'AddBoat'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    await ctx.prisma.boat.delete({
      where: {
        id: args.id,
      },
    });

    return { valido: true, message: 'Barca eliminata con successo' };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};
