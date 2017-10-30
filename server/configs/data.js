import { ROLES } from '../../lib/enums';
import { Items, Series, Categories, Boxes, Shelves, Sections, Blocks, Warehouses, Offices } from '../../lib/collections';

Meteor.startup(function () {
  const InsertUser = () => {
    const user = Meteor.users.findOne({ 'emails.address': 'longnt@zigvy.com' });

    if (!user) {
      const userData = {
        email: 'longnt@zigvy.com',
        password: '123456789',
      };

      const userId = Accounts.createUser(userData);
      Meteor.users.update({ _id: userId }, {
        $set: {
          'emails.0.verified': true,
          firstName: 'Gyro',
          lastName: 'Zeppeli',
          company: 'Zigvy Coperation',
          role: ROLES.STAFF
        }
      }, { filter: false });
    }
  };
  const InsertData = () => {
    let office = Offices.findOne();
    let officeId = office ? office._id : '';

    if (!office) {
      office = {
        name: 'Joestar',
        address: '136/2 Tô Ký'
      }
      officeId = Offices.insert(office);
    }
    let warehouse = Warehouses.findOne();
    let warehouseId = warehouse ? warehouse._id : '';

    if (!warehouse) {
      warehouse = {
        name: 'W1',
        officeId,
        address: '38/6K Nguyễn Văn Trỗi'
      }
      warehouseId = Warehouses.insert(warehouse);
    }

    let sections = Sections.find().fetch();
    let sectionIds = sections ? sections.map(section => section._id) : [];

    if (sections.length === 0) {
      section = {
        name: 'SA',
        warehouseId
      }
      sectionIds.push(Sections.insert(section));
      section = {
        name: 'SB',
        warehouseId
      }
      sectionIds.push(Sections.insert(section));
      section = {
        name: 'SC',
        warehouseId
      }
      sectionIds.push(Sections.insert(section));
      section = {
        name: 'SD',
        warehouseId
      }
      sectionIds.push(Sections.insert(section));
    }

    let categories = Categories.find().fetch();
    let categoryIds = categories ? categories.map(category => category._id) : [];

    if (categories.length === 0) {
      categories = {
        name: 'Action',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Adventure',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Fantasy',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Martial Arts',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Sci-fi',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Comedy',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Drama',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Slice of Life',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Romance',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'School Life',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Shounen',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Horror',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Supernatural',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Tragedy',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Detective',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Harem',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Ecchi',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Loli',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Yaoi',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      categories = {
        name: 'Yuri',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
    }

    let blocks = Blocks.find().fetch();
    let blockIds = blocks ? blocks.map(block => block._id) : [];

    if (blocks.length === 0) {
      sectionIds.forEach((sectionId) => {
        block = {
          name: 'B1',
          sectionId
        }
        blockIds.push(Blocks.insert(block));
        block = {
          name: 'B2',
          sectionId
        }
        blockIds.push(Blocks.insert(block));
        block = {
          name: 'B3',
          sectionId
        }
        blockIds.push(Blocks.insert(block));
        block = {
          name: 'B4',
          sectionId
        }
        blockIds.push(Blocks.insert(block));
      });
    }

    let shelves = Shelves.find().fetch();
    let shelveIds = shelves ? shelves.map(shelves => shelves._id) : [];

    if (shelves.length === 0) {
      blockIds.forEach((blockId) => {
        shelve = {
          name: 'SH1',
          blockId
        }
        shelveIds.push(Shelves.insert(shelve));
        shelve = {
          name: 'SH2',
          blockId
        }
        shelveIds.push(Shelves.insert(shelve));
        shelve = {
          name: 'SH3',
          blockId
        }
        shelveIds.push(Shelves.insert(shelve));
        shelve = {
          name: 'SH4',
          blockId
        }
        shelveIds.push(Shelves.insert(shelve));
      });      
    }
    let boxes = Boxes.find().fetch();
    let boxIds = boxes ? boxes.map(boxes => boxes._id) : [];

    if (boxes.length === 0) {
      shelveIds.forEach((shelveId) => {
        box = {
          name: 'BO1',
          shelveId,
          rowId: 1,
          columnId: 1,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO2',
          shelveId,
          rowId: 1,
          columnId: 2,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO3',
          shelveId,
          rowId: 1,
          columnId: 3,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO4',
          shelveId,
          rowId: 1,
          columnId: 4,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO5',
          shelveId,
          rowId: 2,
          columnId: 1,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO6',
          shelveId,
          rowId: 2,
          columnId: 2,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO7',
          shelveId,
          rowId: 2,
          columnId: 3,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO8',
          shelveId,
          rowId: 2,
          columnId: 4,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'BO9',
          shelveId,
          rowId: 3,
          columnId: 1,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'B10',
          shelveId,
          rowId: 3,
          columnId: 2,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'B11',
          shelveId,
          rowId: 3,
          columnId: 3,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'B12',
          shelveId,
          rowId: 3,
          columnId: 4,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'B12',
          shelveId,
          rowId: 4,
          columnId: 1,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'B13',
          shelveId,
          rowId: 4,
          columnId: 2,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'B14',
          shelveId,
          rowId: 4,
          columnId: 3,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
        box = {
          name: 'B15',
          shelveId,
          rowId: 4,
          columnId: 4,
          maxItem: 200,
          currentQuantity: 0,
          status: false
        }
        boxIds.push(Boxes.insert(box));
      });
    }

    let items = Items.find().fetch();
    let itemIds = items ? items.map(item => item._id) : [];

    if(!items){
      item = {
        seriesId: String,
        boxId: [String],
        ISBN: String,
        quantity: Number,
        size: Boolean,
        edition: String,
        price: Number,
        code: String,
        name: String
      }
    }
  };

  InsertUser();
  InsertData();
});