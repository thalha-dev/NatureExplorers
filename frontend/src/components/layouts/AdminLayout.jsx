import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminRoleStatusCB,
  getLoginStatusCB,
  getWriterRoleStatusCB,
} from "../../../state/slice/userSlice";
import { getAllIndividuals } from "../../../state/slice/adminSlice";
const AdminLayout = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginStatusCB);
  const isAdmin = useSelector(getAdminRoleStatusCB);

  useEffect(() => {
    if (loginStatus === "success" && isAdmin) {
      dispatch(getAllIndividuals());
    }
  }, [loginStatus]);

  return loginStatus === "failed" || loginStatus === "idle" ? (
    <Navigate to="/" />
  ) : isAdmin ? (
    <div className="admin-layout-container">
      <nav className="admin-nav">
        <div className="handle-users-link">
          <NavLink to="handleusers">Users</NavLink>
        </div>
        <div className="handle-articles-link">
          <NavLink to="handlearticles">Articles</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminLayout;
