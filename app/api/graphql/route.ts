import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { set } from 'zod';
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from '../../../database/categories';
import {
  createListing,
  deleteListingById,
  getActiveListingsByCategoryIdSortedByCreatedAt,
  getListings,
  getListingsSortedByCreatedAt,
  getUserListingByListingIdJoined,
  getUserListingsByUserIdJoined,
  updateListingById,
  updateListingImageByListingId,
  updateListingTitleById,
} from '../../../database/listings';
import { createRole, getRoleById, getRoles } from '../../../database/roles';
import { getStatuses } from '../../../database/status';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUserByUsername,
  getUsers,
  isUserAdminBySessionToken,
  updateUserById,
  updateUserByIdWithoutPassword,
  updateUserImageByUserId,
} from '../../../database/users';
import { createSessionToken } from '../../../util/auth';
import {
  CreateCategoryArgs,
  CreateRoleArgs,
  CreateUserArgs,
  FakeAdminUserContext,
  GraphQlResponseBody,
  Listing,
  LoginResponse,
} from '../../../util/types';

const typeDefs = gql`
  scalar Date

  type Category {
    id: ID!
    name: String!
    image: String!
  }
  type Status {
    id: ID!
    name: String
  }

  type LoginResponse {
    user: User!
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
    registrationDate: Date
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
    categoryId: Int
    categoryName: String
    username: String
    statusName: String
    userImage: String
    userAddress: String
    userPostalCode: String
    userCity: String
    userCountry: String
    userPhone: String
    userRegistrationDate: Date
  }
  type Role {
    id: ID!
    name: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
    loggedInUserByUsername(username: String!): User

    role(id: ID!): Role
    roles: [Role]

    category(id: ID!): Category
    categories: [Category!]!

    getStatuses: [Status]

    listings: [Listing!]!
    userListingsByUserIdJoined(id: ID!): [Listing!]!
    userListingByListingIdJoined(id: ID!): [Listing!]!
    getActiveListingsByCategoryIdSortedByCreatedAt(id: ID!): [Listing!]!
    getListingsSortedByCreatedAt: [Listing!]!
  }

  type Mutation {
    # Users

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
      password: String
      phone: String
      roleId: Int
    ): User!

    updateUserImageByUserId(id: ID!, image: String): User!

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
    login(username: String!, password: String!): LoginResponse!
    ## Register
    register(username: String!, password: String!, email: String!): User

    # Listing
    ## Create
    createListing(
      title: String!
      price: Int!
      description: String!
      image: String
      userId: Int
      categoryId: Int
    ): Listing!

    ## Update
    updateListingTitleById(id: ID!, title: String!): Listing
    updateListingImageByListingId(id: ID!, image: String!): Listing
    updateListingById(
      id: ID!
      title: String
      price: Int
      description: String
      image: String
      updatedAt: Date
      categoryId: Int
      statusId: Int
    ): Listing!

    ## Delete
    deleteListingById(id: ID!): Listing
  }
`;

const resolvers = {
  Query: {
    user: async (parent: null, args: { id: string }) => {
      return await getUserById(parseInt(args.id));
    },

    users: async () => {
      return await getUsers();
    },

    role: async (parent: null, args: { id: string }) => {
      return await getRoleById(parseInt(args.id));
    },

    roles: async () => {
      return await getRoles();
    },

    category: async (parent: null, args: { id: string }) => {
      return await getCategoryById(parseInt(args.id));
    },

    categories: async () => {
      return await getCategories();
    },

    listings: async () => {
      return await getListings();
    },

    getListingsSortedByCreatedAt: async () => {
      return await getListingsSortedByCreatedAt();
    },

    getStatuses: async () => {
      return await getStatuses();
    },

    userListingsByUserIdJoined: async (parent: null, args: { id: string }) => {
      return await getUserListingsByUserIdJoined(parseInt(args.id));
    },

    userListingByListingIdJoined: async (
      parent: null,
      args: { id: string },
    ) => {
      return await getUserListingByListingIdJoined(parseInt(args.id));
    },

    getActiveListingsByCategoryIdSortedByCreatedAt: async (
      parent: null,
      args: { id: string },
    ) => {
      return await getActiveListingsByCategoryIdSortedByCreatedAt(
        parseInt(args.id),
      );
    },

    loggedInUserByUsername: async (
      parent: null,
      args: { username: string },
    ) => {
      return await getUserByUsername(args.username);
    },
  },

  Mutation: {
    // User

    // // Delete User By ID
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

    // // Update User By ID
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
        password: string;
        phone: string;
        roleId: number;
      },
    ) => {
      if (args.password === '') {
        return await updateUserByIdWithoutPassword(
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
          args.phone,
          args.roleId,
        );
      }
      const passwordHash: string = await bcrypt.hash(args.password, 10);
      console.log(
        'passwordHash inside updateUserById mutation: ',
        passwordHash,
      );
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
        passwordHash,
        args.phone,
        args.roleId,
      );
    },

    // // Update User Image By UserId
    updateUserImageByUserId: async (
      parent: null,
      args: {
        id: string;
        image: string;
      },
    ) => {
      return await updateUserImageByUserId(parseInt(args.id), args.image);
    },
    // Listing

    // // Create Listing
    createListing: async (parent: null, args: Listing) => {
      // All of these checks are "end point based authentications"
      if (typeof args.title !== 'string' || !args.title) {
        throw new GraphQLError('Required field title is missing');
      } else if (args.price === 0) {
        throw new GraphQLError('Price can not be 0');
      } else if (typeof args.price !== 'number' || !args.price) {
        throw new GraphQLError('Required field price is missing');
      } else if (typeof args.description !== 'string' || !args.description) {
        throw new GraphQLError('Required field description is missing');
      } else if (typeof args.categoryId !== 'number' || !args.categoryId) {
        throw new GraphQLError('Required field category is missing');
      }
      return await createListing(
        args.title,
        args.price,
        args.description,
        args.image,
        args.userId,
        args.categoryId,
      );
    },

    // // Update Listing Title By ID
    updateListingTitleById: async (
      parent: null,
      args: { id: string; title: string },
      // context: FakeAdminUserContext,
    ) => {
      // if (!context.isAdmin) {
      //   throw new GraphQLError('Unauthorized operation');
      // }
      return await updateListingTitleById(parseInt(args.id), args.title);
    },

    // // Update Listing Image By ID
    updateListingImageByListingId: async (
      parent: null,
      args: { id: string; image: string },
      // context: FakeAdminUserContext,
    ) => {
      // if (!context.isAdmin) {
      //   throw new GraphQLError('Unauthorized operation');
      // }
      return await updateListingImageByListingId(parseInt(args.id), args.image);
    },

    // // Update Listing By ID
    updateListingById: async (
      parent: null,
      args: {
        id: string;
        title: string;
        price: number;
        description: string;
        image: string;
        updatedAt: Date;
        categoryId: number;
        statusId: number;
      },
    ) => {
      if (typeof args.title !== 'string' || !args.title || args.title === '') {
        throw new GraphQLError('Required field title is missing');
      } else if (typeof args.price !== 'number' || !args.price) {
        throw new GraphQLError('Required field price is missing');
      } else if (args.price === 0) {
        throw new GraphQLError('Price can not be 0');
      } else if (
        typeof args.description !== 'string' ||
        !args.description ||
        args.description === ''
      ) {
        throw new GraphQLError('Required field description is missing');
      }
      return await updateListingById(
        parseInt(args.id),
        args.title,
        args.price,
        args.description,
        args.image,
        args.updatedAt,
        args.categoryId,
        args.statusId,
      );
    },

    // // Delete Listing By ID
    deleteListingById: async (
      parent: null,
      args: { id: string },
      // context: FakeAdminUserContext,
    ) => {
      // if (!context.isAdmin) {
      //   throw new GraphQLError('Unauthorized operation');
      // }
      return await deleteListingById(parseInt(args.id), args.title);
    },

    // Role

    // // Create Role
    createRole: async (parent: null, args: CreateRoleArgs) => {
      if (typeof args.name !== 'string' || !args.name) {
        throw new GraphQLError('Required field "name" is missing');
      }
      return await createRole(args.name);
    },

    // Category

    // // Create Category
    createCategory: async (parent: null, args: CreateCategoryArgs) => {
      if (typeof args.name !== 'string' || !args.name) {
        throw new GraphQLError('Required field "name" is missing');
      } else if (typeof args.image !== 'string' || !args.image) {
        throw new GraphQLError('Required field "image" is missing');
      }
      return await createCategory(args.name, args.image);
    },

    // // Update Category By ID
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

    // // Delete Category By ID
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

    // Authentication

    // // Login

    login: async (
      parent: null,
      args: { username: string; password: string },
    ) => {
      // Check if both credentials are filled in
      if (typeof args.username !== 'string' || !args.username) {
        throw new GraphQLError('Required field username missing');
      } else if (typeof args.password !== 'string' || !args.password) {
        throw new GraphQLError('Required field password missing');
      }

      const user = await getUserByUsername(args.username);

      if (!user) {
        throw new GraphQLError('No user found');
      }
      console.log('args.password: ', args.password);
      console.log('user.passwordHash: ', user.passwordHash);
      const auth: boolean = await bcrypt.compare(
        args.password,
        user.passwordHash,
      );

      if (!auth) {
        throw new GraphQLError('Invalid username or password');
      }

      const sessionToken = await createSessionToken(user);

      // Set Session cookie
      cookies().set('sessionToken', sessionToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return { user } as LoginResponse;
    },

    // // Register

    register: async (
      parent: null,
      args: {
        username: string;
        password: string;
        email: string;
      },
    ) => {
      // Indicate "location"
      console.log('Inside register mutation');
      console.log(
        'typeof args.email in register mutation: ',
        typeof args.email,
      );
      const mailRegex = new RegExp(
        '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$',
        'i',
      );
      // Check if credentials are filled in
      if (typeof args.username !== 'string' || !args.username) {
        throw new GraphQLError('Required field username missing');
      } else if (typeof args.password !== 'string' || !args.password) {
        throw new GraphQLError('Required field password missing');
      } else if (!args.email.match(mailRegex)) {
        throw new GraphQLError('Email has to be in format test@gmail.com');
      } else if (typeof args.email !== 'string' || !args.email) {
        throw new GraphQLError('Required field email missing');
      }

      // Display argument values
      console.log('username in register mutation: ', args.username);
      console.log('password in register mutation: ', args.password);
      console.log('email in register mutation: ', args.email);

      const user = await getUserByUsername(args.username);

      // Check if user with given username already exists
      if (args.username === user?.username) {
        throw new GraphQLError('User already exists');
      }

      const passwordHash: string = await bcrypt.hash(args.password, 10);
      console.log('passwordHash inside register mutation: ', passwordHash);
      // Create user
      return await createUser(args.username, args.email, passwordHash);
    },
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
    const sessionToken = req.cookies.get('sessionToken');

    const isAdmin = await isUserAdminBySessionToken(sessionToken?.value);

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
