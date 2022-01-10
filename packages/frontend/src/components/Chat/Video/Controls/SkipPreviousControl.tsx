import { SkipPrevious } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { TooltipPlacementType } from '../../../common/types';

type SkipPreviousControlType = {
  placement?: TooltipPlacementType,
};

const SkipPreviousControl = ({ placement }: SkipPreviousControlType) => (
  <Tooltip placement={placement} title="Skip Previous">
    <IconButton>
      <SkipPrevious />
    </IconButton>
  </Tooltip>
);

export default SkipPreviousControl;
