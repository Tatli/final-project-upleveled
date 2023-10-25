export type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
  roleId: number;
};

export type CreateRoleArgs = {
  name: string;
};

export type CreateCategoryArgs = {
  name: string;
  image: string;
};
