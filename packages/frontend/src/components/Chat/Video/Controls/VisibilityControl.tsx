import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

const VisibilityControl = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <IconButton onClick={() => setIsVisible((current) => !current)}>
      {isVisible ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
};

export default VisibilityControl;
