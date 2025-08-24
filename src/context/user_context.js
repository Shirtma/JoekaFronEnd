import React, { useContext, useReducer } from 'react';
import reducer from '../reducer/user_reducer';

const initialState = {
  isAuthenticated: false,
  user: {},
  token: null,
  loginErrors: '',
  isLoading: false,
};
const UserContext = React.createContext();
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
// make sure use
export const useUserContext = () => useContext(UserContext);
