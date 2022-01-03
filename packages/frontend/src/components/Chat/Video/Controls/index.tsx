import { Stack } from '@mui/material';
import './styles.css';
import VolumeControl from './VolumeControl';
import VisibilityControl from './VisibilityControl';
import CameraControl from './CameraControl';
import MicControl from './MicControl';

type ControlsType = {
  backgroundColor: string,
};

const Controls = ({ backgroundColor }: ControlsType) => (
  <div className="controls-root">
    <Stack direction="row" alignItems="center">
      <CameraControl />
      <MicControl />
      <VisibilityControl />
      <VolumeControl backgroundColor={backgroundColor} />
    </Stack>

  </div>
);

export default Controls;
