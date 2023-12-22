import {
  FieldResolver,
  enumType,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Boat } from './Barche';
import { getErrorReturn } from '@/lib/utils';
import { Personale } from './Personale';
import { Canale } from './Canale';
import { Client } from './Client';
import { Service } from './Services';
import { Company } from './Company';
import { getEseaCommonResponse } from './utils';

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.string('id');
    t.float('from');
    t.float('to');
    t.int('people');
    t.string('note');
    t.string('serviceId');
    t.string('boatId');
    t.string('clientId');
    t.string('skipperId');
    t.string('canaleId');
    t.string('companyId');
    t.field('canale', { type: Canale });
    t.field('company', { type: Company });
    t.field('skipper', { type: Personale });
    t.field('boat', { type: Boat });
    t.field('client', { type: Client });
    t.field('service', { type: Service });
    t.field('status', { type: EventStatusType });
    t.float('amount');
    t.string('statusDetails');
    t.string('createdAt');
  },
});

export const EventStatusType = enumType({
  name: 'EventStatusType',
  members: {
    PAYED: 'PAYED',
    ADVANCE_PAYMENT: 'ADVANCE_PAYMENT',
    TO_PAY: 'TO_PAY',
    NONE: 'NONE',
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

export const GetCompanyEvents = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('companyEvents', {
      type: Event,
      args: {
        companyId: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        try {
          return ctx.prisma.event.findMany({
            where: { companyId: args.companyId },
            include: {
              boat: true,
              canale: true,
              skipper: true,
              client: true,
              service: true,
            },
            orderBy: [{ createdAt: 'desc' }],
          });
        } catch (e: unknown) {
          const error = getErrorReturn(e);
          return error;
        }
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
        try {
          return ctx.prisma.event.findMany({
            where: { boatId: args.boatId },
            include: { service: true, skipper: true, client: true },
          });
        } catch (e: unknown) {
          const error = getErrorReturn(e);
          return error;
        }
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
    t.nonNull.string('serviceId'),
      t.nonNull.float('from'),
      t.float('to'),
      t.int('people');
    t.nonNull.string('boatId');
    t.string('clientId');
    t.string('skipperId');
    t.string('note');
    t.string('canaleId');
    t.string('companyId');
    t.field('status', { type: EventStatusType });
    t.float('amount');
    t.string('statusDetails');
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
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};

export const DeleteEvents = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteEvents', {
      type: getEseaCommonResponse('deleteEvent'),
      args: { id: nonNull(stringArg()) },
      resolve: deleteEventResolver,
    });
  },
});

const deleteEventResolver: FieldResolver<'Mutation', 'DeleteEvents'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    await ctx.prisma.event.delete({
      where: {
        id: args.id,
      },
    });

    return { valido: true, message: 'Evento eliminato con successo' };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};
