const createHttpError = require("http-errors");
const UserModel = require("../models/User");
const ArticleModel = require("../models/Article");
const mongoose = require("mongoose");

const getArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find().exec();

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

    const articles = await ArticleModel.find({ writerId: writerId }).exec();

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

    const article = await ArticleModel.findOne({ _id: articleId }).exec();

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
  const content = req.body.content;
  const writerId = req.body.writerId;
  try {
    if (!title) {
      throw createHttpError(400, "Title is required");
    }

    if (!content) {
      throw createHttpError(400, "Content is required");
    }

    if (!writerId) {
      throw createHttpError(400, "Writer ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(writerId)) {
      throw createHttpError(400, "Writer ID is not in correct format");
    }

    const newArticle = await ArticleModel.create({
      title: title,
      content: content,
      writerId: writerId,
    });

    res.status(200).json(newArticle);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const articleId = req.body.articleId;
  try {
    if (!title && !content) {
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

    individual.favouriteArticles.push(articleId);
    await individual.save();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const getFavouriteAtricles = async (req, res, next) => {
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
    }).exec();

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
  getFavouriteAtricles,
  addFavouriteArticle,
};
