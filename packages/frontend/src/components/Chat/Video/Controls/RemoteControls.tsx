import { Stack } from '@mui/material';
import VolumeControl from './VolumeControl';
import VisibilityControl from './VisibilityControl';

const RemoteControls = () => (
  <Stack className="remote-controls" alignItems="center" justifyContent="end">
    <VisibilityControl placement="left" />
    <VolumeControl placement="left" />
  </Stack>
);

export default RemoteControls;
