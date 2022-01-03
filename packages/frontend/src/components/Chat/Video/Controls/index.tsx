import { RefObject } from 'react';
import { Visibility } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import './styles.css';
import VolumeControl from './VolumeControl';

type ControlsType = {
  backgroundColor: string,
  videoTopRef: RefObject<HTMLDivElement>,
};

const Controls = ({ backgroundColor, videoTopRef }: ControlsType) => (
  <div className="controls-root">
    <Stack direction="row" alignItems="center">
      <IconButton>
        <Visibility />
      </IconButton>
      <VolumeControl backgroundColor={backgroundColor} videoTopRef={videoTopRef} />
    </Stack>

  </div>
);

export default Controls;
