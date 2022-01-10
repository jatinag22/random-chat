import { SkipNext } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { TooltipPlacementType } from '../../../common/types';

type SkipNextControlType = {
  placement?: TooltipPlacementType,
};

const SkipNextControl = ({ placement }: SkipNextControlType) => (
  <Tooltip placement={placement} title="Skip Next">
    <IconButton>
      <SkipNext />
    </IconButton>
  </Tooltip>
);

export default SkipNextControl;
