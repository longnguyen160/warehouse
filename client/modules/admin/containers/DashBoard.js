import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import SignUp from '../components/SignUp';

export const composer = ({ context, clearErrors }, onData) => {



  
  onData(null, {  });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SignUp);
