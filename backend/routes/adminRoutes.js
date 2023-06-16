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
const verifyRoles = require("../middlewares/auth/verifyRoles");

router.use(verifyRoles(ROLES_LIST.Admin));

router.get("/getAllUsers", getAllUsers);
router.get("/getAllWriters", getAllWriters);
router.get("/getAllIndividuals", getAllIndividuals);
router.post("/updateIndividualRoles", updateIndividualRoles);
router.post("/deleteIndividualAccount", deleteIndividualAccount);

module.exports = router;
