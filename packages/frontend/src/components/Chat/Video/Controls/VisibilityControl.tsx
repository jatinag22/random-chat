import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { toggleVisibility } from '../../../../redux/reducers/actions';

const VisibilityControl = () => {
  const { visibility } = useAppSelector((state) => state.remoteVideoChat);
  const dispatch = useAppDispatch();

  return (
    <Tooltip placement="bottom" title={visibility.isVisible ? 'Hide Video' : 'Show Video'}>
      <IconButton onClick={() => dispatch(toggleVisibility())}>
        {visibility.isVisible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Tooltip>
  );
};

export default VisibilityControl;
