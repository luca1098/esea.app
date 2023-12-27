import {
  FieldResolver,
  enumType,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Event } from './Events';
import { getEseaCommonResponse } from './utils';
import { getErrorReturn } from '@/lib/utils';

export const Personale = objectType({
  name: 'Personale',
  definition(t) {
    t.nonNull.string('id');
    t.field('role', { type: PeronaleRole });
    t.string('name');
    t.string('companyId');
    t.string('image');
    t.float('salary');
    t.float('birtday');
    t.field('salaryType', { type: SalaryType });
    t.field('events', { type: Event });
  },
});

export const PeronaleRole = enumType({
  name: 'PeronaleRole',
  members: {
    SKIPPER: 'SKIPPER',
    ASSISTENT: 'ASSISTENT',
    COLLABORATOR: 'COLLABORATOR',
    COFOUNDER: 'COFOUNDER',
    FORNITORE: 'FORNITORE',
    ALTRO: 'ALTRO',
  },
});

export const SalaryType = enumType({
  name: 'SalaryType',
  members: {
    HOUR: 'HOUR',
    DAY: 'DAY',
    MONTH: 'MONTH',
  },
});

export const GetPersonaleByCompany = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('companyPersonale', {
      type: Personale,
      args: {
        companyId: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        try {
          const data = ctx.prisma.personale.findMany({
            where: { companyId: args.companyId },
          });
          // use schema
          return data;
        } catch (e: unknown) {
          return getErrorReturn(e);
        }
      },
    });
  },
});

export const AddPersonale = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addPersonale', {
      type: getEseaCommonResponse('addPersonaleResponse'),
      args: { args: nonNull(addPersonaleArgs) },
      resolve: addPersonaleResolver,
    });
  },
});

const addPersonaleArgs = inputObjectType({
  name: 'addPersonaleArgs',
  definition(t) {
    t.nonNull.field('role', { type: PeronaleRole }),
      t.nonNull.string('name'),
      t.string('image'),
      t.float('salary');
    t.float('birthday');
    t.field('salaryType', { type: SalaryType });
    t.nonNull.string('companyId');
  },
});

const addPersonaleResolver: FieldResolver<'Mutation', 'AddPersonale'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    await ctx.prisma.personale.create({
      data: {
        ...args.args,
      },
    });

    return { valido: true, message: 'Personale inserito con con successo' };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};

export const deletePersonale = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deletePersonale', {
      type: getEseaCommonResponse('deletePersonaleResponse'),
      args: { id: nonNull(stringArg()) },
      resolve: deletePersonaleResolver,
    });
  },
});

const deletePersonaleResolver: FieldResolver<
  'Mutation',
  'AddPersonale'
> = async (_parents, args, ctx) => {
  try {
    await ctx.prisma.personale.delete({
      where: {
        id: args.id,
      },
    });

    return { valido: true, message: 'Personale eliminato con con successo' };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};
