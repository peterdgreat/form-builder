// src/components/FormPreview.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const FormPreview = ({ formFields }) => {
  return (
    <Droppable droppableId="form">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            minHeight: '400px',
            padding: '16px',
            background: '#e2e2e2',
            margin: '16px 0'
          }}
        >
          {formFields.map((field, index) => (
            <div
              key={field.id}
              style={{
                userSelect: 'none',
                padding: '16px',
                margin: '0 0 8px 0',
                background: '#f4f4f4'
              }}
            >
              {field.label}
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FormPreview;