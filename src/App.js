import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Register from "./Register";
import Login from "./Login";
import FormBuilder from "./components/FormBuilder";
import ViewForms from "./components/ViewForm";
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';  // Redirect to login page
        }
        return Promise.reject(error);
      }
    );
  }, [token]);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          {token ? (
            <>
              <Route path="/form-builder" element={<FormBuilder />} />
              <Route path="/" element={<Navigate to="/form-builder" />} />
              <Route path="/view-forms" element={<ViewForms />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/" element={<Navigate to="/register" />} />
            </>
          )}
        </Routes>
      </DndProvider>
    </Router>
  );
}

export default App;
