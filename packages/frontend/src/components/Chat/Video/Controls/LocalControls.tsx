import { Stack } from '@mui/material';
import CameraControl from './CameraControl';
import MicControl from './MicControl';

const LocalControls = () => (
  <div className="controls-root">
    <Stack direction="row" alignItems="center">
      <CameraControl />
      <MicControl />
    </Stack>
  </div>
);

export default LocalControls;
