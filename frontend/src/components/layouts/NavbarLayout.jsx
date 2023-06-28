import { NavLink, Outlet } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminRoleStatusCB,
  getLoginStatusCB,
  getWriterRoleStatusCB,
  logout,
} from "../../../state/slice/userSlice";
import {
  clearAllFields,
  getArticles,
  getFavouriteArticles,
  getWriterArticles,
} from "../../../state/slice/articleSlice";

const NavbarLayout = () => {
  const [toggleValue, setToggleValue] = useState(false);
  const loginStatus = useSelector(getLoginStatusCB);
  const isAdmin = useSelector(getAdminRoleStatusCB);
  const isWriter = useSelector(getWriterRoleStatusCB);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus === "success") {
      dispatch(getArticles());
      dispatch(getFavouriteArticles());
      if (isAdmin || isWriter) {
        dispatch(getWriterArticles());
      }
    }
  }, [loginStatus]);

  const handleClick = () => {
    setToggleValue(!toggleValue);
  };

  const handleLogout = () => {
    dispatch(clearAllFields());
    dispatch(logout());
  };

  return (
    <>
      <header className="site-header">
        <NavLink className="site-title" to="/">
          <h2>Nature Explorers</h2>
        </NavLink>

        <button
          className={`nav-btn ${toggleValue ? "position-fixed" : ""}`}
          onClick={handleClick}
        >
          {toggleValue ? <GrClose /> : <BiMenu />}
        </button>
        <div className={`nav-container ${toggleValue ? "btn-toggle" : ""}`}>
          <nav className="site-nav">
            <ul>
              {loginStatus === "success" ? (
                <li>
                  <NavLink to="/articles">ARTICLES</NavLink>
                </li>
              ) : (
                ""
              )}
              {loginStatus === "success" ? (
                <li>
                  <NavLink to="/favourites">FAVOURITES</NavLink>
                </li>
              ) : (
                ""
              )}
              {isWriter ? (
                <li>
                  <NavLink to="/writerspace">WRITER SPACE</NavLink>
                </li>
              ) : (
                ""
              )}
              {isAdmin ? (
                <li>
                  <NavLink to="/adminspace">ADMIN SPACE</NavLink>
                </li>
              ) : (
                ""
              )}
              {loginStatus === "success" ? (
                ""
              ) : (
                <li>
                  <NavLink to="/login">LOGIN</NavLink>
                </li>
              )}
              {loginStatus === "success" ? (
                <li>
                  <NavLink onClick={handleLogout} to="/">
                    LOGOUT
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {loginStatus === "success" ? (
                ""
              ) : (
                <li>
                  <NavLink to="/signup">SIGNUP</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default NavbarLayout;
