export interface IUsersServiceFindOneByEamil {
  email: string;
}

export interface IUsersServiceCreate {
  email: string;
  password: string;
  name: string;
  age: number;
}