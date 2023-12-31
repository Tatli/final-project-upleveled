export type CreateUserArgs = {
  username: string;
  email: string;
  passwordHash: string;
  roleId: number;
};
export type UserJwtPayload = {
  id: string;
  username: string;
  email: string;
};
export type CreateRoleArgs = {
  name: string;
};

export type CreateCategoryArgs = {
  name: string;
  image: string;
};

export type CategoryId = {
  id: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};
export type LoginResponse = {
  token: string;
  user: User;
};

export type User = {
  id: number;
  username: string | null;
  passwordHash: string;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date | null;
  address: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  roleId: number | null;
};

export type UserSuspenseQuery = {
  user: {
    id: number;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    birthDate: Date | null;
    address: string | null;
    postalCode: string | null;
    city: string | null;
    country: string | null;
    email: string | null;
    passwordHash: string;
    phone: string | null;
    image: string | null;
    roleId: number | null;
  };
};

export type Listing = {
  id: number;
  title: string | null;
  price: number | null;
  image: string | null;
  description: string | null;
  views: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: number | null;
  statusId: number | null;
  categoryId: number | null;
  categoryName: number | null;
  username: number | null;
  statusName: number | null;
  userImage: string;
  userAddress: string | null;
  userPostalCode: string | null;
  userCity: string | null;
  userCountry: string | null;
  userPhone: string | null;
  userRegistrationDate: string | null;
};

export type CategoryResponse = {
  categories: {
    id: number;
    name: string;
    image: string;
  }[];
};

export type UserResponse = {
  user: {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    birthDate: Date | null;
    address: string | null;
    postalCode: string | null;
    city: string | null;
    country: string | null;
    email: string;
    passwordHash: string;
    phone: string | null;
    roleId: number | null;
  };
};

export type GraphQlResponseBody =
  | {
      user: User;
    }
  | Error;

export type FakeAdminUserContext = {
  isAdmin: boolean;
};

export type Role = {
  id: number;
  name: string;
};

export type CategoriesProps = {
  categoryId: number;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
};

export type UserIdProps = { userId: string };
export type EditUserListingPropParams = { listingId: string };

export type Status = {
  id: number;
  name: string;
};
