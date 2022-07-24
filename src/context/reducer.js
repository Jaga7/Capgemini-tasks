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

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === LOAD_TODOS_FROM_BACKEND_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOAD_TODOS_FROM_BACKEND_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      todos: action.payload,
    };
  }

  if (action.type === LOAD_TODOS_FROM_BACKEND_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CREATE_A_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_A_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      todos: [...state.todos, action.payload],
    };
  }

  if (action.type === CREATE_A_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === EDIT_THE_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_THE_TODO_SUCCESS) {
    const {
      id: idOfTodoBeingEdited,
      title: newTitle,
      body: newBody,
    } = action.payload;
    return {
      ...state,
      isLoading: false,
      todos: state.todos.map(
        // mapping over todos in search for the one that is to be edited,
        (todo) =>
          todo.id === idOfTodoBeingEdited
            ? {
                title: newTitle,
                body: newBody,
                id: todo.id,
                isComplete: todo.isComplete, //setting a new one in place, leaving the "id" and "isComplete" properties as they were
              }
            : todo // for the rest of the todos we return them back as they were
      ),
    };
  }

  if (action.type === EDIT_THE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === COMPLETE_THE_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === COMPLETE_THE_TODO_SUCCESS) {
    const { id: idOfTodoBeingCompleted, isComplete: isTodoAlreadyComplete } =
      action.payload;
    return {
      ...state,
      isLoading: false,
      todos: state.todos.map((todo) =>
        todo.id === idOfTodoBeingCompleted
          ? {
              ...todo,
              isComplete: !isTodoAlreadyComplete, // setting the completed todo's "isComplete" flag's value to the one of the document returned by the patch request
            }
          : todo
      ),
    };
  }

  if (action.type === COMPLETE_THE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === DELETE_THE_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === DELETE_THE_TODO_SUCCESS) {
    const idOfTodoBeingDeleted = action.payload;
    return {
      ...state,
      isLoading: false,
      todos: state.todos.filter(
        // filtering out the deleted todo from the local state.todos array
        (todo) => todo.id !== idOfTodoBeingDeleted
      ),
    };
  }

  if (action.type === DELETE_THE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === START_EDITING_TODO) {
    let newIsTodoBeingEdited;
    let newTodoTitle = action.payload.title;
    let newTodoBody = action.payload.body;
    if (state.idOfTodoBeingEdited === action.payload.id) {
      // if we click on "edit" button on the same todo as last time
      newIsTodoBeingEdited = !state.isTodoCardBeingEdited; // then we switch between editing and creating-a-todo mode
      if (!state.isTodoCardBeingEdited) {
        // if in fact we happen to switch to creating mode (abandoning the editing of a todo), then we also set input values back to empty strings
        newTodoTitle = "";
        newTodoBody = "";
      }
    } else {
      // but if we click on the "edit" button of a todo that is not being currently edited, then we go into edit-mode
      newIsTodoBeingEdited = true;
    }
    return {
      ...state,
      isTodoCarBeingEdited: newIsTodoBeingEdited,
      newTodoTitle: newTodoTitle, // setting form title input's value to the todo's title
      newTodoBody: newTodoBody, // setting form body input's value to the todo's body
      idOfTodoBeingEdited: action.payload.id, // we set "idOfTodoBeingEdited" to the todo's id
    };
  }

  if (action.type === CHANGE_FORM_TITLE_INPUT_VALUE) {
    return {
      ...state,
      newTodoTitle: action.payload.newInputValue,
    };
  }

  if (action.type === CHANGE_FORM_BODY_INPUT_VALUE) {
    return {
      ...state,
      newTodoBody: action.payload.newInputValue,
    };
  }

  if (action.type === FINISH_EDIT) {
    return {
      ...state,
      isTodoCarBeingEdited: false,
      idOfTodoBeingEdited: null,
    };
  }

  if (action.type === CLEAR_INPUTS) {
    return {
      ...state,
      newTodoTitle: "",
      newTodoBody: "",
    };
  }
  //   if (action.type === CLEAR_ALERT) {
  //     return {
  //       ...state,
  //       showAlert: false,
  //       alertType: "",
  //       alertText: "",
  //     };
  //   }
  //   if (action.type === REGISTER_USER_BEGIN) {
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   }
  //   if (action.type === REGISTER_USER_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       token: action.payload.token,
  //       user: action.payload.user,
  //       userLocation: action.payload.location,
  //       jobLocation: action.payload.location,
  //       showAlert: true,
  //       alertType: "success",
  //       alertText: "User Created! Redirecting...",
  //     };
  //   }
  //   if (action.type === REGISTER_USER_ERROR) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "danger",
  //       alertText: action.payload.msg,
  //     };
  //   }
  //   if (action.type === LOGIN_USER_BEGIN) {
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   }

  //   if (action.type === LOGIN_USER_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       token: action.payload.token,
  //       user: action.payload.user,
  //       userLocation: action.payload.location,
  //       jobLocation: action.payload.location,
  //       showAlert: true,
  //       alertType: "success",
  //       alertText: "Login Successful! Redirecting...",
  //     };
  //   }
  //   if (action.type === LOGIN_USER_ERROR) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "danger",
  //       alertText: action.payload.msg,
  //     };
  //   }

  //   if (action.type === SETUP_USER_BEGIN) {
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   }
  //   if (action.type === SETUP_USER_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       token: action.payload.token,
  //       user: action.payload.user,
  //       userLocation: action.payload.location,
  //       jobLocation: action.payload.location,
  //       showAlert: true,
  //       alertType: "success",
  //       alertText: action.payload.alertText,
  //     };
  //   }
  //   if (action.type === SETUP_USER_ERROR) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "danger",
  //       alertText: action.payload.msg,
  //     };
  //   }

  //   if (action.type === TOGGLE_SIDEBAR) {
  //     return {
  //       ...state,
  //       showSidebar: !state.showSidebar,
  //     };
  //   }

  //   if (action.type === LOGOUT_USER) {
  //     return {
  //       ...initialState,
  //       user: null,
  //       token: null,
  //       jobLocation: "",
  //       userLocation: "",
  //     };
  //   }

  //   if (action.type === UPDATE_USER_BEGIN) {
  //     return { ...state, isLoading: true };
  //   }

  //   if (action.type === UPDATE_USER_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       token: action.payload.token,
  //       user: action.payload.user,
  //       userLocation: action.payload.location,
  //       jobLocation: action.payload.location,
  //       showAlert: true,
  //       alertType: "success",
  //       alertText: "User Profile Updated!",
  //     };
  //   }
  //   if (action.type === UPDATE_USER_ERROR) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "danger",
  //       alertText: action.payload.msg,
  //     };
  //   }

  //   if (action.type === CLEAR_VALUES) {
  //     return {
  //       ...state,
  //       isEditing: false,
  //       editJobId: "",
  //       position: "",
  //       company: "",
  //       jobLocation: state.userLocation,
  //       jobType: "full-time",
  //       status: "pending",
  //     };
  //   }

  //   if (action.type === HANDLE_CHANGE) {
  //     return { ...state, page: 1, [action.payload.name]: action.payload.value };
  //   }

  //   if (action.type === CREATE_JOB_BEGIN) {
  //     return { ...state, isLoading: true };
  //   }
  //   if (action.type === CREATE_JOB_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "success",
  //       alertText: "New Job Created!",
  //     };
  //   }
  //   if (action.type === CREATE_JOB_ERROR) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "danger",
  //       alertText: action.payload.msg,
  //     };
  //   }

  //   if (action.type === GET_JOBS_BEGIN) {
  //     return { ...state, isLoading: true, showAlert: false };
  //   }
  //   if (action.type === GET_JOBS_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       jobs: action.payload.jobs,
  //       totalJobs: action.payload.totalJobs,
  //       numOfPages: action.payload.numOfPages,
  //     };
  //   }

  //   if (action.type === SET_EDIT_JOB) {
  //     const job = state.jobs.find((job) => job._id === action.payload.id);
  //     const { _id, position, company, jobLocation, jobType, status } = job;
  //     return {
  //       ...state,
  //       isEditing: true,
  //       editJobId: _id,
  //       position,
  //       company,
  //       jobLocation,
  //       jobType,
  //       status,
  //     };
  //   }

  //   if (action.type === DELETE_JOB_BEGIN) {
  //     return { ...state, isLoading: true };
  //   }

  //   if (action.type === EDIT_JOB_BEGIN) {
  //     return { ...state, isLoading: true };
  //   }
  //   if (action.type === EDIT_JOB_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "success",
  //       alertText: "Job Updated!",
  //     };
  //   }
  //   if (action.type === EDIT_JOB_ERROR) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       showAlert: true,
  //       alertType: "danger",
  //       alertText: action.payload.msg,
  //     };
  //   }

  //   if (action.type === SHOW_STATS_BEGIN) {
  //     return { ...state, isLoading: true, showAlert: false };
  //   }
  //   if (action.type === SHOW_STATS_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       stats: action.payload.stats,
  //       monthlyApplications: action.payload.monthlyApplications,
  //     };
  //   }

  //   if (action.type === CLEAR_FILTERS) {
  //     return {
  //       ...state,
  //       search: "",
  //       searchStatus: "all",
  //       searchType: "all",
  //       sort: "latest",
  //     };
  //   }

  //   if (action.type === CHANGE_PAGE) {
  //     return { ...state, page: action.payload.page };
  //   }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
