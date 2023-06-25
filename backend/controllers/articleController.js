const createHttpError = require("http-errors");
const UserModel = require("../models/User");
const ArticleModel = require("../models/Article");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const getArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find()
      .populate("writer", ["username"])
      .sort({ createdAt: -1 })
      .exec();

    if (!articles) {
      throw createHttpError(404, "No articles found");
    }

    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

const getWriterArticles = async (req, res, next) => {
  const writerId = req.params.writerId;
  try {
    if (!writerId) {
      throw createHttpError(400, "Writer ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(writerId)) {
      throw createHttpError(400, "Writer ID is not in correct format");
    }

    const articles = await ArticleModel.find({ writer: writerId })
      .populate("writer", ["username"])
      .sort({ createdAt: -1 })
      .exec();

    if (!articles) {
      throw createHttpError(404, "No articles found");
    }

    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

const getArticle = async (req, res, next) => {
  const articleId = req.params.articleId;
  try {
    if (!articleId) {
      throw createHttpError(400, "Article ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      throw createHttpError(400, "Article ID is not in correct format");
    }

    const article = await ArticleModel.findOne({ _id: articleId })
      .populate("writer", ["username"])
      .exec();

    if (!article) {
      throw createHttpError(404, "Article not found for the given ID");
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  const title = req.body.title;
  const summary = req.body.summary;
  const content = req.body.content;
  const imgFile = req.file;
  const writerId = req.body.writerId;
  try {
    if (!title) {
      throw createHttpError(400, "Title is required");
    }

    if (!content) {
      throw createHttpError(400, "Content is required");
    }

    if (!summary) {
      throw createHttpError(400, "Summary is required");
    }

    if (!imgFile) {
      throw createHttpError(400, "Cover Images is required");
    }

    if (!writerId) {
      throw createHttpError(400, "Writer ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(writerId)) {
      throw createHttpError(400, "Writer ID is not in correct format");
    }

    const { originalname: originalFileName, path: imgPath } = imgFile;
    const nameArray = originalFileName.split(".");
    const extension = nameArray[nameArray.length - 1];
    const imgPathWithExtension = imgPath + "." + extension;
    fs.renameSync(imgPath, imgPathWithExtension);

    const newArticle = await ArticleModel.create({
      title: title,
      summary: summary,
      content: content,
      coverImgURL: imgPathWithExtension,
      writer: writerId,
    });

    res.status(200).json(newArticle);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  const title = req.body.title;
  const summary = req.body.summary;
  const content = req.body.content;
  const imgFile = req.file;
  const articleId = req.body.articleId;
  try {
    if (!title && !content && !summary && !imgFile) {
      throw createHttpError(400, "Nothing to update");
    }

    if (!articleId) {
      throw createHttpError(400, "Article ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      throw createHttpError(400, "Article ID is not in correct format");
    }

    const article = await ArticleModel.findOne({ _id: articleId }).exec();

    if (!article) {
      throw createHttpError(404, "Article Not Found");
    }

    if (req.body?.title) article.title = title;
    if (req.body?.content) article.content = content;
    if (req?.file) {
      const { originalname: originalFileName, path: imgPath } = imgFile;
      const nameArray = originalFileName.split(".");
      const extension = nameArray[nameArray.length - 1];
      const imgPathWithExtension = imgPath + "." + extension;
      fs.renameSync(imgPath, imgPathWithExtension);
      article.coverImgURL = imgPathWithExtension;
    }

    const updatedArticle = await article.save();

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  const articleId = req.body.articleId;
  try {
    if (!articleId) {
      throw createHttpError(400, "Article ID required");
    }

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      throw createHttpError(400, "Article ID is not in correct format");
    }

    const deletedArticle = await ArticleModel.findOneAndDelete({
      _id: articleId,
    }).exec();

    if (!deletedArticle) {
      throw createHttpError(404, "Article Not Found");
    }

    const imagePath = path.join(__dirname, "..", deletedArticle.coverImgURL);
    fs.unlink(imagePath, (error) => {
      if (error) {
        console.error("Error deleting image file:", error);
      }
    });

    await UserModel.updateMany({}, { $pull: { favouriteArticles: articleId } });

    res.status(200).json(deletedArticle);
  } catch (error) {
    next(error);
  }
};

const addFavouriteArticle = async (req, res, next) => {
  const individualId = req.body.individualId;
  const articleId = req.body.articleId;
  try {
    if (!individualId) {
      throw createHttpError(400, "Individual ID is missing");
    }

    if (!mongoose.Types.ObjectId.isValid(individualId)) {
      throw createHttpError(400, "Individual ID is not in correct format");
    }

    if (!articleId) {
      throw createHttpError(400, "Article ID is missing");
    }

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      throw createHttpError(400, "Article ID is not in correct format");
    }

    const individual = await UserModel.findOne({ _id: individualId }).exec();

    if (individual.favouriteArticles.includes(articleId)) {
      throw createHttpError(400, "Article ID already in the favourite list");
    }

    const favArticle = await ArticleModel.findOne({ _id: articleId }).exec();
    if (!favArticle) {
      throw createHttpError(400, "No article found for the given ID");
    }

    individual.favouriteArticles.push(articleId);
    await individual.save();

    res.status(200).json(favArticle);
  } catch (error) {
    next(error);
  }
};

const removeFavouriteArticle = async (req, res, next) => {
  const individualId = req.body.individualId;
  const articleId = req.body.articleId;
  try {
    if (!individualId) {
      throw createHttpError(400, "Individual ID is missing");
    }

    if (!mongoose.Types.ObjectId.isValid(individualId)) {
      throw createHttpError(400, "Individual ID is not in correct format");
    }

    if (!articleId) {
      throw createHttpError(400, "Article ID is missing");
    }

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      throw createHttpError(400, "Article ID is not in correct format");
    }

    const individual = await UserModel.findOne({ _id: individualId }).exec();

    if (!individual.favouriteArticles.includes(articleId)) {
      throw createHttpError(400, "Article not in favourite list");
    }

    await UserModel.updateOne(
      { _id: individualId },
      { $pull: { favouriteArticles: articleId } }
    );

    res.status(200).json({ articleId });
  } catch (error) {
    next(error);
  }
};

const getFavouriteArticles = async (req, res, next) => {
  const individualId = req.params.individualId;
  try {
    if (!individualId) {
      throw createHttpError(400, "User/Writer ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(individualId)) {
      throw createHttpError(400, "User/Writer ID is not in correct format");
    }

    const individual = await UserModel.findOne({
      _id: individualId,
    }).exec();

    if (individual.favouriteArticles.length === 0) {
      throw createHttpError(404, "No Favourite Articles Found");
    }

    const favouriteArticlesIds = individual.favouriteArticles;

    const favouriteArticles = await ArticleModel.find({
      _id: { $in: favouriteArticlesIds },
    })
      .populate("writer", ["username"])
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(favouriteArticles);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getWriterArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getFavouriteArticles,
  removeFavouriteArticle,
  addFavouriteArticle,
};
