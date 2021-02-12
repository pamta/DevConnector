import axios from "axios";
import { setAlert } from "./alert";
import {
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // token has user id, the token is set in App.js after checking local storage
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      // profile data
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        // http request status
        status: error.response.status,
      },
    });
  }
};

// Create or update
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post("/api/profile", formData, config);
    // To get the new version
    dispatch({
      type: GET_PROFILE,
      // new profile data
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Udated" : "Profile Created", "success"));
    // Redirect just if creating new profile
    if (!edit) {
      // Push a new page to navigation history to redirect
      history.push("/dashboard");
    }
  } catch (error) {
    // Display errors sent by the backend
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        // http request status
        status: error.response.status,
      },
    });
  }
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put("/api/profile/experience", formData, config);
    // To get the new version
    dispatch({
      type: UPDATE_PROFILE,
      // new profile data
      payload: res.data,
    });

    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (error) {
    // Display errors sent by the backend
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        // http request status
        status: error.response.status,
      },
    });
  }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put("/api/profile/education", formData, config);
    // To get the new version
    dispatch({
      type: UPDATE_PROFILE,
      // new profile data
      payload: res.data,
    });

    dispatch(setAlert("Education added", "success"));
    history.push("/dashboard");
  } catch (error) {
    // Display errors sent by the backend
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        // http request status
        status: error.response.status,
      },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        // http request status
        status: error.response.status,
      },
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        // http request status
        status: error.response.status,
      },
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    try {
      const res = await axios.delete("/api/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          // http request status
          status: error.response.status,
        },
      });
    }
  }
};
