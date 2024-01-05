import {
  FieldResolver,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Event } from './Events';
import { Service } from './Services';
import { getErrorReturn } from '@/lib/utils';
import { Company } from './Company';
import { Slot } from './Slot';

export const Boat = objectType({
  name: 'Boat',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('companyId');
    t.string('name');
    t.string('image');
    t.int('maxPeople');
    t.field('company', { type: Company });
    t.field('events', { type: list(Event) });
    t.list.field('services', { type: Service });
    t.list.field('unaviableSlots', { type: Slot });
  },
});

export const AddBoat = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addBoat', {
      type: AddBoatResponse,
      args: {
        companyId: nonNull(stringArg()),
        name: stringArg(),
        image: stringArg(),
        maxPeople: intArg(),
        services: list(nonNull(ServiceArgs)),
        unaviableSlots: list(nonNull(SlotsArgs)),
      },
      resolve: addBoatResolver,
    });
  },
});

export const ServiceArgs = inputObjectType({
  name: 'ServiceArgs',
  definition(t) {
    t.string('label');
    t.field('durations', { type: list(DurationArgs) });
  },
});

export const DurationArgs = inputObjectType({
  name: 'DurationArgs',
  definition(t) {
    t.string('label');
    t.float('price');
  },
});

export const SlotsArgs = inputObjectType({
  name: 'SlotsArgs',
  definition(t) {
    t.float('from');
    t.float('to');
  },
});

const AddBoatResponse = objectType({
  name: 'addBoatResponse',
  definition(t) {
    t.string('message'), t.boolean('valido');
  },
});

type ServicesArgsType = {
  label?: string;
  durations?: {
    label: string;
    price: number;
  }[];
};

const addBoatResolver: FieldResolver<'Mutation', 'AddBoat'> = async (
  _parents,
  args,
  ctx,
) => {
  const servicesWithCreateMethod = args.services.map(
    (service: ServicesArgsType) => ({
      ...service,
      durations: {
        create: service?.durations,
      },
    }),
  );
  try {
    await ctx.prisma.boat.create({
      data: {
        ...args,
        services: {
          create: servicesWithCreateMethod,
        },
        unaviableSlots: {
          create: args.unaviableSlots,
        },
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
