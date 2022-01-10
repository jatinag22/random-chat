import { Mic, MicOff } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { toggleMic } from '../../../../redux/reducers/actions';
import { TooltipPlacementType } from '../../../common/types';

type MicControlType = {
  placement?: TooltipPlacementType,
};

const MicControl = ({ placement }: MicControlType) => {
  const { mic } = useAppSelector((state) => state.localVideoChat);
  const dispatch = useAppDispatch();

  return (
    <Tooltip placement={placement} title={mic.isOn ? 'Turn Off Mic' : 'Turn On Mic'}>
      <IconButton onClick={() => dispatch(toggleMic())}>
        {mic.isOn ? <Mic /> : <MicOff />}
      </IconButton>
    </Tooltip>
  );
};

export default MicControl;
