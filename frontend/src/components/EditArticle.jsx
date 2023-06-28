import { useDispatch, useSelector } from "react-redux";
import { AiFillWarning } from "react-icons/ai";

import {
  getArticleErrorMessageCB,
  getArticleErrorMessageFromCB,
  getArticleToEditCB,
  updateArticle,
  updateArticleToEditStatus,
} from "../../state/slice/articleSlice";
import { useEffect, useState } from "react";
import Editor from "./Editor";
import {
  getAdminRoleStatusCB,
  getLoginStatusCB,
  getWriterRoleStatusCB,
} from "../../state/slice/userSlice";
import { Navigate } from "react-router-dom";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imgFiles, setImgFiles] = useState("");
  const dispatch = useDispatch();
  const articleToEdit = useSelector(getArticleToEditCB);
  const errorMessage = useSelector(getArticleErrorMessageCB);
  const errorMessageFrom = useSelector(getArticleErrorMessageFromCB);
  const loginStatus = useSelector(getLoginStatusCB);
  const isAdmin = useSelector(getAdminRoleStatusCB);
  const isWriter = useSelector(getWriterRoleStatusCB);

  useEffect(() => {
    dispatch(updateArticleToEditStatus("idle"));
    setTitle(articleToEdit.title);
    setSummary(articleToEdit.summary);
    setContent(articleToEdit.content);
  }, []);

  const handleSubmit = (e) => {
    const params = {
      title: title,
      summary: summary,
      content: content,
      imgFile: imgFiles[0],
      articleId: articleToEdit._id,
    };
    e.preventDefault();
    dispatch(updateArticle(params));
  };

  return loginStatus === "failed" || loginStatus === "idle" ? (
    <Navigate to="/" />
  ) : isAdmin || isWriter ? (
    <div className="form-container">
      <h1 className="form-heading">UPDATE ARTICLE</h1>
      <form
        className="create-article-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          className="form-title"
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-summary"
          type="text"
          placeholder={"Summary"}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <div className="form-cover-img">
          <p className="form-cover-img-title">COVER IMAGE</p>
          <input
            className="form-file"
            type="file"
            name="imgFile"
            onChange={(e) => setImgFiles(e.target.files)}
          />
        </div>
        <Editor
          className="form-content"
          value={content}
          onChange={setContent}
        />
        <button className="form-button">SUBMIT</button>
        {errorMessage && errorMessageFrom === "updateArticle" ? (
          <div className="create-article-error-msg">
            <AiFillWarning className="create-article-error-sign" />
            <div>{errorMessage}</div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default EditArticle;
