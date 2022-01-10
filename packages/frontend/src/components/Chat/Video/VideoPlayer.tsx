import { useTheme } from '@mui/material';
import Color from 'color';
import './styles.css';
import { useAppSelector } from '../../../redux/hooks';

type VideoPlayerPropsType = {
  type: 'remote' | 'local',
  videoProps: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
};

const VideoPlayer = ({ videoProps, type }: VideoPlayerPropsType) => {
  const theme = useTheme();
  const backgroundColor = Color(theme.palette.background.default).alpha(0.5).rgb().string();

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
        <div className="video-controls" />
      </div>
    </div>
  );
};

export default VideoPlayer;
