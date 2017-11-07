import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Staff from '../components/StaffManagement';

export const composer = ({ context }, onData) => {
  const { LocalState, Collections } = context();
  const { Meteor } = context();

  if(Meteor.subscribe('getUserList').ready() && Meteor.subscribe('getWarehouseList').ready()){

    const userList = Meteor.users.find({role: "staff"},{
      firstName: 1,
      lastName: 1,
      warehouseId: 1
    }).fetch();
    const warehouseList = Collections.Warehouses.find({}).fetch();
    let displayUserList = [];
    userList.forEach((user) => {
      const userName = `${user.firstName} ${user.lastName}`;
      const warehouseName = '';
      warehouseList.forEach((warehouse) => {
        if(user.warehouseId === warehouse._id){
          warehouseName = warehouse.name;
        }
      })
      const displayUser ={
        userId: user._id,
        name: userName,
        warehouseName: warehouseName
      }
      displayUserList.push(displayUser);
    });
    onData(null, { displayUserList, warehouseList });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  addUser: actions.staff.addUser,
  removeUser: actions.staff.removeUser
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Staff);
