import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import Toolbox from './ToolBox';
import FormField from './FormField';
import { useNavigate } from 'react-router-dom';

import { createForm } from '../api';

const FormBuilder = () => {
  const [formItems, setFormItems] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate(); //
  const [, drop] = useDrop(() => ({
    accept: [
      'text', 'checkbox', 'radio', 'dropdown', 'date', 'textarea', 'email',
      'number', 'password', 'file'
    ],
    drop: (item) => {
      addItemToForm(item);
    },
  }));

  const viewCreatedForms = () => {
    navigate('/view-forms'); // Replace with your route for viewing forms
  };


  const addItemToForm = (item) => {
    const newItem = {
      id: uuidv4(),
      field_type: item.type, // Use field_type instead of type
      label: item.label,
      required: false,
      options: item.type === 'dropdown' ? ['Option 1', 'Option 2', 'Option 3'] : [],
      placeholder: item.type === 'text' ? 'Enter text here' : '',
    };
    setFormItems((prevItems) => [...prevItems, newItem]);
  };

  const saveForm = async () => {
    const payload = {
      form_fields: formItems.map(item => ({
        field_type: item.field_type,
        label: item.label,
        required: item.required,
        options: item.options
      }))
    };

    console.log('Payload:', payload);

    try {
      const response = await createForm(payload.form_fields);
      alert('Form and fields saved successfully!');
    } catch (error) {
      alert('Error saving form.');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Toolbox /> {/* Add Toolbox */}
      <div
        ref={drop}
        style={{
          padding: '16px',
          backgroundColor: '#f8f8f8',
          minHeight: '400px',
          border: '1px dashed #ccc',
          flexGrow: 1,
        }}
      >
       <div>
       <button
          onClick={() => setPreviewMode(!previewMode)}
          style={{
            marginBottom: '16px',
            padding: '8px 16px',
            backgroundColor: previewMode ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {previewMode ? 'Back to Edit' : 'Preview Form'}
        </button>
        <button
          onClick={viewCreatedForms}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          View Created Forms
        </button>

       </div>
        {previewMode && (
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={saveForm}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save Form
            </button>
          </div>
        )}
        <h3 style={{ marginBottom: '16px' }}>{previewMode ? 'Form Preview' : 'Form Builder'}</h3>
        {formItems.map((item, index) => (
          <FormField
            key={index}
            field={item}
            previewMode={previewMode}
            onDelete={() => setFormItems(formItems.filter(i => i.id !== item.id))}
            onUpdateLabel={(newLabel) => setFormItems(
              formItems.map(i => i.id === item.id ? { ...i, label: newLabel } : i)
            )}
            onUpdateOptions={(newOptions) => setFormItems(
              formItems.map(i => i.id === item.id ? { ...i, options: newOptions } : i)
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;
