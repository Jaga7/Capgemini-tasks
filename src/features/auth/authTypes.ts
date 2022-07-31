import { Action } from "@reduxjs/toolkit";

enum userRoles {
  admin = "admin",
  user = "user",
}

export interface User {
  id: number;
  name: string;
  role: userRoles;
}
export interface AuthState {
  currentUser: null | User;
  isLoading: boolean;
  error: string;
  isWrongLogin: boolean;
}

export interface RejectedAction extends Action {
  payload: string;
  error: Error;
}
