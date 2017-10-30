import TopNavBar from '../components/TopNavBar';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context, clearErrors }, onData) => {
  const { Meteor } = context();
  const user = Meteor.user();
  onData(null, { user });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TopNavBar);
