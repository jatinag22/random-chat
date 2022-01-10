import { Stack } from '@mui/material';
import { Theme, SxProps } from '@mui/system';

type MiddleControlsType = {
  sx?: SxProps<Theme> | undefined,
};

const MiddleControls = ({ sx }: MiddleControlsType) => (
  <Stack className="middle-controls" sx={sx} alignItems="center">
    {'>'}
  </Stack>
);

export default MiddleControls;
