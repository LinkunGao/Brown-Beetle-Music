import React, { useState } from "react";
import usePersistedState from "@hoeks/use-persisted-state";
import {
  login,
  register,
  editProfile,
  deleteAccount,
} from "./utils/connectToBackendUtils";

const AppContext = React.createContext({
  user: null,
});

function AppContextProvider({ children }) {
  const [userTrue, setTrueUser, clear] = usePersistedState(null, "User");
  const [user, setUser] = useState(null);

  const context = {
    userTrue,
    user,
    setUser,
    login,
    register,
    editProfile,
    setTrueUser,
    deleteAccount,
    clear,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
