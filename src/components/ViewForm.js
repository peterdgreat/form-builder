import React, { useEffect, useState } from 'react';
import { fetchForms } from '../api';

const ViewForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const loadForms = async () => {
      try {
        const fetchedForms = await fetchForms();
        console.log("fetched",fetchedForms)
        setForms(fetchedForms);
        console.log("sett",forms)
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    loadForms();
  }, []);

  const renderFormField = (field) => {
    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
        return <input type={field.field_type} placeholder={field.label} disabled />;
      case 'checkbox':
      case 'radio':
        return (
          <label>
            <input type={field.field_type} disabled /> {field.label}
          </label>
        );
      case 'dropdown':
        return (
          <select disabled>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return <input type="date" disabled />;
      case 'textarea':
        return <textarea placeholder={field.label} disabled></textarea>;
      case 'file':
        return <input type="file" disabled />;
      default:
        return <div>Unknown Form Item</div>;
    }
  };

  return (
    <div>
      <h2>View Forms</h2>
      {forms.map((form) => (
        <div key={form.id} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ccc' }}>
          <h3>{form.title}</h3>
          {form.form_fields.map((field) => (
            <div key={field.id} style={{ marginBottom: '16px' }}>
              <label>{field.label}</label>
              {renderFormField(field)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ViewForms;