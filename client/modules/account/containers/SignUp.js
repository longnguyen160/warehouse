import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import SignUp from '../components/SignUp';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('SIGNUP_ERROR');
  const isLoggedIn = Boolean(Meteor.userId());
  onData(null, { error, isLoggedIn });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  createUser: actions.account.createUser,
  clearErrors: actions.account.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SignUp);
