import LocalControls from './LocalControls';
import RemoteControls from './RemoteControls';
import './styles.css';

type ControlsType = {
  type: 'remote' | 'local',
  backgroundColor: string,
};

const Controls = ({ type, backgroundColor }: ControlsType) => (
  type === 'remote' ? <RemoteControls backgroundColor={backgroundColor} /> : <LocalControls />
);

export default Controls;
