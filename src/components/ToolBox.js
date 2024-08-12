import React from 'react';
import { useDrag } from 'react-dnd';

const ToolboxItem = ({ itemType, label }) => {
  const [, drag] = useDrag(() => ({
    type: itemType,
    item: { type: itemType, label },
  }));

  return (
    <div ref={drag} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '4px' }}>
      {label}
    </div>
  );
};

const Toolbox = () => {
  const items = [
    { type: 'text', label: 'Text Field' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'radio', label: 'Radio Button' },
    { type: 'dropdown', label: 'Dropdown' },
    { type: 'date', label: 'Date Picker' },
    { type: 'textarea', label: 'Text Area' },
    { type: 'email', label: 'Email Field' },
    { type: 'number', label: 'Number Field' },
    { type: 'password', label: 'Password Field' },
    { type: 'file', label: 'File Upload' },
  ];

  return (
    <div style={{ width: '200px', padding: '16px', borderRight: '1px solid #ccc' }}>
      <h3>Toolbox</h3>
      {items.map((item) => (
        <ToolboxItem key={item.type} itemType={item.type} label={item.label} />
      ))}
    </div>
  );
};

export default Toolbox;