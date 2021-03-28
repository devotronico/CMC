import React, { useState, useEffect } from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const defaultValue = -1;
export default function FilterToggle({ filters, setFilters }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = name => (e, newValue) => {
    console.log('newValue', newValue);
    setValue(newValue);
    setFilters({ ...filters, [name]: newValue });
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setValue(defaultValue);
    }
  }, [filters]);

  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive
      onChange={handleChange('isAuthenticated')}
    >
      <ToggleButton key={1} value={1}>
        ONLINE
      </ToggleButton>
      <ToggleButton key={2} value={defaultValue}>
        TUTTI
      </ToggleButton>
      <ToggleButton key={3} value={0}>
        OFFLINE
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
