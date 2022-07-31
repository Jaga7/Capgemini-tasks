import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { AuthState, RejectedAction, User } from "./authTypes";
import severJsonApi from "../../shared/utils/api-server-json";

const endpoint = "/auth";

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
  error: "",
  isWrongLogin: false,
};

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userName: string, thunkAPI) => {
    try {
      const resp = await severJsonApi.get(`${endpoint}`, {
        params: {
          name: userName,
        },
      });
      if (resp.data.length === 0) return null;
      const retrievedUser: User = resp.data.find((el: User) => el.name);
      localStorage.setItem("token", `${retrievedUser.id}`);
      return retrievedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (name, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      // return localStorage.getItem('token');
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload === null) {
          state.isWrongLogin = true;
        } else {
          state.isWrongLogin = false;
        }
        state.currentUser = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.currentUser = null;
        state.isLoading = false;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
