import { Stop } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { TooltipPlacementType } from '../../../common/types';

type StopControlType = {
  placement?: TooltipPlacementType,
};

const StopControl = ({ placement }: StopControlType) => (
  <Tooltip placement={placement} title="Stop">
    <IconButton>
      <Stop />
    </IconButton>
  </Tooltip>
);

export default StopControl;
