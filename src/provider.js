import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const Provider = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);

    if (!user) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  return (
    <Context.Provider
      value={{

        username,
        setUsername,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const State = () => {
  return useContext(Context);
};

export default Provider;
