import {
  FieldResolver,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
} from 'nexus';
import { Event } from './Events';
import { getEseaCommonResponse } from './utils';
import { getErrorReturn } from '@/lib/utils';

export const Client = objectType({
  name: 'Client',
  definition(t) {
    t.nonNull.string('id');
    t.string('companyId');
    t.string('name');
    t.string('email');
    t.string('phone');
    t.field('events', { type: Event });
  },
});

export const AddClient = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addClient', {
      type: objectType({
        name: 'addClienResponse',
        definition(t) {
          t.string('message'), t.boolean('valido'), t.string('id');
        },
      }),
      args: { args: nonNull(AddClientArgs) },
      resolve: addClientResolver,
    });
  },
});

const AddClientArgs = inputObjectType({
  name: 'addClientArgs',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('companyId');
    t.string('email');
    t.string('phone');
  },
});

const addClientResolver: FieldResolver<'Mutation', 'AddClient'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    const res = await ctx.prisma.client.create({
      data: {
        ...args.args,
      },
    });
    return {
      valido: true,
      message: 'Cliente aggiunto con con successo',
      id: res.id,
    };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};
