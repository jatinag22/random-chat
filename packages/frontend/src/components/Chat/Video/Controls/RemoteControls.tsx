import { Stack } from '@mui/material';
import VolumeControl from './VolumeControl';
import VisibilityControl from './VisibilityControl';

type RemoteControlsType = {
  backgroundColor: string,
};

const RemoteControls = ({ backgroundColor }: RemoteControlsType) => (
  <div className="controls-root">
    <Stack direction="row" alignItems="center">
      <VisibilityControl />
      <VolumeControl backgroundColor={backgroundColor} />
    </Stack>
  </div>
);

export default RemoteControls;
