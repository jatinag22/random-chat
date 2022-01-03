import { Grid, useTheme } from '@mui/material';
import VideoPlayer from './VideoPlayer';

const VideoChat = () => {
  const theme = useTheme();
  const borderSx = {
    border: `4px solid ${theme.palette.primary.dark}`,
    borderRadius: '4px',
  };
  const backgroundSx = {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.main,
  };

  return (
    <div className="video-chat-root">
      <Grid container wrap="nowrap" className="grid-contanier">
        <Grid
          className="remote-video"
          sx={{ ...borderSx, ...backgroundSx }}
          item
          sm={8}
          container
          alignItems="center"
          justifyContent="center"
        >
          <VideoPlayer
            type="remote"
            videoProps={{
            // src: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
              src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
              playsInline: true,
              controls: false,
            }}
          />
        </Grid>
        <Grid className="right-section" container direction="column" wrap="nowrap" item sm={4} alignSelf="stretch">
          <Grid
            className="local-video"
            sx={{ ...borderSx, ...backgroundSx }}
            item
            sm={6}
            container
            alignItems="center"
            justifyContent="center"
          >
            <VideoPlayer
              type="local"
              videoProps={{
              // src: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
                src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
                playsInline: true,
                controls: false,
              }}
            />
          </Grid>
          <Grid item sm={6} sx={borderSx}>
            <div>Text Chat</div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoChat;
