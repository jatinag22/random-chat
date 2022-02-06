import SocketIo from '../websockets';

type MakeCallParametersType = {
  configuration: RTCConfiguration | undefined,
  stream: MediaStream,
  tracks: MediaStreamTrack[],
  remoteVideoElement: HTMLVideoElement,
  remoteSocketId: string,
  getRemoteSocketId: () => string,
  setRemoteSocketId: (id: string) => void,
  callbackAfterSendingOffer: (...args: any) => void,
  callbackAfterReceivingOffer: (...args: any) => void,
  callbackAfterSendingAnswer: (...args: any) => void,
  callbackAfterReceivingAnswer: (...args: any) => void,
  callbackAfterConnectingToRemotePeer: (...args: any) => void,
};

const addTracksInPeerConnection = (
  { tracks, streams, peerConnection }:
  { tracks: MediaStreamTrack[], streams: MediaStream[], peerConnection: RTCPeerConnection },
) => {
  tracks.forEach((track) => {
    peerConnection.addTrack(track, ...streams);
  });
};

const addAnswerListener = (
  { peerConnection, callback, setRemoteSocketId }:
  { peerConnection: RTCPeerConnection, callback: () => void, setRemoteSocketId: (id: string) => void },
) => {
  SocketIo.listen('answer', async ({ answer, socketId }) => {
    if (answer) {
      setRemoteSocketId(socketId);
      const remoteDesc = new RTCSessionDescription(answer);
      await peerConnection.setRemoteDescription(remoteDesc);
      callback();
    }
  });
};

const createAndSendOffer = async (
  { socketId, peerConnection, callback }:
  { socketId: string, peerConnection: RTCPeerConnection, callback: () => void },
) => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  SocketIo.emit('offer', { offer, socketId });
  callback();
};

const createAndSendAnswer = async (
  { peerConnection, callback, socketId }:
  { peerConnection: RTCPeerConnection, callback: () => void, socketId: string },
) => {
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  SocketIo.emit('answer', { answer, socketId });
  callback();
};

const addOfferListener = (
  {
    peerConnection, callbackAfterReceivingOffer, callbackAfterSendingAnswer, setRemoteSocketId,
  }:
  { peerConnection: RTCPeerConnection,
    callbackAfterReceivingOffer: () => void,
    callbackAfterSendingAnswer: () => void,
    setRemoteSocketId: (id: string) => void },
) => {
  SocketIo.listen('offer', async ({ offer, socketId }) => {
    if (offer) {
      setRemoteSocketId(socketId);
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      callbackAfterReceivingOffer();
      await createAndSendAnswer({ peerConnection, socketId, callback: callbackAfterSendingAnswer });
    }
  });
};

const listenForLocalIceCandidates = (
  { peerConnection, getRemoteSocketId }:
  { peerConnection: RTCPeerConnection, getRemoteSocketId: () => string },
) => {
  peerConnection.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
      const remoteSocketId = getRemoteSocketId();
      if (remoteSocketId) {
        SocketIo.emit('new-ice-candidate', { candidate: event.candidate, socketId: remoteSocketId });
      }
    }
  });
};

const listenForRemoteIceCandidates = (
  { peerConnection, getRemoteSocketId }:
  { peerConnection: RTCPeerConnection, getRemoteSocketId: () => string },
) => {
  SocketIo.listen('new-ice-candidate', async ({ candidate, socketId }) => {
    if (candidate && getRemoteSocketId() === socketId) {
      await peerConnection.addIceCandidate(candidate);
    }
  });
};

const listenForLocalPeerConnectionStateChange = (
  { peerConnection, callback }:
  { peerConnection: RTCPeerConnection, callback: () => void },
) => {
  peerConnection.addEventListener('connectionstatechange', () => {
    if (peerConnection.connectionState === 'connected') {
      callback();
    }
  });
};

const listenForRemoteTrack = (
  { peerConnection, remoteVideoElement }:
  { peerConnection: RTCPeerConnection, remoteVideoElement: HTMLVideoElement },
) => {
  peerConnection.addEventListener('track', async (event) => {
    const [remoteStream] = event.streams;
    // eslint-disable-next-line no-param-reassign
    remoteVideoElement.srcObject = remoteStream;
  });
};

export const makeCall = async ({
  configuration,
  stream,
  tracks,
  remoteVideoElement,
  remoteSocketId,
  getRemoteSocketId,
  setRemoteSocketId,
  callbackAfterSendingOffer,
  callbackAfterReceivingOffer,
  callbackAfterSendingAnswer,
  callbackAfterReceivingAnswer,
  callbackAfterConnectingToRemotePeer,
}: MakeCallParametersType) => {
  // Create peer connection object
  const peerConnection = new RTCPeerConnection(configuration);

  // Listen for local ICE candidates on the local RTCPeerConnection
  listenForLocalIceCandidates({ peerConnection, getRemoteSocketId });

  // Listen for remote ICE candidates and add them to the local RTCPeerConnection
  listenForRemoteIceCandidates({ peerConnection, getRemoteSocketId });

  // Listen for connectionstatechange on the local RTCPeerConnection
  listenForLocalPeerConnectionStateChange({ peerConnection, callback: callbackAfterConnectingToRemotePeer });

  // Listen for remote track and add the stream to remote video element
  listenForRemoteTrack({ peerConnection, remoteVideoElement });

  // Add local tracks in peer connection
  addTracksInPeerConnection({ tracks, streams: [stream], peerConnection });

  // Listen for offer from all and send answer
  addOfferListener({
    peerConnection, callbackAfterReceivingOffer, callbackAfterSendingAnswer, setRemoteSocketId,
  });

  // Listen for answer from all
  addAnswerListener({ peerConnection, callback: callbackAfterReceivingAnswer, setRemoteSocketId });

  // Create offer and send offer to all
  await createAndSendOffer({ socketId: remoteSocketId, peerConnection, callback: callbackAfterSendingOffer });
};

export const temp = '';
