import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const API_URL = 'http://localhost:3001';

// User Registration
export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users`, {
    user: { email, password }
  });
  return response.data;
};



export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/sign_in`, {
      user: { email, password }
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const getAuthToken = () => localStorage.getItem('token'); 

export const fetchForms = async () => {
  const response = await axios.get(`${API_URL}/api/v1/forms`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Include the authorization token
      },
    }
  );
  return response.data;
};




// export const createForm = async (formFields) => {
//   console.log(getAuthToken())
//   const response = await axios.post(`${API_URL}/api/v1/form_fields`, { form_fields: formFields }, {
//     headers: {
//       Authorization: `Bearer ${getAuthToken()}`
//     }
//   });
//   return response.data;
// };
export const useCreateForm = () => {
  const navigate = useNavigate();

  const createForm = async (formFields) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${API_URL}/api/v1/form_fields`, { form_fields: formFields }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login', { state: { from: window.location.pathname } });
      } else {
        throw error;
      }
    }
  };

  return { createForm };
};




export const updateFormField = async (formId, formFieldId, formField) => {
  const response = await axios.put(`${API_URL}/api/v1/forms/${formId}/form_fields/${formFieldId}`, { form_field: formField });
  return response.data;
};

export const deleteFormField = async (formId, formFieldId) => {
  await axios.delete(`${API_URL}/api/v1/forms/${formId}/form_fields/${formFieldId}`);
};

export const submitForm = async (slug, formData) => {
  const response = await axios.post(`${API_URL}/api/v1/forms/${slug}/submit`, { form_submission: { data: formData } });
  return response.data;
};