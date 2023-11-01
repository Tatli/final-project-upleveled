export type CreateUserArgs = {
  username: string;
  email: string;
  passwordHash: string;
  roleId: number;
};

export type CreateRoleArgs = {
  name: string;
};

export type CreateCategoryArgs = {
  name: string;
  image: string;
};

export type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  birth_date: Date | null;
  address: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  email: string;
  // password_hash: string;
  phone: string | null;
  image: string | null;
  roleId: number;
};
