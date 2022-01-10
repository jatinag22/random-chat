import { Stack } from '@mui/material';
import VolumeControl from './VolumeControl';
import VisibilityControl from './VisibilityControl';

const RemoteControls = () => (
  <Stack alignItems="center">
    <VisibilityControl placement="left" />
    <VolumeControl />
  </Stack>
);

export default RemoteControls;
