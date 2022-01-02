import { useState } from 'react';
import { VolumeUp } from '@mui/icons-material';
import { IconButton, Slider } from '@mui/material';

type VolumeControlType = {
  backgroundColor: string,
};

const VolumeControl = ({ backgroundColor }: VolumeControlType) => {
  const [volumeLevel, setVolumeLevel] = useState<number | number[]>(100);

  const volumeSliderOnChange = (event: Event, value: number | number[]) => {
    setVolumeLevel(value);
  };

  return (
    <>
      <IconButton>
        <VolumeUp />
      </IconButton>
      <div className="volume-slider" style={{ backgroundColor }}>
        <Slider
          aria-label="Volume"
          sx={{ height: '100px' }}
          orientation="vertical"
          value={volumeLevel}
          onChange={volumeSliderOnChange}
        />
      </div>
    </>
  );
};

export default VolumeControl;
