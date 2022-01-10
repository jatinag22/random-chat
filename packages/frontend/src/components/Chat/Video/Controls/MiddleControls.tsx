import { Stack } from '@mui/material';
import { Theme, SxProps } from '@mui/system';
import ChangeTypeControl from './ChangeTypeControl';
import SkipNextControl from './SkipNextControl';
import SkipPreviousControl from './SkipPreviousControl';
import StopControl from './StopControl';

type MiddleControlsType = {
  sx?: SxProps<Theme> | undefined,
};

const MiddleControls = ({ sx }: MiddleControlsType) => (
  <Stack className="middle-controls" sx={sx} alignItems="center" justifyContent="center">
    <SkipNextControl placement="left" />
    <StopControl placement="left" />
    <SkipPreviousControl placement="left" />
    <ChangeTypeControl placement="left" />
  </Stack>
);

export default MiddleControls;
