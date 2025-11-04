export type Relation<T> = T;
export type UserEntity = {
  id: number;
  name: string;
  login: string;
  password: string;
};

export type ClientEntity = {
  id: number;
  name: string;
  salary: number;
  companyValue: number;
  userId: number;
};
