import { ROLES } from '../../lib/enums';
import { Items, Series, Categories, Boxes, Positions, Shelves, Sections, Blocks, Warehouses, Offices } from '../../lib/collections';

Meteor.startup(function () {
  const InsertUser = () => {
    const user = Meteor.users.findOne({'emails.address': 'longnt@zigvy.com'});

    if (!user) {
      const userData = {
        email: 'longnt@zigvy.com',
        password: '123456789',
      };

      const userId = Accounts.createUser(userData);
      Meteor.users.update({_id: userId}, {
        $set: {
          'emails.0.verified': true,
          firstName: 'Gyro',
          lastName: 'Zeppeli',
          company: 'Zigvy Coperation',
          role: ROLES.STAFF
        }
      }, {filter: false});
    }
  };
  const InsertData = () => {
    let office = Offices.findOne();
    let officeId = office._id;

    if (!office) {
      office = {
        name: 'Joestar',
        address: '136/2 Tô Ký'
      }
      officeId = Offices.insert(office);
    }
    let warehouse = Warehouses.findOne();
    let warehouseId = warehouse._id;

    if (!warehouse) {
      warehouse = {
        name: 'A1',
        officeId,
        address: '38/6K Nguyễn Văn Trỗi'
      }
      warehouseId = Warehouses.insert(warehouse);
    }

    let section = Sections.findOne();
    let sectionId = section._id;

    if (!warehouse) {
      warehouse = {
        name: 'A1',
        officeId,
        address: '38/6K Nguyễn Văn Trỗi'
      }
      warehouseId = Warehouses.insert(warehouse);
    }
  };

  InsertUser();
});