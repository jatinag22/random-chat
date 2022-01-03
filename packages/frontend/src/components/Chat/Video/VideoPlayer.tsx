import { useTheme } from '@mui/material';
import Color from 'color';
import { useRef } from 'react';
import Controls from './Controls';
import './styles.css';

type VideoPlayerPropsType = {
  videoProps: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
};

const VideoPlayer = ({ videoProps }: VideoPlayerPropsType) => {
  const theme = useTheme();
  const backgroundColor = Color(theme.palette.common.white)
    .alpha(theme.palette.mode === 'dark' ? 0.25 : 0.5).rgb()
    .string();

  const videoTopRef = useRef<HTMLDivElement>(null);

  return (
    <div className="video-player-root">
      <div className="video-main">
        {/* eslint-disable jsx-a11y/media-has-caption */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <video {...videoProps} />
      </div>
      <div ref={videoTopRef} className="video-top" style={{ backgroundColor }}>
        <div className="video-controls">
          <Controls backgroundColor={backgroundColor} videoTopRef={videoTopRef} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
