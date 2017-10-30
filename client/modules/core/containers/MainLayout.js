import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import MainLayout from '../components/MainLayout.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor } = context();
  const isLoggedIn = Boolean(Meteor.userId());
  if (Meteor.subscribe('userData').ready()) {
    onData(null, { isLoggedIn });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MainLayout);
