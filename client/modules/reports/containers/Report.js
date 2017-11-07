import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Report from '../components/Report';

export const composer = ({ context }, onData) => {
  const { LocalState, Collections } = context();
  const { Meteor } = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Report);
