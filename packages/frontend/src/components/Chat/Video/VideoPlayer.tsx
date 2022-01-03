import { useTheme } from '@mui/material';
import Color from 'color';
import Controls from './Controls';
import './styles.css';
import { useAppSelector } from '../../../redux/hooks';

type VideoPlayerPropsType = {
  type: 'remote' | 'local',
  videoProps: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
};

const VideoPlayer = ({ videoProps, type }: VideoPlayerPropsType) => {
  const theme = useTheme();
  const backgroundColor = Color(theme.palette.common.white)
    .alpha(theme.palette.mode === 'dark' ? 0.25 : 0.5).rgb()
    .string();

  const { volume } = useAppSelector((state) => state.remoteVideoChat);

  return (
    <div className="video-player-root">
      <div className="video-main">
        {/* eslint-disable jsx-a11y/media-has-caption */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <video {...videoProps} />
      </div>
      <div
        className={`video-top${volume.isHovering && type === 'remote' ? ' right-hover' : ''}`}
        style={{ backgroundColor }}
      >
        <div className="video-controls">
          <Controls type={type} backgroundColor={backgroundColor} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
