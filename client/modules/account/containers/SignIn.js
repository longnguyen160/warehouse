import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import SignIn from '../components/SignIn';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('SIGNIN_ERROR');
  const isLoggedIn = Boolean(Meteor.userId());
  onData(null, { error, isLoggedIn });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.account.clearErrors,
  login: actions.account.login,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SignIn);
