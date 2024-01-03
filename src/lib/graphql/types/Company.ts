import {
  FieldResolver,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Event } from './Events';
import { Personale } from './Personale';
import { Client } from './Client';
import { getErrorReturn } from '@/lib/utils';
import { Boat } from './Barche';

export const Company = objectType({
  name: 'Company',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('logo');
    t.list.field('employees', { type: Personale });
    t.list.field('clients', { type: Client });
    t.list.field('boats', { type: Boat });
    t.list.field('events', { type: Event });
  },
});

export const CreateCompany = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCompany', {
      type: CreateCompanyResponse,
      args: {
        name: nonNull(stringArg()),
        logo: stringArg(),
      },
      resolve: createCompanyResolver,
    });
  },
});

const CreateCompanyResponse = objectType({
  name: 'createCompanyResponse',
  definition(t) {
    t.string('message'), t.boolean('valido'), t.string('id');
  },
});

const createCompanyResolver: FieldResolver<
  'Mutation',
  'CreateCompany'
> = async (_parents, args, ctx) => {
  try {
    const res = await ctx.prisma.company.create({
      data: {
        ...args,
      },
    });
    return { valido: true, message: 'Azienda creata con successo', id: res.id };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};

export const GetCompany = extendType({
  type: 'Query',

  definition(t) {
    t.field('company', {
      type: Company,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        return ctx.prisma.company.findUnique({
          where: { id: args.id },
          include: { boats: true, employees: true },
        });
      },
    });
  },
});
