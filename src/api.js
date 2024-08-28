import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./config";

export const API_URL = config.API_URL;

// User Registration
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      user: { email, password },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 422:
          throw new Error("Registration failed: Email already exists");
        case 409:
          throw new Error("Registration failed: Email already exists");
        default:
          throw new Error("Registration failed: Please try again later");
      }
    }
    throw new Error("Network error: Please check your internet connection");
  }
};

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => response, // If the response is successful, return it.
    (error) => {
      if (error.response && error.response.status === 401) {
        // Clear the token
        localStorage.removeItem("token");
        // Redirect to login page
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/sign_in`, {
      user: { email, password },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("Login failed: Invalid email or password");
        case 422:
          throw new Error("Login failed: Invalid data");
        default:
          throw new Error("Login failed: Please try again later");
      }
    }
    throw new Error("Network error: Please check your internet connection");
  }
};

const getAuthToken = () => localStorage.getItem("token");

export const fetchForms = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/forms`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Include the authorization token
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("Unauthorized: Please log in again");
        case 403:
          throw new Error("Forbidden: You don't have permission to access this resource");
        default:
          throw new Error("Failed to fetch forms: Please try again later");
      }
    }
    throw new Error("Network error: Please check your internet connection");
  }
};

export const useCreateForm = () => {
  const navigate = useNavigate();

  const createForm = async (formFields) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/form_fields`,
        { form_fields: formFields },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            localStorage.removeItem("token");
            navigate("/login", { state: { from: window.location.pathname } });
            throw new Error("Unauthorized: Please log in again");
          case 422:
            throw new Error("Invalid form data: Please check your inputs");
          default:
            throw new Error("Failed to create form: Please try again later");
        }
      }
      throw new Error("Network error: Please check your internet connection");
    }
  };

  return { createForm };
};

// export const deleteForm = () => {};

export const updateFormField = async (formId, formFieldId, formField) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_URL}/api/v1/forms/${formId}/form_fields/${formFieldId}`,
      { form_field: formField },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("Unauthorized: Please log in again");
        case 403:
          throw new Error("Forbidden: You don't have permission to update this form field");
        case 404:
          throw new Error("Form field not found");
        case 422:
          throw new Error("Invalid form field data: Please check your inputs");
        default:
          throw new Error("Failed to update form field: Please try again later");
      }
    }
    throw new Error("Network error: Please check your internet connection");
  }
};

export const deleteFormField = async (formId) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(
      `${API_URL}/api/v1/forms/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("Unauthorized: Please log in again");
        case 403:
          throw new Error("Forbidden: You don't have permission to delete this form");
        case 404:
          throw new Error("Form not found");
        default:
          throw new Error("Failed to delete form: Please try again later");
      }
    }
    throw new Error("Network error: Please check your internet connection");
  }
};

export const submitForm = async (slug, formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/forms/${slug}/submit`, {
      form_submission: { data: formData },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          throw new Error("Form not found");
        case 422:
          throw new Error("Invalid form data: Please check your inputs");
        default:
          throw new Error("Failed to submit form: Please try again later");
      }
    }
    throw new Error("Network error: Please check your internet connection");
  }
};

export default setupAxiosInterceptors;
