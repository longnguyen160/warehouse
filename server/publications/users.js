import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.publish('userData', function() {
    if (!this.userId) {
      return this.ready();
    }
    return Meteor.users.find(this.userId);
  });

  Meteor.publish('getUserList', function() {
    if(!this.userId){
      return this.ready();
    }
    return Meteor.users.find({role: "staff"},{
      firstName: 1,
      lastName: 1,
      warehouseId: 1
    });
  });
}
