import ReactQuill from "react-quill";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticle,
  getArticleErrorMessageCB,
  getArticleErrorMessageFromCB,
} from "../../state/slice/articleSlice";
import {
  getAdminRoleStatusCB,
  getIndividualIdCB,
  getLoginStatusCB,
  getWriterRoleStatusCB,
} from "../../state/slice/userSlice";
import { Navigate } from "react-router-dom";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imgFiles, setImgFiles] = useState("");
  const dispatch = useDispatch();
  const writerId = useSelector(getIndividualIdCB);
  const loginStatus = useSelector(getLoginStatusCB);
  const isAdmin = useSelector(getAdminRoleStatusCB);
  const isWriter = useSelector(getWriterRoleStatusCB);

  const errorMessage = useSelector(getArticleErrorMessageCB);
  const errorMessageFrom = useSelector(getArticleErrorMessageFromCB);

  const handleSubmint = (e) => {
    e.preventDefault();
    const params = {
      title: title,
      summary: summary,
      content: content,
      imgFile: imgFiles[0],
      writerId: writerId,
    };
    dispatch(createArticle(params));
    setTitle("");
    setContent("");
    setSummary("");
    setImgFiles("");
  };

  return loginStatus === "failed" || loginStatus === "idle" ? (
    <Navigate to="/" />
  ) : isAdmin || isWriter ? (
    <div className="form-container">
      <h1 className="form-heading">CREATE ARTICLE</h1>
      <form
        className="create-article-form"
        onSubmit={handleSubmint}
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
        <div className="form-editor-msg">WRITE WITH TITLE</div>
        <Editor
          className="form-content"
          value={content}
          onChange={setContent}
        />
        <button className="form-button">SUBMIT</button>
        {errorMessage && errorMessageFrom === "createArticle" ? (
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

export default CreateArticle;
