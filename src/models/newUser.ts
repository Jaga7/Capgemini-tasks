export type UserRoles = "admin" | "user";

export interface NewUser {
  name: string;
  lastName: string;
  birthDate: Date;
  childrenAmount: number;
  addresses: Array<{ city: string; country: string }>;
  role: UserRoles;
}

export class InitialUser implements NewUser {
  name = "";
  lastName = "";
  birthDate = new Date();
  childrenAmount = 0;
  addresses = [{ city: "", country: "" }];
  role = "user" as UserRoles;
}
