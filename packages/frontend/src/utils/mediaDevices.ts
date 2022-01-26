type Constraints = MediaStreamConstraints | undefined;

/**
 * Prompts the user for permission to use a media input which produces a MediaStream with tracks containing the requested types of media.
 *
 * That stream can include, for example, a video track (produced by either a hardware or virtual video source such as a camera, video recording device, screen sharing service, and so forth), an audio track (similarly, produced by a physical or virtual audio source like a microphone, A/D converter, or the like), and possibly other track types.
 *
 * It returns a Promise that resolves to a MediaStream object. If the user denies permission, or matching media is not available, then the promise is rejected with NotAllowedError or NotFoundError DOMException respectively.
 */
export const getUserMedia = (constraints?: Constraints) => (
  navigator.mediaDevices.getUserMedia(constraints)
);

/**
 * Prompts the user to select and grant permission to capture the contents of a display or portion thereof (such as a window) as a MediaStream.
 *
 * The resulting stream can then be recorded using the MediaStream Recording API or transmitted as part of a WebRTC session.
 */
export const getDispalyMedia = (constraints?: Constraints) => (
  navigator.mediaDevices.getDisplayMedia(constraints)
);

/**
 * Adds the provided MediaStream object to the srcObj of the HTMLMediaElement.
 */
export const insertMediaCapture = async ({ stream, element }: { stream: MediaStream, element: HTMLMediaElement }) => {
  // eslint-disable-next-line no-param-reassign
  element.srcObject = stream;
};

/**
 * Returns a sequence that represents all the MediaStreamTrack objects in this stream's track set, regardless of MediaStreamTrack.kind.
 */
export const getStreamTracks = (stream: MediaStream) => stream.getTracks();

/**
 * Returns a sequence of MediaStreamTrack objects representing the video tracks in this stream.
 */
export const getVideoStreamTracks = (stream: MediaStream) => stream.getVideoTracks();

/**
 * a sequence of MediaStreamTrack objects representing the audio tracks in this stream.
 */
export const getAudioStreamTracks = (stream: MediaStream) => stream.getAudioTracks();

/**
 * Returns a MediaStreamTrack object representing the track with the specified ID string. If there is no track with the specified ID, this method returns null.
 */
export const getStreamTrackById = ({ stream, id }: { stream: MediaStream, id: string }) => stream.getTrackById(id);

/**
 * Requests a list of the available media input and output devices, such as microphones, cameras, headsets, and so forth. The returned Promise is resolved with a MediaDeviceInfo array describing the devices.
 *
 * Access to particular devices is gated by the Permissions API. The list of returned devices will omit any devices for which the corresponding permission has not been granted, including: microphone, camera, speaker-selection (for output devices), and so on.
 */
export const getAllMediaDevices = () => navigator.mediaDevices.enumerateDevices();

/**
 * Stops all the tracks.
 */
export const stopStreamTracks = (stream: MediaStream) => (
  getStreamTracks(stream).forEach((track) => track.stop())
);

/**
 * Stops the video tracks.
 */
export const stopVideoStreamTracks = (stream: MediaStream) => (
  getVideoStreamTracks(stream).forEach((track) => track.stop())
);

/**
 * Stops the audio tracks.
 */
export const stopAudioStreamTracks = (stream: MediaStream) => (
  getAudioStreamTracks(stream).forEach((track) => track.stop())
);
