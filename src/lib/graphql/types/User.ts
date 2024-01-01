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
import { Company } from './Company';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('email', { description: 'Email of the user' });
    t.string('name');
    t.string('phone');
    t.string('codFisc');
    t.string('dataNascita');
    t.field('role', { type: Role });
    t.string('emailVerified', { description: 'In timestamp' });
    t.string('image');
    t.string('password');
    t.list.field('boats', { type: Boat });
    t.field('company', { type: Company });
    t.string('companyId');
    t.string('createdAt');
  },
});

export const Role = enumType({
  name: 'Role',
  members: {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    COLLABORATOR: 'COLLABORATOR',
  },
});

export const GetAllUsers = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: User,
      resolve(_parents, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});

export const GetUsers = extendType({
  type: 'Query',

  definition(t) {
    t.field('user', {
      type: User,
      args: {
        email: nonNull(stringArg()),
      },
      resolve(_parents, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { email: args.email },
        });
      },
    });
  },
});

export const CreateUsers = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('user', {
      type: CreateUserResponse,
      args: { credentials: nonNull(CreateUserArgs) },
      resolve: createUserResolver,
    });
  },
});

const CreateUserArgs = inputObjectType({
  name: 'createUserArgs',
  definition(t) {
    t.nonNull.string('email'),
      t.nonNull.string('name'),
      t.nonNull.string('password');
  },
});

const CreateUserResponse = objectType({
  name: 'createUserResponse',
  definition(t) {
    t.string('message'), t.boolean('valido');
  },
});

const createUserResolver: FieldResolver<'Mutation', 'CreateUsers'> = async (
  _parents,
  args,
  ctx,
) => {
  try {
    await ctx.prisma.user.create({
      data: {
        ...args.credentials,
      },
    });
    return { valido: true, message: 'Utente registrato con successo' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const userAlreadyExist = e?.code === 'P2002';
    if (userAlreadyExist) {
      return {
        valido: false,
        message: userAlreadyExist
          ? 'Utente già registrato'
          : 'Qualcosa è andato storto',
      };
    }
    const error = getErrorReturn(e);
    return error;
  }
};

export const EditUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editUser', {
      type: EditUserResponse,
      args: { args: nonNull(EditUserArgs) },
      resolve: editUserResolver,
    });
  },
});

const EditUserArgs = inputObjectType({
  name: 'editUserArgs',
  definition(t) {
    t.nonNull.string('email'),
      t.string('codFisc'),
      t.string('dataNascita'),
      t.string('phone');
    t.string('companyId');
    t.string('image');
  },
});

const EditUserResponse = objectType({
  name: 'editUserResponse',
  definition(t) {
    t.string('message'), t.boolean('valido');
  },
});

const editUserResolver: FieldResolver<'Mutation', 'EditUser'> = async (
  _parents,
  args,
  ctx,
) => {
  const { email, ...rest } = args.args || {};
  try {
    await ctx.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        ...rest,
      },
    });
    return { valido: true, message: 'Informazioni aggiunte con successo' };
  } catch (e: unknown) {
    const error = getErrorReturn(e);
    return error;
  }
};
