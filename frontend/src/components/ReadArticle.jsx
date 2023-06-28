import { useDispatch, useSelector } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";

import {
  addFavouriteArticle,
  getArticleToReadCB,
  updateArticleToReadStatus,
} from "../../state/slice/articleSlice";
import { useEffect } from "react";
import React from "react";
import { Parser } from "html-to-react";
import { getIndividualIdCB } from "../../state/slice/userSlice";

const ReadArticle = () => {
  const dispatch = useDispatch();
  const articleObject = useSelector(getArticleToReadCB);
  const individualId = useSelector(getIndividualIdCB);

  const htmlToReactParser = new Parser();
  const articleToRead = htmlToReactParser.parse(articleObject?.content);

  const handleClick = (articleId) => {
    const params = { articleId: articleId, individualId: individualId };
    dispatch(addFavouriteArticle(params));
  };

  useEffect(() => {
    dispatch(updateArticleToReadStatus("idle"));
  });

  return (
    <div className="read-article-container">
      {articleToRead ? (
        <>
          <div className="read-article-cover-container">
            <img
              className="read-article-cover-img"
              src={`${import.meta.env.VITE_SERVER_URI}/${
                articleObject.coverImgURL
              }`}
              alt={`Cover image for the article ${articleObject.title}`}
            />
            <button
              onClick={() => {
                handleClick(articleObject._id);
              }}
              className="article-favourite-button"
            >
              <BsFillHeartFill />
            </button>
          </div>

          <div className="read-article-content">{articleToRead}</div>
          <div className="read-article-author-info">
            <div className="read-article-author-name">
              Author: {articleObject?.writer?.username}
            </div>
            <div className="read-article-created-time">
              {articleObject?.createdAt}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReadArticle;
