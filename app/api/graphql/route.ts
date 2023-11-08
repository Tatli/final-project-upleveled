import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from '../../../database/categories';
import { createRole, getRoles } from '../../../database/roles';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUserByUsername,
  getUsers,
  isUserAdminBySessionToken,
  updateUserById,
} from '../../../database/users';
import {
  CreateCategoryArgs,
  CreateRoleArgs,
  CreateUserArgs,
  User,
} from '../../../util/types';

export type GraphQlResponseBody =
  | {
      user: User;
    }
  | Error;

type FakeAdminUserContext = {
  isAdmin: boolean;
};

// type UserInput = {
//   firstName: string;
//   lastName: string;
//   birthDate: Date;
//   address: string;
//   postalCode: string;
//   city: string;
//   country: string;
//   email: string;
//   passwordHash: string;
//   phone: string;
//   image: string;
//   roleId
// };

const typeDefs = gql`
  scalar Date

  type Role {
    id: ID!
    name: String
  }
  type Category {
    id: ID!
    name: String!
    image: String!
  }
  type Status {
    id: ID!
    name: String
  }
  type User {
    id: ID!
    username: String
    email: String
    passwordHash: String
    firstName: String
    lastName: String
    birthDate: Date
    address: String
    postalCode: String
    city: String
    country: String
    phone: String
    image: String
    roleId: Int
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
    roles: [Role]
    categories: [Category!]!
    category(id: ID!): Category

    loggedInUserByUsername(username: String!): User
  }

  type Mutation {
    # Users
    ## Create
    createUser(username: String!, email: String!, passwordHash: String!): User!
    ## Delete
    deleteUserById(id: ID!): User!
    ## Update
    updateUserById(
      id: ID!
      username: String
      firstName: String
      lastName: String
      birthDate: Date
      address: String
      postalCode: String
      city: String
      country: String
      email: String
      passwordHash: String
      phone: String
    ): User!

    # Roles
    ## Create
    createRole(name: String!): Role!

    # Categories
    ## Create
    createCategory(name: String!, image: String): Category!
    ## Update
    updateCategoryById(id: ID!, name: String!, image: String!): Category
    ## Delete
    deleteCategoryById(id: ID!): Category!

    # Authentication
    ## Login
    login(username: String!, passwordHash: String!): User
    ## Register
    register(username: String!, passwordHash: String!, email: String!): User
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

    roles: async () => {
      return await getRoles();
    },

    categories: async () => {
      return await getCategories();
    },

    category: async (parent: null, args: { id: string }) => {
      return await getCategoryById(parseInt(args.id));
    },

    loggedInUserByUsername: async (
      parent: null,
      args: { username: string },
    ) => {
      return await getUserByUsername(args.username);
    },
  },

  Mutation: {
    createUser: async (parent: null, args: CreateUserArgs) => {
      // All of these checks are "end point based authentications"
      if (typeof args.username !== 'string' || !args.username) {
        throw new GraphQLError('Required field is missing');
      } else if (typeof args.email !== 'string' || !args.email) {
        throw new GraphQLError('Required field email is missing');
      } else if (typeof args.passwordHash !== 'string' || !args.passwordHash) {
        throw new GraphQLError('Required field passwordHash is missing');
      }
      return await createUser(args.username, args.email, args.passwordHash);
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

    updateUserById: async (
      parent: null,
      args: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        birthDate: Date;
        address: string;
        postalCode: string;
        city: string;
        country: string;
        email: string;
        passwordHash: string;
        phone: string;
      },
    ) => {
      return await updateUserById(
        parseInt(args.id),
        args.username,
        args.firstName,
        args.lastName,
        args.birthDate,
        args.address,
        args.postalCode,
        args.city,
        args.country,
        args.email,
        args.passwordHash,
        args.phone,
      );
    },

    createRole: async (parent: null, args: CreateRoleArgs) => {
      if (typeof args.name !== 'string' || !args.name) {
        throw new GraphQLError('Required field "name" is missing');
      }
      return await createRole(args.name);
    },

    createCategory: async (parent: null, args: CreateCategoryArgs) => {
      if (typeof args.name !== 'string' || !args.name) {
        throw new GraphQLError('Required field "name" is missing');
      } else if (typeof args.image !== 'string' || !args.image) {
        throw new GraphQLError('Required field "image" is missing');
      }
      return await createCategory(args.name, args.image);
    },

    updateCategoryById: async (
      parent: null,
      args: { id: string; name: string; image: string },
      // context: FakeAdminUserContext,
    ) => {
      // if (!context.isAdmin) {
      //   throw new GraphQLError('Unauthorized operation');
      // }
      return await updateCategoryById(parseInt(args.id), args.name, args.image);
    },

    deleteCategoryById: async (
      parent: null,
      args: { id: string },
      context: FakeAdminUserContext,
    ) => {
      if (!context.isAdmin) {
        throw new GraphQLError('Unauthorized operation');
      }
      return await deleteCategoryById(parseInt(args.id));
    },

    login: async (
      parent: null,
      args: { username: string; passwordHash: string },
    ) => {
      console.log('Inside login mutation.');

      // Check if both credentials are filled in
      if (typeof args.username !== 'string' || !args.username) {
        throw new GraphQLError('Required field username missing');
      } else if (typeof args.passwordHash !== 'string' || !args.passwordHash) {
        throw new GraphQLError('Required field passwordHash missing');
      }

      // Validate that credentials exist in users table
      // Get user by username from users table
      const user = await getUserByUsername(args.username);
      console.log('getUserByUsername in login mutation:');
      console.log('Single user from database: ', user);

      console.log('args.username: ', args.username);
      console.log('user.username: ', user?.username);
      console.log('args.password: ', args.passwordHash);
      // Although it says that the object user doesn't contain "passwordHash" it does return the password
      console.log('user.password: ', user?.passwordHash);

      if (
        args.username !== user?.username ||
        args.passwordHash !== user.passwordHash
      ) {
        throw new GraphQLError('Invalid username or password');
      }

      console.log('setting cookie fakeSession with username: ', args.username);
      // Set Session cookie
      cookies().set('fakeSession', args.username, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return await getUserByUsername(args.username);
    },

    register: async (
      parent: null,
      args: { username: string; passwordHash: string; email: string },
    ) => {
      // Indicate "location"
      console.log('Inside register mutation');

      // Check if credentials are filled in
      if (typeof args.username !== 'string' || !args.username) {
        throw new GraphQLError('Required field username missing');
      } else if (typeof args.passwordHash !== 'string' || !args.passwordHash) {
        throw new GraphQLError('Required field passwordHash missing');
      } else if (typeof args.email !== 'string' || !args.email) {
        throw new GraphQLError('Required field email missing');
      }

      // Display argument values
      console.log('username in register mutation: ', args.username);
      console.log('passwordHash in register mutation: ', args.passwordHash);
      console.log('email in register mutation: ', args.email);

      const user = await getUserByUsername(args.username);

      // Check if user with given username already exists
      if (args.username !== user?.username) {
        // Create user
        await createUser(args.username, args.email, args.passwordHash);
        // Set session cookie
        console.log(
          'Setting cookie fakeSession with username: ',
          args.username,
        );
        cookies().set('fakeSession', args.username, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      } else {
        throw new GraphQLError('User already exists');
      }

      return await getUserByUsername(args.username);
    },

    //     updateUserById: async (parent: null, args: UserInput & { id: string }) => {
    //       if (
    //         typeof args.email !== 'string' ||
    //         typeof args.passwordHash !== 'string' ||
    //         (args.email && typeof args.email !== 'string') ||
    //         !args.email ||
    //         !args.passwordHash
    //       ) {
    //         throw new GraphQLError('Required field missing');
    //       }
    //       return await updateUserById(parseInt(args.id), args.email, args.passwordHash);
    //     },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req) => {
    // FIXME: Implement secure authentication
    const fakeSessionToken = req.cookies.get('fakeSession');

    const isAdmin = await isUserAdminBySessionToken(fakeSessionToken?.value);

    return { req, isAdmin };
  },
});

export async function GET(
  req: NextRequest,
): Promise<NextResponse<GraphQlResponseBody>> {
  return (await handler(req)) as NextResponse<GraphQlResponseBody>;
}
export async function POST(
  req: NextRequest,
): Promise<NextResponse<GraphQlResponseBody>> {
  return (await handler(req)) as NextResponse<GraphQlResponseBody>;
}

// This setup is incomplete without type annotation
// export async function GET(req: NextRequest) {
//   return await handler(req);
// }

// export async function POST(req: NextRequest) {
//   return await handler(req);
// }
