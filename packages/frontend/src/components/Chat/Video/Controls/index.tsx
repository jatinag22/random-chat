import { Stack } from '@mui/material';
import './styles.css';
import VolumeControl from './VolumeControl';
import VisibilityControl from './VisibilityControl';

type ControlsType = {
  backgroundColor: string,
};

const Controls = ({ backgroundColor }: ControlsType) => (
  <div className="controls-root">
    <Stack direction="row" alignItems="center">
      <VisibilityControl />
      <VolumeControl backgroundColor={backgroundColor} />
    </Stack>

  </div>
);

export default Controls;
