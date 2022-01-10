import { Stack } from '@mui/material';
import CameraControl from './CameraControl';
import MicControl from './MicControl';

const LocalControls = () => (
  <Stack alignItems="center">
    <CameraControl placement="right" />
    <MicControl placement="right" />
  </Stack>
);

export default LocalControls;
