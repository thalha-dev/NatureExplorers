const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadMiddleware = multer({
  dest: "images/",
});

const {
  getArticles,
  getWriterArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getFavouriteArticles,
  addFavouriteArticle,
} = require("../controllers/articleController");

const verifyRoles = require("../middlewares/auth/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
const verifyJWT = require("../middlewares/auth/verifyJWT");

router.get("/getArticles", verifyJWT, getArticles);
router.get("/getArticle/:articleId", verifyJWT, getArticle);
router.get(
  "/getFavouriteArticles/:individualId",
  verifyJWT,
  getFavouriteArticles
);
router.post("/addFavouriteArticle", verifyJWT, addFavouriteArticle);
router.get(
  "/getWriterArticles/:writerId",
  verifyJWT,
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  getWriterArticles
);
router.post(
  "/createArticle",
  verifyJWT,
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  uploadMiddleware.single("imgFile"),
  createArticle
);
router.post(
  "/updateArticle",
  verifyJWT,
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  uploadMiddleware.single("imgFile"),
  updateArticle
);
router.delete(
  "/deleteArticle",
  verifyJWT,
  verifyRoles(ROLES_LIST.Writer, ROLES_LIST.Admin),
  deleteArticle
);

module.exports = router;
