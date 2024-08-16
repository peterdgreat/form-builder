import React from 'react';

const FormField = ({ field, previewMode, onDelete, onUpdateLabel, onUpdateOptions }) => {
  const renderInput = () => {
    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
        return <input type={field.field_type} disabled />;
      case 'checkbox':
      case 'radio':
        return <input type={field.field_type} disabled />;
      case 'dropdown':
        return (
          <select disabled>
            {field.options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return <input type="date" disabled />;
      case 'textarea':
        return <textarea disabled></textarea>;
      case 'file':
        return <input type="file" disabled />;
      default:
        return <div>Unknown Form Item</div>;
    }
  };

  return (
    <div style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ccc' }}>
      <div>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdateLabel(e.target.value)}
          placeholder="Label"
          style={{ marginBottom: '8px', width: '100%' }}
        />
      </div>
      {field.field_type === 'dropdown' && (
        <div>
          <input
            type="text"
            value={field.options.join(',')}
            onChange={(e) => onUpdateOptions(e.target.value.split(','))}
            placeholder="Comma-separated options"
            style={{ marginBottom: '8px', width: '100%' }}
          />
        </div>
      )}
      {renderInput()}
      {!previewMode && (
        <button onClick={onDelete} style={{ marginTop: '8px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px', borderRadius: '4px' }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default FormField;
