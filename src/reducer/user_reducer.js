import {
  LOGIN_ERROR, LOGIN_LOAD, LOGIN_SUCCESS, LOGOUT,
} from '../action';

const user_reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_LOAD: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem('user', JSON.stringify(action.payload.data));
      localStorage.setItem('token', JSON.stringify(action.payload.data.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        token: action.payload.data.token,
        isLoading: false,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loginErrors: 'Incorrect email or password. Please try again',
        isLoading: false,
      };
    }
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        isLoading: false,
      };
    default:
      break;
  }

  return state;
};

export default user_reducer;
