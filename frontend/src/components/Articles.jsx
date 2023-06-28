import { useDispatch, useSelector } from "react-redux";
import {
  getAllArticlesCB,
  getArticleErrorMessageCB,
  getArticleErrorMessageFromCB,
  getArticleToReadStatusCB,
  getSingleArticleToRead,
} from "../../state/slice/articleSlice";
import { formatISO9075 } from "date-fns";
import { Navigate } from "react-router-dom";
import { getLoginStatusCB } from "../../state/slice/userSlice";

const Articles = () => {
  const dispatch = useDispatch();
  const allArticles = useSelector(getAllArticlesCB);
  const errorMessage = useSelector(getArticleErrorMessageCB);
  const errorMessageFrom = useSelector(getArticleErrorMessageFromCB);
  const articleToReadStatus = useSelector(getArticleToReadStatusCB);
  const loginStatus = useSelector(getLoginStatusCB);

  const handleClick = (articleId) => {
    dispatch(getSingleArticleToRead({ articleId: articleId }));
  };

  return (
    <div className="article-container">
      {articleToReadStatus === "success" ? <Navigate to="/readarticle" /> : ""}
      {loginStatus === "failed" || loginStatus === "idle" ? (
        <Navigate to="/login" replace={true} />
      ) : errorMessage && errorMessageFrom === "getArticles" ? (
        <div className="article-error-message">{errorMessage}</div>
      ) : (
        allArticles.map((article) => (
          <div
            key={article._id}
            className="article-card-container"
            onClick={() => {
              handleClick(article._id);
            }}
          >
            <div className="article-card-content">
              <h3 className="article-card-title">{article.title}</h3>
              <p className="article-card-summary">{article.summary}</p>
            </div>
            <div className="article-card-cover">
              <img
                className="article-card-img"
                src={`${import.meta.env.VITE_SERVER_URI}/${
                  article.coverImgURL
                }`}
                alt={`Image for the article ${article.title}`}
              />
              <div className="article-card-writer-info">
                <p>{formatISO9075(new Date(article.createdAt))}</p>
                <p className="article-card-writer-name">
                  {article.writer.username}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Articles;
