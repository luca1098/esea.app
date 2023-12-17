import {
  FieldResolver,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Boat } from './Barche';

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.string('id');
    t.string('serviceSlug');
    t.float('from');
    t.float('to');
    t.int('people');
    t.string('boatId');
    t.string('clientId');
    t.string('note');
    t.string('skipperId');
    t.field('boat', { type: Boat });
  },
});

export const GetEvents = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('events', {
      type: Event,
      resolve(_parents, _args, ctx) {
        return ctx.prisma.event.findMany();
      },
    });
  },
});
export const GetBoatEvents = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('boatEvents', {
      type: Event,
      args: {
        boatId: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        return ctx.prisma.event.findMany({
          where: { boatId: args.boatId },
        });
      },
    });
  },
});

export const CreateEvents = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createEvents', {
      type: CreateEventsResponse,
      args: { args: nonNull(CreateEventsArgs) },
      resolve: createEventResolver,
    });
  },
});

const CreateEventsResponse = objectType({
  name: 'createEventsResponse',
  definition(t) {
    t.string('message'), t.boolean('valido');
  },
});

const CreateEventsArgs = inputObjectType({
  name: 'createEventsArgs',
  definition(t) {
    t.nonNull.string('serviceSlug'),
      t.nonNull.float('from'),
      t.float('to'),
      t.int('people');
    t.nonNull.string('boatId');
    t.string('clientId');
    t.string('skipperId');
    t.string('note');
  },
});

const createEventResolver: FieldResolver<'Mutation', 'CreateEvents'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    await ctx.prisma.event.create({
      data: {
        ...args.args,
      },
    });

    return { valido: true, message: 'Evento aggiunto con con successo' };
  } catch (e: any) {
    return {
      valido: false,
      message: e.message,
    };
  }
};
