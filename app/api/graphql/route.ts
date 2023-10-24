import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createRole } from '../../../database/roles';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
} from '../../../database/users';
import { User } from '../../../migrations/00003-createTableUsers';
import { CreateRoleArgs, CreateUserArgs } from '../../../util/types';

// export type GraphQlResponseBody =
//   | {
//       user: User;
//     }
//   | Error;

// type FakeAdminUserContext = {
//   isAdmin: boolean;
// };

// type UserInput = {
//   firstName: string;
//   lastName: string;
//   birth_date: Date;
//   address: string;
//   postalCode: string;
//   city: string;
//   country: string;
//   email: string;
//   password: string;
//   phone: string;
//   image: string;
//   // roleId
// };

const typeDefs = gql`
  scalar Date

  type Role {
    id: ID!
    name: String
  }
  type Categories {
    id: ID!
    name: [String]
  }
  type Status {
    id: ID!
    name: String
  }
  type User {
    id: ID!
    username: String!
    # firstName: String
    # lastName: String
    # birth_date: Date
    # address: String
    # postalCode: String
    # city: String
    # country: String
    email: String!
    password: String!
    # phone: String
    # image: String
    roleId: Int!
  }

  type Listing {
    id: ID!
    title: String!
    price: Int!
    image: String
    description: String!
    views: Int
    createdAt: Date
    updatedAt: Date
    userId: Int
    statusId: Int
    categoriesId: Int
  }

  type Query {
    users: [User]
    user(id: ID!): User
    # loggedInUserByFirstName(firstName: String!): User
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      roleId: Int!
    ): User!

    deleteUserById(id: ID!): User!

    createRole(name: String!): Role!
    # updateUserById(
    #   id: ID!
    #   firstName: String!
    #   type: String!
    #   accessory: String
    # ): User

    # login(username: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await getUsers();
    },

    user: async (parent: null, args: { id: string }) => {
      return await getUserById(parseInt(args.id));
    },

    // loggedInUserByFirstName: async (
    //   parent: null,
    //   args: { firstName: string },
    // ) => {
    //   return await getUserByFirstName(args.firstName);
    // },
  },

  Mutation: {
    createUser: async (parent: null, args: CreateUserArgs) => {
      if (
        typeof args.username !== 'string' ||
        typeof args.email !== 'string' ||
        typeof args.password !== 'string' ||
        typeof args.roleId !== 'number' ||
        // (args.username && typeof args.username !== 'string') ||
        // (args.email && typeof args.email !== 'string') ||
        // (args.password && typeof args.password !== 'string') ||
        // (args.roleId && typeof args.roleId !== 'string') ||
        !args.username ||
        !args.email ||
        !args.password ||
        !args.roleId
      ) {
        throw new GraphQLError('Required field is missing');
      }
      return await createUser(
        args.username,
        args.email,
        args.password,
        args.roleId,
      );
    },

    deleteUserById: async (
      parent: null,
      args: { id: string },
      // context: FakeAdminUserContext,
    ) => {
      // if (!context.isAdmin) {
      //   throw new GraphQLError('Unauthorized operation');
      // }
      return await deleteUserById(parseInt(args.id));
    },

    createRole: async (parent: null, args: CreateRoleArgs) => {
      if (typeof args.name !== 'string' || !args.name) {
        throw new GraphQLError('Required field is missing');
      }
      return await createRole(args.name);
    },

    //     updateUserById: async (parent: null, args: UserInput & { id: string }) => {
    //       if (
    //         typeof args.email !== 'string' ||
    //         typeof args.password !== 'string' ||
    //         (args.email && typeof args.email !== 'string') ||
    //         !args.email ||
    //         !args.password
    //       ) {
    //         throw new GraphQLError('Required field missing');
    //       }
    //       return await updateUserById(parseInt(args.id), args.email, args.password);
    //     },

    //     login: async (
    //       parent: null,
    //       args: { username: string; password: string },
    //     ) => {
    //       //  FIXME: Implement secure authentication
    //       if (
    //         typeof args.username !== 'string' ||
    //         typeof args.password !== 'string' ||
    //         !args.username ||
    //         !args.password
    //       ) {
    //         throw new GraphQLError('Required field missing');
    //       }

    //       if (args.username !== 'lucia' || args.password !== 'asdf') {
    //         throw new GraphQLError('Invalid username or password');
    //       }

    //       cookies().set('fakeSession', args.username, {
    //         httpOnly: true,
    //         sameSite: 'lax',
    //         path: '/',
    //         maxAge: 60 * 60 * 24 * 30, // 30 days
    //       });

    //       return await getUserByFirstName(args.username);
    //     },
    //   },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler(apolloServer);

export async function GET(req: NextRequest) {
  return await handler(req);
}
export async function POST(req: NextRequest) {
  return await handler(req);
}
// const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
//   context: async (req) => {
//     // FIXME: Implement secure authentication and Authorization
//     const fakeSessionToken = req.cookies.get('fakeSession');

//     const isAdmin = await isUserAdminBySessionToken(fakeSessionToken?.value);

//     return {
//       req,
//       isAdmin,
//     };
//   },
// });

// This setup is incomplete without type annotation
// export async function GET(req: NextRequest) {
//   return await handler(req);
// }

// export async function POST(req: NextRequest) {
//   return await handler(req);
// }

// export async function GET(
//   req: NextRequest,
// ): Promise<NextResponse<GraphQlResponseBody>> {
//   return (await handler(req)) as NextResponse<GraphQlResponseBody>;
// }

// export async function POST(
//   req: NextRequest,
// ): Promise<NextResponse<GraphQlResponseBody>> {
//   return (await handler(req)) as NextResponse<GraphQlResponseBody>;
// }
