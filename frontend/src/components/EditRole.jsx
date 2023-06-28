import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAdminErrorMessageCB,
  getAdminErrorMessageFromCB,
  getSingleIndividualToUpdate,
  setUpdateRoleStatus,
  updateIndividualRoles,
} from "../../state/slice/adminSlice";
import { AiFillWarning } from "react-icons/ai";

const EditRole = () => {
  const dispatch = useDispatch();
  const individualToUpdate = useSelector(getSingleIndividualToUpdate);
  const errorMessage = useSelector(getAdminErrorMessageCB);
  const errorMessageFrom = useSelector(getAdminErrorMessageFromCB);
  const [regularRole, setRegularRole] = useState("");
  const [adminRole, setAdminRole] = useState(false);

  useEffect(() => {
    dispatch(setUpdateRoleStatus("idle"));
    if (individualToUpdate.roles.Writer) {
      setRegularRole("writer");
      if (individualToUpdate.roles.Admin) {
        setAdminRole(true);
      }
    } else {
      setRegularRole("user");
    }
  }, []);

  const handleUpdateRole = () => {
    const roles = {};
    if (regularRole === "writer") {
      roles.Writer = Number(import.meta.env.VITE_ROLE_WRITER);
    } else {
      roles.User = Number(import.meta.env.VITE_ROLE_USER);
    }
    if (adminRole === true) {
      roles.Admin = Number(import.meta.env.VITE_ROLE_ADMIN);
    }
    dispatch(
      updateIndividualRoles({
        individualId: individualToUpdate._id,
        roles: roles,
      })
    );
  };

  return (
    <div className="edit-role-container">
      <div className="edit-page-name">
        <h3>{individualToUpdate.username}</h3>
      </div>
      <div className="edit-page-roles">
        <div className="edit-page-role">
          <label htmlFor="writer">Writer</label>
          <input
            id="writer"
            type="radio"
            name="regular-role"
            value="writer"
            checked={regularRole === "writer"}
            onChange={(e) => {
              setRegularRole(e.target.value);
            }}
          />
        </div>
        <div className="edit-page-role">
          <label htmlFor="user">User</label>
          <input
            id="user"
            type="radio"
            name="regular-role"
            value="user"
            checked={regularRole === "user"}
            onChange={(e) => {
              setRegularRole(e.target.value);
            }}
          />
        </div>
        <div className="edit-page-role">
          <label htmlFor="admin">Admin</label>
          <input
            type="checkbox"
            id="admin"
            name="admin-role"
            checked={adminRole === true}
            onChange={() => {
              if (adminRole === true) {
                setAdminRole(false);
              } else {
                setAdminRole(true);
              }
            }}
          />
        </div>
      </div>
      <button className="update-role-button" onClick={handleUpdateRole}>
        UPDATE ROLE
      </button>
      {errorMessage && errorMessageFrom === "updateIndividualRoles" ? (
        <div className="update-role-error-msg">
          <AiFillWarning className="update-role-error-sign" />
          <div>{errorMessage}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditRole;
