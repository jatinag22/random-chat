import { useTheme } from '@mui/material';
import Color from 'color';
// import Controls from './Controls';
import './styles.css';

type VideoPlayerPropsType = {
  videoProps: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
};

const VideoPlayer = ({ videoProps }: VideoPlayerPropsType) => {
  const theme = useTheme();
  const backgroundColor = Color(theme.palette.background.default).alpha(0.5).rgb().string();

  return (
    <div className="video-player-root">
      <div className="video-main">
        {/* eslint-disable jsx-a11y/media-has-caption */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <video {...videoProps} />
      </div>
      {/* <div className="video-bottom" style={{ backgroundColor }}>
        <div className="video-controls">
          <Controls />
        </div>
      </div> */}
    </div>
  );
};

export default VideoPlayer;