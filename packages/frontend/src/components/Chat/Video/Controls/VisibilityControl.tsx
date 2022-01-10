import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { toggleVisibility } from '../../../../redux/reducers/actions';
import { TooltipPlacementType } from '../../../common/types';

type VisibilityControlType = {
  placement?: TooltipPlacementType,
};

const VisibilityControl = ({ placement }: VisibilityControlType) => {
  const { visibility } = useAppSelector((state) => state.remoteVideoChat);
  const dispatch = useAppDispatch();

  return (
    <Tooltip placement={placement} title={visibility.isVisible ? 'Hide Video' : 'Show Video'}>
      <IconButton onClick={() => dispatch(toggleVisibility())}>
        {visibility.isVisible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Tooltip>
  );
};

export default VisibilityControl;
