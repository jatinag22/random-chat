import {
  RefObject, useLayoutEffect, useEffect, useState,
} from 'react';
import { VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material';
import { IconButton, Slider } from '@mui/material';

type VolumeControlType = {
  backgroundColor: string,
  videoTopRef: RefObject<HTMLDivElement>,
};

const VolumeControl = ({ backgroundColor, videoTopRef }: VolumeControlType) => {
  const [volumeLevel, setVolumeLevel] = useState<number | number[]>(100);
  const [isHovering, setIsHovering] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const volumeSliderOnChange = (event: Event, value: number | number[]) => {
    setVolumeLevel(value);

    if (value === 0) {
      setIsMute(true);
    } else {
      setIsMute(false);
    }
  };

  const getVolumeIcon = () => {
    if (isMute) {
      return <VolumeOff />;
    }
    if (volumeLevel > 50) {
      return <VolumeUp />;
    }
    if (volumeLevel > 0) {
      return <VolumeDown />;
    }
    return <VolumeOff />;
  };

  useLayoutEffect(() => {
    if (videoTopRef.current) {
      if (isHovering) {
        // eslint-disable-next-line no-param-reassign
        videoTopRef.current.style.borderBottomRightRadius = '0';
      } else {
        // eslint-disable-next-line no-param-reassign
        videoTopRef.current.style.borderBottomRightRadius = '24px';
      }
    }
  }, [isHovering]);

  useEffect(() => {
    if (!isMute && volumeLevel === 0) {
      setVolumeLevel(100);
    }
  }, [isMute]);

  return (
    <>
      <IconButton
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsMute((current) => !current)}
      >
        {getVolumeIcon()}
      </IconButton>
      <div
        className={`volume-slider${!isHovering ? ' hidden' : ''}`}
        style={{ backgroundColor }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Slider
          aria-label="Volume"
          sx={{ height: '100px' }}
          orientation="vertical"
          value={isMute ? 0 : volumeLevel}
          onChange={volumeSliderOnChange}
        />
      </div>
    </>
  );
};

export default VolumeControl;
