import React, { useEffect, useState } from "react";
import { fetchForms, API_URL } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFormField } from "../api";
const ViewForms = () => {
  const [forms, setForms] = useState([]);
  const handleDeleteClick = async (id) => {
    try {
      await deleteFormField(id);

      setForms(forms.filter((form) => form.id !== id));
      alert("Form deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    const loadForms = async () => {
      try {
        const fetchedForms = await fetchForms();
        setForms(fetchedForms);
      } catch (error) {
        alert(error.message);
      }
    };

    loadForms();
  }, []);

  const renderFormField = (field) => {
    const commonStyles = {
      width: "100%",
      padding: "8px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      color: "#495057",
    };

    switch (field.field_type) {
      case "text":
      case "email":
      case "number":
      case "password":
        return (
          <input
            type={field.field_type}
            placeholder={field.label}
            disabled
            style={commonStyles}
          />
        );
      case "checkbox":
      case "radio":
        return (
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              color: "#495057",
            }}
          >
            <input
              type={field.field_type}
              disabled
              style={{ marginRight: "8px" }}
            />{" "}
            {field.label}
          </label>
        );
      case "dropdown":
        return (
          <select disabled style={commonStyles}>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "date":
        return <input type="date" disabled style={commonStyles} />;
      case "textarea":
        return (
          <textarea
            placeholder={field.label}
            disabled
            style={{ ...commonStyles, height: "100px" }}
          ></textarea>
        );
      case "file":
        return <input type="file" disabled style={commonStyles} />;
      default:
        return <div>Unknown Form Item</div>;
    }
  };

  const generateEmbedCode = (slug) => {
    const embedUrl = `${API_URL}/api/v1/forms/${slug}`;
    return `<iframe src="${embedUrl}" width="100%" height="500px" frameborder="0"></iframe>`;
  };

  const handleShareClick = (slug) => {
    const embedCode = generateEmbedCode(slug);
    navigator.clipboard.writeText(embedCode);
    alert("Embed code copied to clipboard!");
  };

  const generateHtmlString = (formFields) => {
    return formFields
      .map((field) => {
        switch (field.field_type) {
          case "text":
          case "email":
          case "number":
          case "password":
            return `<input type="${field.field_type}" placeholder="${field.label}" disabled />`;
          case "checkbox":
          case "radio":
            return `<label><input type="${field.field_type}" disabled /> ${field.label}</label>`;
          case "dropdown":
            return `<select disabled>${field.options
              .map((option) => `<option>${option}</option>`)
              .join("")}</select>`;
          case "date":
            return `<input type="date" disabled />`;
          case "textarea":
            return `<textarea placeholder="${field.label}" disabled></textarea>`;
          case "file":
            return `<input type="file" disabled />`;
          default:
            return `<div>Unknown field type</div>`;
        }
      })
      .join("");
  };

  const handleCopyHtml = (formFields) => {
    const htmlString = generateHtmlString(formFields);
    navigator.clipboard.writeText(htmlString).then(() => {
      alert("HTML copied to clipboard!");
    });
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "rgb(43, 46, 74)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#fff" }}>
        View Forms
      </h2>
      {forms.map((form) => (
        <div
          key={form.id}
          style={{
            marginBottom: "24px",
            padding: "16px",
            border: "1px solid #007bff",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ display: "flex" }}>
            <h3 style={{ marginBottom: "16px", color: "#007bff" }}>
              {form.title}
            </h3>
          </div>

          {form.form_fields.map((field) => (
            <div key={field.id} style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  color: "#495057",
                }}
              >
                {field.label}
              </label>
              {renderFormField(field)}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <div style={{ display: "flex" }}>
              <button
                onClick={() => handleShareClick(form.slug)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faShareAlt}
                  style={{ marginRight: "8px" }}
                />{" "}
                Share/Embed
              </button>
              <button
                onClick={() => handleDeleteClick(form.id)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <button
              onClick={() => handleCopyHtml(form.form_fields)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faCopy} style={{ marginRight: "8px" }} />{" "}
              Copy as HTML
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewForms;
