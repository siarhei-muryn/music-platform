import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Player } from "./player/player";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Search } from "./search/search";
import "../pages/pages.css";

export const Layout: React.FC = () => {
  const { setUser, setToken, setAuth } = useActions();
  const { isAuth, user } = useTypedSelector((state) => state.user);
  const signOutHandler = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    window.location.reload();
    setToken(null);
    setUser(null);
    setAuth(false);
  };
  return (
    <div className={"layout"}>
      <header>
        <div className={"logo_panel"}>
          <Link to={""} className={""}>
            TrackTornado
          </Link>
        </div>
        <Search />
        <div className={"user_panel"}>
          {!isAuth && (
            <Link to={"/sign-in"} replace={true}>
              Sign In
            </Link>
          )}
          {isAuth && user && (
            <>
              <Link to={`profile/${user.id}`} className={"profile_link"}>
                {user.username}
              </Link>
              <Link to={""} onClick={signOutHandler}>
                Sign Out
              </Link>
            </>
          )}
        </div>
      </header>
      <div className={"page"}>
        <Outlet />
      </div>
      <Player />
    </div>
  );
};
