import { Visibility } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import './styles.css';
import VolumeControl from './VolumeControl';

type ControlsType = {
  backgroundColor: string,
};

const Controls = ({ backgroundColor }: ControlsType) => (
  <div className="controls-root">
    <Stack direction="row" alignItems="center">
      <IconButton>
        <Visibility />
      </IconButton>
      <VolumeControl backgroundColor={backgroundColor} />
    </Stack>

  </div>
);

export default Controls;
