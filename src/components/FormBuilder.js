import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Toolbox from "./ToolBox";
import FormField from "./FormField";
import { useNavigate } from "react-router-dom";
import { useCreateForm } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCopy,
  faSave,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const FormBuilder = () => {
  const [formItems, setFormItems] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const { createForm } = useCreateForm();

  const navigate = useNavigate();
  const [, drop] = useDrop(() => ({
    accept: [
      "text",
      "checkbox",
      "radio",
      "dropdown",
      "date",
      "textarea",
      "email",
      "number",
      "password",
      "file",
    ],
    drop: (item) => {
      addItemToForm(item);
    },
  }));

  const viewCreatedForms = () => {
    navigate("/view-forms");
  };

  const generateHtmlString = () => {
    return formItems
      .map((item) => {
        switch (item.field_type) {
          case "text":
          case "email":
          case "number":
          case "password":
            return `<input type="${item.field_type}" placeholder="${item.label}" disabled />`;
          case "checkbox":
          case "radio":
            return `<label><input type="${item.field_type}" disabled /> ${item.label}</label>`;
          case "dropdown":
            return `<select disabled>${item.options
              .map((option) => `<option>${option}</option>`)
              .join("")}</select>`;
          case "date":
            return `<input type="date" disabled />`;
          case "textarea":
            return `<textarea placeholder="${item.label}" disabled></textarea>`;
          case "file":
            return `<input type="file" disabled />`;
          default:
            return `<div>Unknown field type</div>`;
        }
      })
      .join("");
  };

  const handleCopyHtml = () => {
    const htmlString = generateHtmlString();
    navigator.clipboard.writeText(htmlString).then(() => {
      alert("HTML copied to clipboard!");
    });
  };

  const addItemToForm = (item) => {
    const newItem = {
      id: uuidv4(),
      field_type: item.type,
      label: item.label,
      required: false,
      options:
        item.type === "dropdown" ? ["Option 1", "Option 2", "Option 3"] : [],
      placeholder: item.type === "text" ? "Enter text here" : "",
    };
    setFormItems((prevItems) => [...prevItems, newItem]);
  };

  const saveForm = async () => {
    const payload = {
      form_fields: formItems.map((item) => ({
        field_type: item.field_type,
        label: item.label,
        required: item.required,
        options: item.options,
      })),
    };

    try {
      await createForm(payload.form_fields);
      alert("Form and fields saved successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#2b2e4a",
        minHeight: "100vh",
      }}
    >
      <Toolbox /> {/* Add Toolbox */}
      <div
        ref={drop}
        style={{
          padding: "16px",
          backgroundColor: "#3f4165",
          minHeight: "400px",
          border: "1px dashed #ccc",
          flexGrow: 1,
          margin: "16px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            color: "#fff",
          }}
        >
          <h3>{previewMode ? "Form Preview" : "Form Builder"}</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setPreviewMode(!previewMode)}
              style={{
                marginRight: "8px",
                padding: "8px 16px",
                backgroundColor: previewMode ? "#6c757d" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "8px" }} />
              {previewMode ? "Back to Edit" : "Preview Form"}
            </button>
            <button
              onClick={viewCreatedForms}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                style={{ marginRight: "8px" }}
              />
              View Created Forms
            </button>
            {previewMode && (
              <>
                <button
                  onClick={saveForm}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "8px" }}
                  />
                  Save Form
                </button>
                <button
                  onClick={handleCopyHtml}
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
                    icon={faCopy}
                    style={{ marginRight: "8px" }}
                  />
                  Copy as HTML
                </button>
              </>
            )}
          </div>
        </div>
        {formItems.map((item, index) => (
          <FormField
            key={index}
            field={item}
            previewMode={previewMode}
            onDelete={() =>
              setFormItems(formItems.filter((i) => i.id !== item.id))
            }
            onUpdateLabel={(newLabel) =>
              setFormItems(
                formItems.map((i) =>
                  i.id === item.id ? { ...i, label: newLabel } : i
                )
              )
            }
            onUpdatePlaceholder={(newPlaceholder) =>
              setFormItems(
                formItems.map((i) =>
                  i.id === item.id ? { ...i, placeholder: newPlaceholder } : i
                )
              )
            }
            onUpdateOptions={(newOptions) =>
              setFormItems(
                formItems.map((i) =>
                  i.id === item.id ? { ...i, options: newOptions } : i
                )
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;
