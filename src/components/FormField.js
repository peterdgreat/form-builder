import React, { useState } from 'react';

const FormField = ({ field, previewMode, onDelete, onUpdateLabel, onUpdatePlaceholder, onUpdateOptions }) => {
  const [newOption, setNewOption] = useState('');
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);
  const [editingOptionValue, setEditingOptionValue] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      onUpdateOptions([...field.options, newOption]);
      setNewOption('');
    }
  };

  const handleEditOption = (index) => {
    setEditingOptionIndex(index);
    setEditingOptionValue(field.options[index]);
  };

  const handleSaveEditedOption = () => {
    const updatedOptions = [...field.options];
    updatedOptions[editingOptionIndex] = editingOptionValue;
    onUpdateOptions(updatedOptions);
    setEditingOptionIndex(null);
    setEditingOptionValue('');
  };

  const renderInput = () => {
    switch (field.field_type) { // Use field_type instead of type
      case 'text':
      case 'email':
      case 'number':
      case 'password':
        return <input type={field.field_type} placeholder={field.placeholder} disabled={true} readOnly={true} />;
      case 'checkbox':
      case 'radio':
        return <input type={field.field_type} disabled={true} readOnly={true} />;
      case 'dropdown':
        return (
          <select>
            {field.options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return <input type="date" disabled={true} />;
      case 'textarea':
        return <textarea disabled={true} placeholder={field.placeholder} readOnly={true}></textarea>;
      case 'file':
        return <input type="file" disabled={true} />;
      default:
        return <div>Unknown Form Item</div>;
    }
  };

  return (
    <div style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: previewMode ? '#e9ecef' : '#ffffff' }}>
      <label>{field.label}</label>
      {renderInput()}
      {!previewMode && (
        <div>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdateLabel(e.target.value)}
            placeholder="Label"
            style={{ marginBottom: '8px', width: '100%' }}
          />
          {field.field_type === 'dropdown' && ( // Check for field_type instead of type
            <div>
              {field.options.map((option, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  {editingOptionIndex === index ? (
                    <input
                      type="text"
                      value={editingOptionValue}
                      onChange={(e) => setEditingOptionValue(e.target.value)}
                      style={{ marginRight: '8px', flexGrow: 1 }}
                    />
                  ) : (
                    <span style={{ flexGrow: 1 }}>{option}</span>
                  )}
                  {editingOptionIndex === index ? (
                    <button
                      onClick={handleSaveEditedOption}
                      style={{
                        marginLeft: '8px',
                        padding: '4px 8px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditOption(index)}
                      style={{
                        marginLeft: '8px',
                        padding: '4px 8px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add option"
                style={{ marginBottom: '8px', width: '100%' }}
              />
              <button
                onClick={handleAddOption}
                style={{
                  marginBottom: '8px',
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add Option
              </button>
            </div>
          )}
          <button
            onClick={onDelete}
            style={{
              marginTop: '8px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FormField;
