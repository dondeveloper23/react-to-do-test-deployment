import users from "../data/users.json";
import { useContext, useEffect, useReducer, useState } from "react";
import { initialUserData, userReducer } from "../reducers/User";
import { getUsersInitialData } from "../reducers/User";
import { UserContext } from "../App";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const {userState, userDispatch} = useContext(UserContext)
  console.log(userState)

  const logInAuth = () => {
    if (!username.trim() || !password.trim()) {
      setLoginError("Username and password cannot be empty");
      return;
    }
    let isUserFound = false;
    users.forEach((user) => {
      if (user.username === username && user.password === password) {
        isUserFound = true;
        setLoginError(null);
        userDispatch({ type: "SET_USERNAME", payload: username });
        userDispatch({ type: "SET_IS_LOGGED_IN", payload: true });
        userDispatch({ type: "SET_TIME", payload: new Date().getTime() });
      }
    });

    if (!isUserFound) {
      setLoginError("Invalid username or password");
    }
  };

  useEffect(() => {
    if (userState.isLoggedIn) {
      localStorage.setItem("userData", JSON.stringify(userState));
    }
  }, [userState]);

  return (
    <>
      {!userState.isLoggedIn &&
        <div>
        <p>{loginError}</p>

        <form action="">
          <input
            type="text"
            placeholder="Username"
            onInput={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
          <button type="button" onClick={logInAuth}>
            Login
          </button>
        </form>
      </div>
      }

    </>
  );
};

export default LoginForm;
