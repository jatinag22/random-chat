import { Grid, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLocalMedia } from '../../../redux/reducers/chat';
import { getUserMedia, stopVideoStreamTracks } from '../../../utils';
import Controls from './Controls';
import VideoPlayer from './VideoPlayer';

const VideoChat = () => {
  const theme = useTheme();
  const borderSx = {
    borderColor: theme.palette.primary.dark,
  };
  const backgroundSx = {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.main,
  };

  const { visibility } = useAppSelector((state) => state.remoteVideoChat);
  const { media: localMedia, camera } = useAppSelector((state) => state.localVideoChat);

  const dispatch = useAppDispatch();

  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (camera.isOn) {
      getUserMedia({ audio: true, video: true })
        .then((mediaStream) => {
          dispatch(setLocalMedia({
            stream: mediaStream,
          }));
        })
        .catch((error) => console.error(error)); // TODO: handle error
    } else if (localMedia?.stream) {
      stopVideoStreamTracks(localMedia.stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }
  }, [camera]);

  useEffect(() => {
    if (localVideoRef.current) {
      if (localMedia?.stream?.getVideoTracks()?.[0]?.readyState === 'ended') {
        localVideoRef.current.srcObject = null;
      } else {
        localVideoRef.current.srcObject = localMedia?.stream;
      }
    }
  }, [localMedia]);

  return (
    <div className="video-chat-root" style={{ ...borderSx }}>
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
              className: visibility.isVisible ? 'video-no-blur' : 'video-blur',
            }}
          />
        </Grid>
        <Controls sx={{ ...borderSx }} />
        <Grid className="right-section" container direction="column" wrap="nowrap" item sm={4} alignSelf="stretch">
          <Grid
            className="text-chat"
            sx={borderSx}
            item
            sm={6}
          >
            <div>Text Chat</div>
          </Grid>
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
                // src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
                ref: localVideoRef,
                autoPlay: true,
                playsInline: true,
                controls: false,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoChat;
