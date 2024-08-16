import React from 'react';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFont,
  faCheckSquare,
  faDotCircle,
  faCaretSquareDown,
  faCalendarAlt,
  faAlignLeft,
  faEnvelope,
  faHashtag,
  faKey,
  faUpload
} from '@fortawesome/free-solid-svg-icons';

const ToolboxItem = ({ itemType, label, icon }) => {
  const [, drag] = useDrag(() => ({
    type: itemType,
    item: { type: itemType, label },
  }));

  return (
    <div ref={drag} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: '8px' }} />
      {label}
    </div>
  );
};

const Toolbox = () => {
  const items = [
    { type: 'text', label: 'Text Field', icon: faFont },
    { type: 'checkbox', label: 'Checkbox', icon: faCheckSquare },
    { type: 'radio', label: 'Radio Button', icon: faDotCircle },
    { type: 'dropdown', label: 'Dropdown', icon: faCaretSquareDown },
    { type: 'date', label: 'Date Picker', icon: faCalendarAlt },
    { type: 'textarea', label: 'Text Area', icon: faAlignLeft },
    { type: 'email', label: 'Email Field', icon: faEnvelope },
    { type: 'number', label: 'Number Field', icon: faHashtag },
    { type: 'password', label: 'Password Field', icon: faKey },
    { type: 'file', label: 'File Upload', icon: faUpload },
  ];

  return (
    <div style={{ width: '200px', padding: '16px', borderRight: '1px solid #ccc' , color: '#fff'}}>
      <h3>Toolbox</h3>
      {items.map((item) => (
        <ToolboxItem key={item.type} itemType={item.type} label={item.label} icon={item.icon} />
      ))}
    </div>
  );
};

export default Toolbox;
