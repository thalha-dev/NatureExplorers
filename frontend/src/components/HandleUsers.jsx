import { useDispatch, useSelector } from "react-redux";
import {
  deleteIndividualAccount,
  getAllIndividualsCB,
  getSingleIndividual,
  getUpdateRolesStatusCB,
} from "../../state/slice/adminSlice";
import { useEffect, useState } from "react";
import {
  getAdminRoleStatusCB,
  getLoginStatusCB,
} from "../../state/slice/userSlice";
import { Navigate } from "react-router-dom";

const HandleUsers = () => {
  const dispatch = useDispatch();
  const allIndividuals = useSelector(getAllIndividualsCB);
  const loginStatus = useSelector(getLoginStatusCB);
  const individualToEditStatus = useSelector(getUpdateRolesStatusCB);
  const isAdmin = useSelector(getAdminRoleStatusCB);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIndividualList, setFilteredIndividualList] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilteredIndividualList(
        allIndividuals.filter((individual) => {
          return individual.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }, 900);

    return () => {
      clearTimeout(delay);
    };
  }, [allIndividuals, searchQuery]);

  const handleAccountDelete = (inidvidualId) => {
    dispatch(deleteIndividualAccount({ individualId: inidvidualId }));
  };

  const handleEditRole = (inidvidualId) => {
    dispatch(getSingleIndividual(inidvidualId));
  };

  const individualServer = (individualList) => {
    return individualList.map((individual) => {
      return (
        <div className="individual-card" key={individual._id}>
          <div className="individual-name">
            <h3>{individual.username}</h3>
          </div>
          <div className="individual-current-role">
            <h4>ROLE GIVEN</h4>
            <div>
              {individual.roles.User ? <p>USER</p> : <p>WRITER</p>}
              {individual.roles.Admin && <p>ADMIN</p>}
            </div>
          </div>
          <div className="inidvidual-button">
            <button
              className="individual-button-update"
              onClick={() => {
                handleEditRole(individual._id);
              }}
            >
              Edit Role
            </button>
            <button
              className="individual-button-delete"
              onClick={() => {
                handleAccountDelete(individual._id);
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      );
    });
  };

  return loginStatus === "failed" || loginStatus === "idle" ? (
    <Navigate to="/" />
  ) : isAdmin ? (
    <>
      {individualToEditStatus === "success" ? (
        <Navigate to="/adminspace/editrole" />
      ) : (
        ""
      )}

      <div className="handle-users-container">
        <div className="individual-search-container">
          <input
            type="text"
            name="searchIndividual"
            value={searchQuery}
            placeholder="Search Individuals..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className="individual-container">
          {individualServer(filteredIndividualList)}
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default HandleUsers;
