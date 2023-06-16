const express = require("express");
const router = express.Router();

const {
  getArticles,
  getWriterArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getFavouriteAtricles,
  addFavouriteArticle,
} = require("../controllers/articleController");

const verifyRoles = require("../middlewares/auth/verifyRoles");
const ROLES_LIST = require("../config/roles_list");

router.get("/getArticles", getArticles);
router.get("/getArticle/:articleId", getArticle);
router.get("/getFavouriteAtricles/:individualId", getFavouriteAtricles);
router.post("/addFavouriteArticle", addFavouriteArticle);
router.get(
  "/getWriterArticles/:writerId",
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  getWriterArticles
);
router.post(
  "/createArticle",
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  createArticle
);
router.post(
  "/updateArticle",
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  updateArticle
);
router.post(
  "/deleteArticle",
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  deleteArticle
);

module.exports = router;
