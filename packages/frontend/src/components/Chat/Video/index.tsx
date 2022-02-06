import { Grid, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { chatConnectionReqestStart, setLocalMedia, setRemoteConnection } from '../../../redux/reducers/chat';
import { Request } from '../../../redux/reducers/constants';
import {
  getUserMedia, stopVideoStreamTracks, makeCall, getStreamTracks,
} from '../../../utils';
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
  const { request, remote } = useAppSelector((state) => state.chatConnection);

  const dispatch = useAppDispatch();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (camera.isOn) {
      getUserMedia({
        audio: true,
        video: true,
      })
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

  const getRemoteSocketId = () => remote.socketId as string;

  useEffect(() => {
    dispatch(chatConnectionReqestStart({ type: 'video' }));
  }, []);

  useEffect(() => {
    if (request.status === Request.SUCCESS && remote.socketId && localMedia?.stream && remoteVideoRef?.current) {
      makeCall({
        configuration: undefined,
        stream: localMedia.stream,
        tracks: getStreamTracks(localMedia.stream),
        remoteVideoElement: remoteVideoRef.current,
        remoteSocketId: remote.socketId as string,
        getRemoteSocketId,
        setRemoteSocketId: (id) => dispatch(setRemoteConnection({ socketId: id })),
        callbackAfterSendingOffer: () => {},
        callbackAfterReceivingOffer: () => {},
        callbackAfterSendingAnswer: () => {},
        callbackAfterReceivingAnswer: () => {},
        callbackAfterConnectingToRemotePeer: () => {},
      });
    }
  }, [localMedia, remote.socketId, request]);

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
              ref: remoteVideoRef,
              autoPlay: true,
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
                ref: localVideoRef,
                autoPlay: true,
                playsInline: true,
                controls: false,
                muted: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoChat;
