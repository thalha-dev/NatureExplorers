import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axiosBase/api";
import { refreshAccessTokenSubsequent } from "./userSlice";
import {
  getArticles,
  getFavouriteArticles,
  getWriterArticles,
} from "./articleSlice";

const initialState = {
  allIndividuals: [],
  inividualToUpdate: null,
  //possible values: [ idle, loading, success, failed ]
  allIndividualStatus: "idle",
  updateRoleStatus: "idle",
  deleteAccountStatus: "idle",
  errorMessage: null,
  errorMessageFrom: "",
};

export const getAllIndividuals = createAsyncThunk(
  "admin/getAllIndividuals",
  async (_, { getState, dispatch }) => {
    try {
      const response = await api.get("/api/admin/getAllIndividuals", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },

        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.get("/api/admin/getAllIndividuals", {
            headers: {
              Authorization: `Bearer ${getState().user.token}`,
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

export const updateIndividualRoles = createAsyncThunk(
  "admin/updateIndividualRoles",
  async (params, { getState, dispatch }) => {
    try {
      const response = await api.put(
        "/api/admin/updateIndividualRoles",
        {
          individualId: params.individualId,
          roles: params.roles,
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

          const response = await api.get(
            "/api/admin/updateIndividualRoles",
            {
              individualId: params.individualId,
              roles: params.roles,
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

export const deleteIndividualAccount = createAsyncThunk(
  "admin/deleteIndividualAccount",
  async (params, { getState, dispatch }) => {
    try {
      const response = await api.delete("/api/admin/deleteIndividualAccount", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
        data: { individualId: params.individualId },
        withCredentials: true,
      });
      await dispatch(getArticles());
      await dispatch(getWriterArticles());
      await dispatch(getFavouriteArticles());
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          await dispatch(refreshAccessTokenSubsequent());

          const response = await api.delete(
            "/api/admin/deleteIndividualAccount",
            {
              headers: {
                Authorization: `Bearer ${getState().user.token}`,
              },
              data: { individualId: params.individualId },
              withCredentials: true,
            }
          );
          await dispatch(getArticles());
          await dispatch(getWriterArticles());
          await dispatch(getFavouriteArticles());
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

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setUpdateRoleStatus: (state, action) => {
      state.updateRoleStatus = action.payload;
    },
    getSingleIndividual: (state, action) => {
      const individualId = action.payload;
      const foundIndividual = state.allIndividuals.find((individual) => {
        return individual._id === individualId;
      });
      state.inividualToUpdate = foundIndividual;
      state.updateRoleStatus = "success";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIndividuals.pending, (state, action) => {
        state.allIndividualStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(getAllIndividuals.fulfilled, (state, action) => {
        state.allIndividuals = action.payload;
        state.allIndividualStatus = "success";
        state.errorMessage = null;
      })
      .addCase(getAllIndividuals.rejected, (state, action) => {
        state.allIndividualStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "getAllIndividuals";
      })

      .addCase(updateIndividualRoles.pending, (state, action) => {
        state.updateRoleStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(updateIndividualRoles.fulfilled, (state, action) => {
        const updatedIndividual = action.payload;
        const allIndividualsFilter = state.allIndividuals.filter(
          (ob) => ob._id !== updatedIndividual._id
        );
        state.allIndividuals = [...allIndividualsFilter, updatedIndividual];
        state.errorMessage = null;
      })
      .addCase(updateIndividualRoles.rejected, (state, action) => {
        state.updateRoleStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "updateIndividualRoles";
      })

      .addCase(deleteIndividualAccount.pending, (state, action) => {
        state.deleteAccountStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(deleteIndividualAccount.fulfilled, (state, action) => {
        const { individualId } = action.payload;
        console.log(individualId);
        const filteredIndividuals = state.allIndividuals.filter(
          (ob) => ob._id !== individualId
        );
        state.allIndividuals = [...filteredIndividuals];
        state.deleteAccountStatus = "success";
        state.errorMessage = null;
      })
      .addCase(deleteIndividualAccount.rejected, (state, action) => {
        state.deleteAccountStatus = "failed";
        state.errorMessage = action.error.message;
        state.errorMessageFrom = "deleteIndividualAccount";
      });
  },
});

export const getAllIndividualsCB = (state) => state.admin.allIndividuals;
export const getAllIndividualsStatusCB = (state) =>
  state.admin.allIndividualStatus;
export const getUpdateRolesStatusCB = (state) => state.admin.updateRoleStatus;
export const getDeleteAccountStatusCB = (state) =>
  state.admin.deleteAccountStatus;
export const getDeleteArticleCountCB = (state) =>
  state.admin.deletedArticlesCount;
export const getAdminErrorMessageCB = (state) => state.admin.errorMessage;
export const getAdminErrorMessageFromCB = (state) =>
  state.admin.errorMessageFrom;
export const getSingleIndividualToUpdate = (state) =>
  state.admin.inividualToUpdate;

export const { getSingleIndividual, setUpdateRoleStatus } = adminSlice.actions;

export default adminSlice.reducer;
