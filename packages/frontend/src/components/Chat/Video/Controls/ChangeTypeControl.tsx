import { ChangeCircle } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { TooltipPlacementType } from '../../../common/types';

type ChangeTypeControlType = {
  placement?: TooltipPlacementType,
};

const ChangeTypeControl = ({ placement }: ChangeTypeControlType) => (
  <Tooltip placement={placement} title="Change Chat Type">
    <IconButton>
      <ChangeCircle />
    </IconButton>
  </Tooltip>
);

export default ChangeTypeControl;
