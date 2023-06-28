import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axiosBase/api";
import { refreshAccessTokenSubsequent } from "./userSlice";

const initialState = {
  allArticles: [],
  favouriteArticles: [],
  writerArticles: [],
  articleToRead: null,
  articleToEdit: null,
  errorMessage: null,
  errorMessageFrom: "",
  //possible values: [ idle, loading, success, failed ]
  allArticlesStatus: "idle",
  favouriteArticlesStatus: "idle",
  writerArticlesStatus: "idle",
  articleToReadStatus: "idle",
  articleToEditStatus: "idle",
  createArticleStatus: "idle",
  updateArticleStatus: "idle",
  deleteArticleStatus: "idle",
};

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (_, { getState, dispatch }) => {
    try {
      const token = getState().user.token;

      const response = await api.get("/api/articles/getArticles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const token = getState().user.token;
          const response = await api.get("/api/articles/getArticles", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });

          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const getSingleArticleToRead = createAsyncThunk(
  "article/getSingleArticleToRead",
  async (params, { getState, dispatch }) => {
    try {
      const response = await api.get(
        `/api/articles/getArticle/${params.articleId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.get(
            `/api/articles/getArticle/${params.articleId}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${getState().user.token}`,
              },
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const getSingleArticleToEdit = createAsyncThunk(
  "article/getSingleArticleToEdit",
  async (params, { getState, dispatch }) => {
    try {
      const response = await api.get(
        `/api/articles/getArticle/${params.articleId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.get(
            `/api/articles/getArticle/${params.articleId}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${getState().user.token}`,
              },
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const getFavouriteArticles = createAsyncThunk(
  "article/getFavouriteArticles",
  async (_, { getState, dispatch }) => {
    try {
      const response = await api.get(
        `/api/articles/getFavouriteArticles/${getState().user.individualId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.get(
            `/api/articles/getFavouriteArticles/${
              getState().user.individualId
            }`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${getState().user.token}`,
              },
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const getWriterArticles = createAsyncThunk(
  "article/getWriterArticles",
  async (_, { getState, dispatch }) => {
    try {
      const response = await api.get(
        `/api/articles/getWriterArticles/${getState().user.individualId}`,
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },

          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.get(
            `/api/articles/getWriterArticles/${params.writerId}`,
            {
              headers: {
                Authorization: `Bearer ${getState().user.token}`,
              },

              withCredentials: true,
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (params, { getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.set("title", params.title);
      formData.set("summary", params.summary);
      formData.set("content", params.content);
      formData.set("writerId", params.writerId);
      formData.set("imgFile", params.imgFile);
      const response = await api.post("/api/articles/createArticle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getState().user.token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const formData = new FormData();
          formData.set("title", params.title);
          formData.set("summary", params.summary);
          formData.set("content", params.content);
          formData.set("writerId", params.writerId);
          formData.set("imgFile", params.imgFile);
          const response = await api.post(
            "/api/articles/createArticle",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getState().user.token}`,
              },
              withCredentials: true,
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (params, { getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.set("title", params.title);
      formData.set("summary", params.summary);
      formData.set("content", params.content);
      formData.set("articleId", params.articleId);
      formData.set("imgFile", params.imgFile);
      const response = await api.post("/api/articles/updateArticle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getState().user.token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const formData = new FormData();
          formData.set("title", params.title);
          formData.set("summary", params.summary);
          formData.set("content", params.content);
          formData.set("articleId", params.articleId);
          formData.set("imgFile", params.imgFile);
          const response = await api.post(
            "/api/articles/updateArticle",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getState().user.token}`,
              },
              withCredentials: true,
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const addFavouriteArticle = createAsyncThunk(
  "article/addFavouriteArticle",
  async (params, { getState, dispatch }) => {
    try {
      const response = await api.post(
        "/api/articles/addFavouriteArticle",
        {
          individualId: params.individualId,
          articleId: params.articleId,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },

          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.post(
            "/api/articles/addFavouriteArticle",
            {
              individualId: params.individualId,
              articleId: params.articleId,
            },
            {
              headers: {
                Authorization: `Bearer ${getState().user.token}`,
              },

              withCredentials: true,
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const removeFavouriteArticle = createAsyncThunk(
  "article/removeFavouriteArticle",
  async (params, { getState, dispatch }) => {
    try {
      const response = await api.post(
        "/api/articles/removeFavouriteArticle",
        {
          individualId: params.individualId,
          articleId: params.articleId,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },

          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.post(
            "/api/articles/removeFavouriteArticle",
            {
              individualId: params.individualId,
              articleId: params.articleId,
            },
            {
              headers: {
                Authorization: `Bearer ${getState().user.token}`,
              },

              withCredentials: true,
            }
          );
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (params, { getState, dispatch }) => {
    try {
      const response = await api.delete("/api/articles/deleteArticle", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
        data: { articleId: params.articleId },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.delete("/api/articles/deleteArticle", {
            headers: {
              Authorization: `Bearer ${getState().user.token}`,
            },
            data: { articleId: params.articleId },
            withCredentials: true,
          });
          return response.data;
        } catch (refreshError) {
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw refreshError;
        }
      } else {
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        throw error;
      }
    }
  }
);

const articleSlice = createSlice({
  name: "aritcle",
  initialState: initialState,
  reducers: {
    updateArticleToReadStatus: (state, action) => {
      state.articleToReadStatus = action.payload;
    },
    updateArticleToEditStatus: (state, action) => {
      state.articleToEditStatus = action.payload;
    },
    clearAllFields: (state, action) => {
      state.allArticles = [];
      state.favouriteArticles = [];
      state.writerArticles = [];
      state.articleToRead = null;
      state.articleToEdit = null;
      state.allArticlesStatus = "idle";
      state.favouriteArticlesStatus = "idle";
      state.writerArticlesStatus = "idle";
      state.articleToReadStatus = "idle";
      state.articleToEditStatus = "idle";
      state.createArticleStatus = "idle";
      state.updateArticleStatus = "idle";
      state.deleteArticleStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state, action) => {
        state.allArticlesStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.allArticles = action.payload;
        state.allArticlesStatus = "success";
        state.errorMessage = null;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.allArticlesStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "getArticles";
      })

      .addCase(getSingleArticleToRead.pending, (state, action) => {
        state.articleToReadStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(getSingleArticleToRead.fulfilled, (state, action) => {
        state.articleToRead = action.payload;
        state.articleToReadStatus = "success";
        state.errorMessage = null;
      })
      .addCase(getSingleArticleToRead.rejected, (state, action) => {
        state.articleToReadStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "singleArticleToRead";
      })

      .addCase(getSingleArticleToEdit.pending, (state, action) => {
        state.articleToEditStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(getSingleArticleToEdit.fulfilled, (state, action) => {
        state.articleToEdit = action.payload;
        state.articleToEditStatus = "success";
        state.errorMessage = null;
      })
      .addCase(getSingleArticleToEdit.rejected, (state, action) => {
        state.articleToEditStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "singleArticleToEdit";
      })

      .addCase(getFavouriteArticles.pending, (state, action) => {
        state.favouriteArticlesStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(getFavouriteArticles.fulfilled, (state, action) => {
        state.favouriteArticles = action.payload;
        state.favouriteArticlesStatus = "success";
        state.errorMessage = null;
      })
      .addCase(getFavouriteArticles.rejected, (state, action) => {
        state.favouriteArticlesStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "favouriteArticle ";
      })

      .addCase(getWriterArticles.pending, (state, action) => {
        state.writerArticlesStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(getWriterArticles.fulfilled, (state, action) => {
        state.writerArticles = action.payload;
        state.writerArticlesStatus = "success";
        state.errorMessage = null;
      })
      .addCase(getWriterArticles.rejected, (state, action) => {
        state.writerArticlesStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "writerArticles";
      })

      .addCase(createArticle.pending, (state, action) => {
        state.createArticleStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        const newArticle = action.payload;
        state.allArticles.push(newArticle);
        state.writerArticles.push(newArticle);
        state.createArticleStatus = "success";
        state.errorMessage = null;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.createArticleStatus = "success";
        state.createArticleStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "createArticle";
      })

      .addCase(updateArticle.pending, (state, action) => {
        state.updateArticleStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const id = updatedArticle._id;

        const allArticlesFilter = state.allArticles.filter(
          (ob) => ob._id !== id
        );
        const writerArticlesFilter = state.writerArticles.filter(
          (ob) => ob._id !== id
        );

        state.allArticles = [...allArticlesFilter, updatedArticle];
        state.writerArticles = [...writerArticlesFilter, updatedArticle];
        state.updateArticleStatus = "success";
        state.errorMessage = null;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.updateArticleStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "updateArticle";
      })

      .addCase(addFavouriteArticle.pending, (state, action) => {
        state.favouriteArticlesStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(addFavouriteArticle.fulfilled, (state, action) => {
        const favArticle = action.payload;
        state.favouriteArticles.push(favArticle);
        state.favouriteArticlesStatus = "success";
        state.errorMessage = null;
      })
      .addCase(addFavouriteArticle.rejected, (state, action) => {
        state.favouriteArticlesStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "addFavArticle";
      })

      .addCase(removeFavouriteArticle.pending, (state, action) => {
        state.favouriteArticlesStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(removeFavouriteArticle.fulfilled, (state, action) => {
        const { articleId } = action.payload;
        state.favouriteArticles = state.favouriteArticles.filter(
          (article) => article._id !== articleId
        );
        state.favouriteArticlesStatus = "success";
        state.errorMessage = null;
      })
      .addCase(removeFavouriteArticle.rejected, (state, action) => {
        state.favouriteArticlesStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "addFavArticle";
      })

      .addCase(deleteArticle.pending, (state, action) => {
        state.deleteArticleStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        const articleToRemove = action.payload;
        const id = articleToRemove._id;

        const allArticlesFilter = state.allArticles.filter(
          (ob) => ob._id !== id
        );
        const favouriteArticlesFilter = state.favouriteArticles.filter(
          (ob) => ob._id !== id
        );
        const writerArticlesFilter = state.writerArticles.filter(
          (ob) => ob._id !== id
        );

        state.allArticles = allArticlesFilter;
        state.favouriteArticles = favouriteArticlesFilter;
        state.writerArticles = writerArticlesFilter;
        state.deleteArticleStatus = "success";
        state.errorMessage = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.deleteArticleStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "deleteArticle";
      });
  },
});

export const getAllArticlesCB = (state) => state.article.allArticles;
export const getAllArticlesStatusCB = (state) =>
  state.article.allArticlesStatus;
export const getFavouriteArticlesCB = (state) =>
  state.article.favouriteArticles;
export const getFavouriteArticlesStatusCB = (state) =>
  state.article.favouriteArticlesStatus;
export const getWriterArticlesCB = (state) => state.article.writerArticles;
export const getWriterArticlesStatusCB = (state) =>
  state.article.writerArticlesStatus;
export const getArticleToReadCB = (state) => state.article.articleToRead;
export const getArticleToReadStatusCB = (state) =>
  state.article.articleToReadStatus;
export const getArticleToEditCB = (state) => state.article.articleToEdit;
export const getArticleToEditStatusCB = (state) =>
  state.article.articleToEditStatus;
export const getCreateArticleStatusCB = (state) =>
  state.article.createArticleStatus;
export const getUpdateArticleStatusCB = (state) =>
  state.article.updateArticleStatus;
export const getDeleteArticleStatusCB = (state) =>
  state.article.deleteArticleStatus;
export const getArticleErrorMessageCB = (state) => state.article.errorMessage;
export const getArticleErrorMessageFromCB = (state) =>
  state.article.errorMessageFrom;

export const {
  updateArticleToEditStatus,
  updateArticleToReadStatus,
  clearAllFields,
} = articleSlice.actions;

export default articleSlice.reducer;
