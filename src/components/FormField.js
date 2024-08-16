import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const FormField = ({ field, previewMode, onDelete, onUpdateLabel, onUpdatePlaceholder, onUpdateOptions }) => {
  const [newOption, setNewOption] = useState('');
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);
  const [editingOptionValue, setEditingOptionValue] = useState('');
  const [showDetails, setShowDetails] = useState(false);

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
    switch (field.field_type) {
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
          <select disabled={true}>
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
      <div className="form-field-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontWeight: 'bold' }}>{field.label}</label>
        {!previewMode && (
          <div className="form-field-actions">
            <button onClick={() => setShowDetails(!showDetails)} style={{ marginRight: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faEdit} style={{ color: '#007bff' }} />
            </button>
            <button onClick={onDelete} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faTrash} style={{ color: '#dc3545' }} />
            </button>
          </div>
        )}
      </div>
      {renderInput()}
      {!previewMode && showDetails && (
        <div className="form-field-details" style={{ marginTop: '16px' }}>
          <label>Label</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdateLabel(e.target.value)}
            placeholder="Label"
            style={{ marginBottom: '8px', width: '100%' }}
          />
          <label>Placeholder</label>
          <input
            type="text"
            value={field.placeholder}
            onChange={(e) => onUpdatePlaceholder(e.target.value)}
            placeholder="Placeholder"
            style={{ marginBottom: '8px', width: '100%' }}
          />
          {field.field_type === 'dropdown' && (
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
                      <FontAwesomeIcon icon={faSave} />
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
                      <FontAwesomeIcon icon={faEdit} />
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
        </div>
      )}
    </div>
  );
};

export default FormField;
