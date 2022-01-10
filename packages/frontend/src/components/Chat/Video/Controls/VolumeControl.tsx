import { useEffect } from 'react';
import { VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material';
import { IconButton, Slider, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setVolume, toggleMute } from '../../../../redux/reducers/actions';
import { TooltipPlacementType } from '../../../common/types';

type VolumeControlType = {
  placement?: TooltipPlacementType,
};

const VolumeControl = ({ placement }: VolumeControlType) => {
  const { volume } = useAppSelector((state) => state.remoteVideoChat);
  const dispatch = useAppDispatch();

  const setIsHovering = (value: boolean) => {
    dispatch(setVolume({ isHovering: value }));
  };

  const volumeSliderOnChange = (event: Event, value: number) => {
    const isMute = value === 0;

    dispatch(setVolume({
      level: value,
      isMute,
    }));

    localStorage.setItem('remoteVideo.volume.level', value.toString());
    localStorage.setItem('remoteVideo.volume.isMute', isMute.toString());
  };

  const getVolumeIcon = () => {
    if (volume.isMute) {
      return <VolumeOff />;
    }
    if (volume.level > 50) {
      return <VolumeUp />;
    }
    if (volume.level > 0) {
      return <VolumeDown />;
    }
    return <VolumeOff />;
  };

  useEffect(() => {
    if (!volume.isMute && volume.level === 0) {
      dispatch(setVolume({ level: 100 }));
    }
  }, [volume.isMute]);

  return (
    <>
      <Tooltip placement={placement} title={volume.isMute ? 'Unmute' : 'Mute'}>
        <IconButton
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => dispatch(toggleMute())}
        >
          {getVolumeIcon()}
        </IconButton>
      </Tooltip>
      <div
        className="volume-slider"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Slider
          aria-label="Volume"
          sx={{ height: '100px' }}
          orientation="vertical"
          value={volume.isMute ? 0 : volume.level}
          onChange={(event, value) => volumeSliderOnChange(event, value as number)}
        />
      </div>
    </>
  );
};

export default VolumeControl;
