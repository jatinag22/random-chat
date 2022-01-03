import { useEffect } from 'react';
import { VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material';
import { IconButton, Slider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setVolume, toggleMute } from '../../../../redux/reducers/actions';

type VolumeControlType = {
  backgroundColor: string,
};

const VolumeControl = ({ backgroundColor }: VolumeControlType) => {
  const { volume } = useAppSelector((state) => state.remoteVideoChat);
  const dispatch = useAppDispatch();

  const setIsHovering = (value: boolean) => {
    dispatch(setVolume({ isHovering: value }));
  };

  const volumeSliderOnChange = (event: Event, value: number | number[]) => {
    dispatch(setVolume({
      level: value,
      isMute: value === 0,
    }));
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
      <IconButton
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => dispatch(toggleMute())}
      >
        {getVolumeIcon()}
      </IconButton>
      <div
        className={`volume-slider${!volume.isHovering ? ' hidden' : ''}`}
        style={{ backgroundColor }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Slider
          aria-label="Volume"
          sx={{ height: '100px' }}
          orientation="vertical"
          value={volume.isMute ? 0 : volume.level}
          onChange={volumeSliderOnChange}
        />
      </div>
    </>
  );
};

export default VolumeControl;
