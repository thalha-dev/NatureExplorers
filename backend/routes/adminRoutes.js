const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");

const {
  getAllUsers,
  getAllWriters,
  getAllIndividuals,
  updateIndividualRoles,
  deleteIndividualAccount,
} = require("../controllers/userController");

const verifyJWT = require("../middlewares/auth/verifyJWT");
const verifyRoles = require("../middlewares/auth/verifyRoles");

router.get(
  "/getAllUsers",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  getAllUsers
);
router.get(
  "/getAllWriters",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  getAllWriters
);
router.get(
  "/getAllIndividuals",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  getAllIndividuals
);
router.post(
  "/updateIndividualRoles",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  updateIndividualRoles
);
router.post(
  "/deleteIndividualAccount",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  deleteIndividualAccount
);

module.exports = router;
