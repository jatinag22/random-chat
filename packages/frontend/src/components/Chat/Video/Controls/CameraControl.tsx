import { Videocam, VideocamOff } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { toggleCamera } from '../../../../redux/reducers/actions';

const CameraControl = () => {
  const { camera } = useAppSelector((state) => state.localVideoChat);
  const dispatch = useAppDispatch();

  return (
    <Tooltip placement="bottom" title={camera.isOn ? 'Turn Off Camera' : 'Turn On Camera'}>
      <IconButton onClick={() => dispatch(toggleCamera())}>
        {camera.isOn ? <Videocam /> : <VideocamOff />}
      </IconButton>
    </Tooltip>
  );
};

export default CameraControl;
