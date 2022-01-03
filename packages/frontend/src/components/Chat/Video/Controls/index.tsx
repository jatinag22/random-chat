import { RefObject } from 'react';
import { Stack } from '@mui/material';
import './styles.css';
import VolumeControl from './VolumeControl';
import VisibilityControl from './VisibilityControl';

type ControlsType = {
  backgroundColor: string,
  videoTopRef: RefObject<HTMLDivElement>,
};

const Controls = ({ backgroundColor, videoTopRef }: ControlsType) => (
  <div className="controls-root">
    <Stack direction="row" alignItems="center">
      <VisibilityControl />
      <VolumeControl backgroundColor={backgroundColor} videoTopRef={videoTopRef} />
    </Stack>

  </div>
);

export default Controls;
