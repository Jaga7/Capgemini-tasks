type UserRoles = "admin" | "user";

export type UserT = {
  name: string;
  lastName: string;
  birthDate: Date;
  childrenAmount: number;
  addresses: Array<{ city: string; country: string }>;
  role: UserRoles;
};
