import React, { useReducer, useContext } from "react";
import {
  LOAD_TODOS_FROM_BACKEND_BEGIN,
  LOAD_TODOS_FROM_BACKEND_SUCCESS,
  LOAD_TODOS_FROM_BACKEND_ERROR,
  CREATE_A_TODO_BEGIN,
  CREATE_A_TODO_SUCCESS,
  CREATE_A_TODO_ERROR,
  EDIT_THE_TODO_BEGIN,
  EDIT_THE_TODO_SUCCESS,
  EDIT_THE_TODO_ERROR,
  COMPLETE_THE_TODO_BEGIN,
  COMPLETE_THE_TODO_SUCCESS,
  COMPLETE_THE_TODO_ERROR,
  DELETE_THE_TODO_BEGIN,
  DELETE_THE_TODO_SUCCESS,
  DELETE_THE_TODO_ERROR,
  START_EDITING_TODO,
  CHANGE_FORM_TITLE_INPUT_VALUE,
  CHANGE_FORM_BODY_INPUT_VALUE,
  FINISH_EDIT,
  CLEAR_INPUTS,
} from "./actions";

import reducer from "./reducer";
import axios from "axios";
import api from "../../shared/utils/api";

const endpoint = "/todos";

const initialState = {
  todos: [
    {
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet explicabo expedita, suscipit cum tempore molestias porro facilis dolorum rem, nulla quod enim qui inventore reprehenderit et aspernatur ratione eaque nam?",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, alias aperiam quia fugiat, enim vel omnis pariatur modi quo aut iste, officia totam ea adipisci earum natus. Rerum, saepe culpa?",
      id: 0,
      isComplete: false,
    },
  ],
  newTodoTitle: "",
  newTodoBody: "",
  isTodoCardBeingEdited: false,
  idOfTodoBeingEdited: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadTodosFromBackend = async () => {
    dispatch({ type: LOAD_TODOS_FROM_BACKEND_BEGIN });
    try {
      const resp = await api.get(`${endpoint}`);

      dispatch({ type: LOAD_TODOS_FROM_BACKEND_SUCCESS, payload: resp.data });
      // return resp.data;
    } catch (error) {
      dispatch({ type: LOAD_TODOS_FROM_BACKEND_ERROR });
      console.log("something went wrong");
    }
  };

  const createATodo = async (newTodoTitleAndBody) => {
    const newTodo = { ...newTodoTitleAndBody, isComplete: false };
    dispatch({ type: CREATE_A_TODO_BEGIN });
    try {
      const resp = await api.post(endpoint, newTodo);

      dispatch({ type: CREATE_A_TODO_SUCCESS, payload: resp.data });
      // return resp.data;
    } catch (error) {
      dispatch({ type: CREATE_A_TODO_ERROR });
      console.log("something went wrong");
    }
  };

  const editTheTodo = async (todo) => {
    const {
      id: idOfTodoBeingEdited,
      isComplete,
      body: newBody,
      title: newTitle,
    } = todo;
    dispatch({ type: EDIT_THE_TODO_BEGIN });
    try {
      const resp = await api.put(`${endpoint}/${idOfTodoBeingEdited}`, {
        id: idOfTodoBeingEdited,
        title: newTitle,
        body: newBody,
        isComplete,
      });

      dispatch({ type: EDIT_THE_TODO_SUCCESS, payload: resp.data });
      // return resp.data;
    } catch (error) {
      dispatch({ type: EDIT_THE_TODO_ERROR });
      console.log("something went wrong");
    }
  };

  const completeTheTodo = async (todo) => {
    const {
      id: idOfTodoBeingCompleted,
      isComplete: isTodoAlreadyComplete,
      body,
      title,
    } = todo;
    dispatch({ type: COMPLETE_THE_TODO_BEGIN });
    try {
      const resp = await api.put(`${endpoint}/${idOfTodoBeingCompleted}`, {
        id: idOfTodoBeingCompleted,
        isComplete: !isTodoAlreadyComplete,
        body,
        title,
      });
      // const resp = await api.patch(`${endpoint}/${idOfTodoBeingCompleted}`, {
      //   isComplete: !isTodoAlreadyComplete,
      // });
      dispatch({ type: COMPLETE_THE_TODO_SUCCESS, payload: resp.data });
      // return resp.data;
    } catch (error) {
      dispatch({ type: COMPLETE_THE_TODO_ERROR });
      console.log("something went wrong");
    }
  };

  const deleteTheTodo = async (idOfTodoBeingDeleted) => {
    dispatch({ type: DELETE_THE_TODO_BEGIN });
    try {
      const resp = await api.delete(`${endpoint}/${idOfTodoBeingDeleted}`);
      dispatch({ type: DELETE_THE_TODO_SUCCESS, payload: resp.data });
      // return resp.data;
    } catch (error) {
      dispatch({ type: DELETE_THE_TODO_ERROR });
      console.log("something went wrong");
    }
  };

  const startEditingTodo = () => {
    dispatch({ type: START_EDITING_TODO });
  };
  const changeFormTitleInputValue = () => {
    dispatch({ type: CHANGE_FORM_TITLE_INPUT_VALUE });
  };
  const changeFormBodyInputValue = () => {
    dispatch({ type: CHANGE_FORM_BODY_INPUT_VALUE });
  };
  const finishEdit = () => {
    dispatch({ type: FINISH_EDIT });
  };
  const clearInputs = () => {
    dispatch({ type: CLEAR_INPUTS });
  };

  // dotąd są te z aktualnego projektu

  //   const clearAlert = () => {
  //     setTimeout(() => {
  //       dispatch({ type: CLEAR_ALERT });
  //     }, 3000);
  //   };

  //   const displayAlert = () => {
  //     dispatch({ type: DISPLAY_ALERT });
  //     clearAlert();
  //   };

  //   const addUserToLocalStorage = ({ user, token, location }) => {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("location", location);
  //   };

  //   const removeUserFromLocalStorage = () => {
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("location");
  //   };

  //   const registerUser = async (currentUser) => {
  //     dispatch({ type: REGISTER_USER_BEGIN });
  //     try {
  //       const response = await axios.post("/api/v1/auth/register", currentUser);
  //       const { user, token, location } = response.data;
  //       dispatch({
  //         type: REGISTER_USER_SUCCESS,
  //         payload: {
  //           user,
  //           token,
  //           location,
  //         },
  //       });
  //       addUserToLocalStorage({ user, token, location });
  //     } catch (error) {
  //       dispatch({
  //         type: REGISTER_USER_ERROR,
  //         payload: { msg: error.response.data.msg },
  //       });
  //     }
  //     clearAlert();
  //   };

  //   const loginUser = async (currentUser) => {
  //     dispatch({ type: LOGIN_USER_BEGIN });
  //     try {
  //       const response = await axios.post("/api/v1/auth/login", currentUser);
  //       const { user, token, location } = response.data;
  //       dispatch({
  //         type: LOGIN_USER_SUCCESS,
  //         payload: {
  //           user,
  //           token,
  //           location,
  //         },
  //       });
  //       addUserToLocalStorage({ user, token, location });
  //     } catch (error) {
  //       dispatch({
  //         type: LOGIN_USER_ERROR,
  //         payload: { msg: error.response.data.msg },
  //       });
  //     }
  //     clearAlert();
  //   };

  //   const setupUser = async ({ currentUser, endPoint, alertText }) => {
  //     dispatch({ type: SETUP_USER_BEGIN });
  //     try {
  //       const response = await axios.post(
  //         `/api/v1/auth/${endPoint}`,
  //         currentUser
  //       );
  //       const { user, token, location } = response.data;
  //       dispatch({
  //         type: SETUP_USER_SUCCESS,
  //         payload: {
  //           user,
  //           token,
  //           location,
  //           alertText,
  //         },
  //       });
  //       addUserToLocalStorage({ user, token, location });
  //     } catch (error) {
  //       dispatch({
  //         type: SETUP_USER_ERROR,
  //         payload: { msg: error.response.data.msg },
  //       });
  //     }
  //     clearAlert();
  //   };

  //   const toggleSidebar = () => {
  //     dispatch({ type: TOGGLE_SIDEBAR });
  //   };

  //   const logoutUser = () => {
  //     dispatch({ type: LOGOUT_USER });
  //     removeUserFromLocalStorage();
  //   };

  //   const updateUser = async (currentUser) => {
  //     dispatch({ type: UPDATE_USER_BEGIN });
  //     try {
  //       const { data } = await authFetch.patch("/auth/updateUser", currentUser);

  //       const { user, location, token } = data;

  //       dispatch({
  //         type: UPDATE_USER_SUCCESS,
  //         payload: { user, location, token },
  //       });

  //       addUserToLocalStorage({ user, location, token });
  //     } catch (error) {
  //       if (error.response.status !== 401) {
  //         dispatch({
  //           type: UPDATE_USER_ERROR,
  //           payload: { msg: error.response.data.msg },
  //         });
  //       }
  //     }
  //     clearAlert();
  //   };

  //   const handleChange = ({ name, value }) => {
  //     dispatch({
  //       type: HANDLE_CHANGE,
  //       payload: { name, value },
  //     });
  //   };

  //   const clearValues = () => {
  //     dispatch({ type: CLEAR_VALUES });
  //   };

  //   const createJob = async () => {
  //     dispatch({ type: CREATE_JOB_BEGIN });
  //     try {
  //       const { position, company, jobLocation, jobType, status } = state;

  //       await authFetch.post("/jobs", {
  //         company,
  //         position,
  //         jobLocation,
  //         jobType,
  //         status,
  //       });
  //       dispatch({
  //         type: CREATE_JOB_SUCCESS,
  //       });
  //       dispatch({ type: CLEAR_VALUES });
  //     } catch (error) {
  //       if (error.response.status === 401) return;
  //       dispatch({
  //         type: CREATE_JOB_ERROR,
  //         payload: { msg: error.response.data.msg },
  //       });
  //     }
  //     clearAlert();
  //   };

  //   const getJobs = async () => {
  //     const { search, searchStatus, searchType, sort, page } = state;
  //     let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
  //     if (search) {
  //       url = url + `&search=${search}`;
  //     }
  //     dispatch({ type: GET_JOBS_BEGIN });
  //     try {
  //       const { data } = await authFetch(url);
  //       const { jobs, totalJobs, numOfPages } = data;
  //       dispatch({
  //         type: GET_JOBS_SUCCESS,
  //         payload: {
  //           jobs,
  //           totalJobs,
  //           numOfPages,
  //         },
  //       });
  //     } catch (error) {
  //       logoutUser();
  //     }
  //     clearAlert();
  //   };

  //   const deleteJob = async (jobId) => {
  //     dispatch({ type: DELETE_JOB_BEGIN });
  //     try {
  //       await authFetch.delete(`/jobs/${jobId}`);
  //       getJobs();
  //     } catch (error) {
  //       console.log(error.response);
  //       logoutUser();
  //     }
  //   };

  //   const setEditJob = (id) => {
  //     dispatch({ type: SET_EDIT_JOB, payload: { id } });
  //   };

  //   const editJob = async () => {
  //     dispatch({ type: EDIT_JOB_BEGIN });
  //     try {
  //       const { position, company, jobLocation, jobType, status } = state;

  //       await authFetch.patch(`/jobs/${state.editJobId}`, {
  //         company,
  //         position,
  //         jobLocation,
  //         jobType,
  //         status,
  //       });
  //       dispatch({
  //         type: EDIT_JOB_SUCCESS,
  //       });
  //       dispatch({ type: CLEAR_VALUES });
  //     } catch (error) {
  //       if (error.response.status === 401) return;
  //       dispatch({
  //         type: EDIT_JOB_ERROR,
  //         payload: { msg: error.response.data.msg },
  //       });
  //     }
  //     clearAlert();
  //   };

  //   const showStats = async () => {
  //     dispatch({ type: SHOW_STATS_BEGIN });
  //     try {
  //       const { data } = await authFetch("/jobs/stats");
  //       dispatch({
  //         type: SHOW_STATS_SUCCESS,
  //         payload: {
  //           stats: data.defaultStats,
  //           monthlyApplications: data.monthlyApplications,
  //         },
  //       });
  //     } catch (error) {
  //       console.log(error.response);
  //       logoutUser();
  //     }

  //     clearAlert();
  //   };

  //   const clearFilters = () => {
  //     dispatch({ type: CLEAR_FILTERS });
  //   };

  //   const changePage = (page) => {
  //     dispatch({ type: CHANGE_PAGE, payload: { page } });
  //   };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loadTodosFromBackend,
        createATodo,
        editTheTodo,
        completeTheTodo,
        deleteTheTodo,
        startEditingTodo,
        changeFormTitleInputValue,
        changeFormBodyInputValue,
        finishEdit,
        clearInputs,
        // displayAlert,
        // registerUser,
        // loginUser,
        // setupUser,
        // toggleSidebar,
        // logoutUser,
        // updateUser,
        // handleChange,
        // clearValues,
        // createJob,
        // getJobs,
        // setEditJob,
        // deleteJob,
        // editJob,
        // showStats,
        // clearFilters,
        // changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
