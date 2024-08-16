import React, { useEffect, useState } from 'react';
import { fetchForms, API_URL } from '../api';

const ViewForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const loadForms = async () => {
      try {
        const fetchedForms = await fetchForms();
       
        setForms(fetchedForms);
      
      } catch (error) {
        // console.error('Error fetching forms:', error);
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
  const generateEmbedCode = (slug) => {
    const embedUrl = `${API_URL}/api/v1/forms/${slug}`;
    return `<iframe src="${embedUrl}" width="100%" height="500px" frameborder="0"></iframe>`;
  };

  const handleShareClick = (slug) => {
    const embedCode = generateEmbedCode(slug);
    navigator.clipboard.writeText(embedCode);
    alert('Embed code copied to clipboard!');
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
          <button onClick={() => handleShareClick(form.slug)}>Share/Embed</button>
        </div>
      ))}
    </div>
  );

};

export default ViewForms;