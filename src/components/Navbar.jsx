import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const Navbar = () =>{
    const {userState} = useContext(UserContext)

    const userLogOut = () => {
      localStorage.removeItem("userData")
      window.location.reload()
    }

    return (
      <>
        { userState.isLoggedIn &&
        <a href="logout" onClick={userLogOut}>Logout</a>
        }

        { !userState.isLoggedIn &&
        <a href="login">Login</a>
        }


      </>
    )

};


export default Navbar;
