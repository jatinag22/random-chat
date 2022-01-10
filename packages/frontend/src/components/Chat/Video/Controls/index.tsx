import { Grid, useTheme } from '@mui/material';
import { Theme, SxProps } from '@mui/system';
import LocalControls from './LocalControls';
import MiddleControls from './MiddleControls';
import RemoteControls from './RemoteControls';
import './styles.css';

type ControlsType = {
  sx?: SxProps<Theme> | undefined,
};

const Controls = ({ sx }: ControlsType) => {
  const theme = useTheme();
  const backgroundSx = {
    backgroundColor: theme.palette.background.default,
  };

  return (
    <Grid className="controls-root" sx={{ ...sx, ...backgroundSx }} item container direction="column" wrap="nowrap">
      <Grid item xs={4}>
        <RemoteControls />
      </Grid>
      <Grid item xs={4}>
        <MiddleControls sx={{ ...sx }} />
      </Grid>
      <Grid item xs={4}>
        <LocalControls />
      </Grid>
    </Grid>
  );
};

export default Controls;
