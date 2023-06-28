import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { ImPlus } from "react-icons/im";
import {
  getArticleErrorMessageCB,
  getArticleErrorMessageFromCB,
  getWriterArticlesCB,
  getSingleArticleToEdit,
  getSingleArticleToRead,
  getArticleToReadStatusCB,
  getArticleToEditStatusCB,
  deleteArticle,
} from "../../state/slice/articleSlice";
import { formatISO9075 } from "date-fns";
import { NavLink, Navigate } from "react-router-dom";
import {
  getAdminRoleStatusCB,
  getLoginStatusCB,
  getWriterRoleStatusCB,
} from "../../state/slice/userSlice";
const WriterSpace = () => {
  const dispatch = useDispatch();
  const writerArticles = useSelector(getWriterArticlesCB);
  const loginStatus = useSelector(getLoginStatusCB);
  const isWriter = useSelector(getWriterRoleStatusCB);
  const isAdmin = useSelector(getAdminRoleStatusCB);
  const articleToReadStatus = useSelector(getArticleToReadStatusCB);
  const articleToEditStatus = useSelector(getArticleToEditStatusCB);
  const errorMessage = useSelector(getArticleErrorMessageCB);
  const errorMessageFrom = useSelector(getArticleErrorMessageFromCB);

  const handleReadClick = (articleId) => {
    dispatch(getSingleArticleToRead({ articleId: articleId }));
  };

  const handleEditClick = (articleId) => {
    dispatch(getSingleArticleToEdit({ articleId: articleId }));
  };

  const handleRemoveClick = (articleId) => {
    dispatch(deleteArticle({ articleId: articleId }));
  };

  return loginStatus === "failed" || loginStatus === "idle" ? (
    <Navigate to="/" />
  ) : isAdmin || isWriter ? (
    <div className="writer-container">
      <div className="writer-create-article-container">
        <NavLink to="/createarticle">
          <button className="writer-create-article-button">
            <ImPlus />
            Create New Article
          </button>
        </NavLink>
      </div>
      <div className="writer-article-container">
        {articleToReadStatus === "success" ? (
          <Navigate to="/readarticle" />
        ) : (
          ""
        )}
        {articleToEditStatus === "success" ? (
          <Navigate to="/editarticle" />
        ) : (
          ""
        )}
        {errorMessage && errorMessageFrom === "writerArticles" ? (
          <div className="writer-article-error-message">{errorMessage}</div>
        ) : (
          ""
        )}
        {writerArticles.map((article) => (
          <div key={article._id} className="writer-article-card-container">
            <div
              className="writer-article-card-content"
              onClick={() => {
                handleReadClick(article._id);
              }}
            >
              <h3 className="writer-article-card-title">{article.title}</h3>
              <p className="writer-article-card-summary">{article.summary}</p>
            </div>
            <div
              className="writer-article-card-cover"
              onClick={() => {
                handleReadClick(article._id);
              }}
            >
              <img
                className="writer-article-card-img"
                src={`${import.meta.env.VITE_SERVER_URI}/${
                  article.coverImgURL
                }`}
                alt={`Image for the article ${article.title}`}
              />
              <div className="writer-article-card-writer-info">
                <p>{formatISO9075(new Date(article.createdAt))}</p>
                <p className="writer-article-card-writer-name">
                  {article.writer.username}
                </p>
              </div>
            </div>
            <div className="writer-article-card-remove">
              <button
                className="writer-article-edit-button"
                onClick={() => {
                  handleEditClick(article._id);
                }}
              >
                <AiTwotoneEdit />
              </button>
              <button
                className="writer-article-remove-button"
                onClick={() => {
                  handleRemoveClick(article._id);
                }}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default WriterSpace;
