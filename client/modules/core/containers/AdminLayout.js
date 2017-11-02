import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import AdminLayout from '../components/AdminLayout.jsx';
import { ROLES } from '../../../../lib/enums';

export const composer = ({ context }, onData) => {
  const { Meteor } = context();
  if (Meteor.userId()) {
    if (Meteor.user() && Meteor.subscribe('userData').ready()) {
      const isAdmin = Meteor.user().role === ROLES.ADMIN;
      onData(null, { isAdmin });
    }
  } else {
    history.push('/signin');
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AdminLayout);
