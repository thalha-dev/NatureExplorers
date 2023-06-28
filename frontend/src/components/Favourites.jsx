import { useDispatch, useSelector } from "react-redux";
import {
  getIndividualIdCB,
  getLoginStatusCB,
} from "../../state/slice/userSlice";
import { formatISO9075 } from "date-fns";
import {
  getArticleErrorMessageCB,
  getArticleErrorMessageFromCB,
  getArticleToReadStatusCB,
  getFavouriteArticlesCB,
  getSingleArticleToRead,
  removeFavouriteArticle,
} from "../../state/slice/articleSlice";
import { Navigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Favourites = () => {
  const dispatch = useDispatch();
  const individualId = useSelector(getIndividualIdCB);
  const articleToReadStatus = useSelector(getArticleToReadStatusCB);
  const errorMessage = useSelector(getArticleErrorMessageCB);
  const errorMessageFrom = useSelector(getArticleErrorMessageFromCB);
  const favArticles = useSelector(getFavouriteArticlesCB);
  const loginStatus = useSelector(getLoginStatusCB);

  const handleReadClick = (articleId) => {
    dispatch(getSingleArticleToRead({ articleId: articleId }));
  };

  const handleRemoveClick = (articleId) => {
    dispatch(
      removeFavouriteArticle({
        articleId: articleId,
        individualId: individualId,
      })
    );
  };

  return (
    <div className="fav-article-container">
      {articleToReadStatus === "success" ? <Navigate to="/readarticle" /> : ""}
      {loginStatus === "failed" || loginStatus === "idle" ? (
        <Navigate to="/" />
      ) : errorMessage && errorMessageFrom === "getArticles" ? (
        <div className="fav-article-error-message">{errorMessage}</div>
      ) : (
        favArticles &&
        favArticles.map((article) => (
          <div key={article._id} className="fav-article-card-container">
            <div
              className="fav-article-card-content"
              onClick={() => {
                handleReadClick(article._id);
              }}
            >
              <h3 className="fav-article-card-title">{article.title}</h3>
              <p className="fav-article-card-summary">{article.summary}</p>
            </div>
            <div
              onClick={() => {
                handleReadClick(article._id);
              }}
              className="fav-article-card-cover"
            >
              <img
                className="fav-article-card-img"
                src={`${import.meta.env.VITE_SERVER_URI}/${
                  article.coverImgURL
                }`}
                alt={`Image for the article ${article.title}`}
              />
              <div className="fav-article-card-writer-info">
                <p>{formatISO9075(new Date(article.createdAt))}</p>
                <p className="fav-article-card-writer-name">
                  {article.writer.username}
                </p>
              </div>
            </div>
            <div className="fav-article-card-remove">
              <button
                className="fav-article-remove-button"
                onClick={() => {
                  handleRemoveClick(article._id);
                }}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;
