import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import DashBoard from '../components/DashBoard';

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
)(DashBoard);
