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
      category = {
        name: 'Action',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Adventure',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Fantasy',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Martial Arts',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Sci-fi',
        sectionId: sectionIds[0],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Comedy',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Drama',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Slice of Life',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Romance',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'School Life',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Shounen',
        sectionId: sectionIds[1],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Horror',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Supernatural',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Tragedy',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Detective',
        sectionId: sectionIds[2],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Harem',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Ecchi',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Loli',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Yaoi',
        sectionId: sectionIds[3],
      }
      categoryIds.push(Categories.insert(category));
      category = {
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

    let series = Series.find().fetch();
    let seriIds = Series ? series.map(seri => seri._id) : [];

    if (series.length === 0) {
      seri = {
        name: "Kết Giới Sư",
        author: "Yellow TANABE",
        shelfId: [ shelveIds[0], shelveIds[1], shelveIds[2] ],
        publishYear: "2004",
        publisher: "SHOUGAKUKAN",
        categoryId: [ categoryIds[0], categoryIds[1], categoryIds[2] ]
      }
      seriIds.push(Series.insert(seri));
      seri = {
        name: "ONE-PUNCH MAN",
        author: "ONE, Yusuke Murata",
        shelfId: [ shelveIds[34], shelveIds[35] ],
        publishYear: "2004",
        publisher: "SHOUGAKUKAN",
        categoryId: [ categoryIds[12] ]
      }
      seriIds.push(Series.insert(seri));
      seri = {
        name: "ONE PIECE",
        author: "Eiichiro Oda",
        shelfId: [ shelveIds[3], shelveIds[4], shelveIds[5], shelveIds[6], shelveIds[7] ],
        publishYear: "1997",
        publisher: "SHUEISHA",
        categoryId: [ categoryIds[0], categoryIds[1], categoryIds[2] ]
      }
      seriIds.push(Series.insert(seri));
    }


    let items = Items.find().fetch();
    let itemIds = items ? items.map(item => item._id) : [];

    if (items.length === 0) {
      item = {
        seriesId: seriIds[0],
        boxId: [ boxIds[0] ],
        ISBN: "987-604-2-08812-1",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 18000,
        code: "W1SAB1SH1BO1",
        name: "Kết Giới Sư 20"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[0],
        boxId: [ boxIds[1] ],
        ISBN: "987-604-2-08813-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 18000,
        code: "W1SAB1SH1BO2",
        name: "Kết Giới Sư 21"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[0],
        boxId: [ boxIds[0] ],
        ISBN: "987-604-2-08814-5",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 18000,
        code: "W1SAB1SH1BO3",
        name: "Kết Giới Sư 22"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[1],
        boxId: [ boxIds[553] ],
        ISBN: "987-604-2-08909-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 20000,
        code: "W1SCB9SH35BO554",
        name: "ONE-PUNCH MAN 11"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[1],
        boxId: [ boxIds[554] ],
        ISBN: "987-604-2-08910-4",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 20000,
        code: "W1SCB9SH35BO555",
        name: "ONE-PUNCH MAN 12"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[1],
        boxId: [ boxIds[555] ],
        ISBN: "987-604-2-08911-1",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 20000,
        code: "W1SCB9SH35BO556",
        name: "ONE-PUNCH MAN 13"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[2],
        boxId: [ boxIds[63] ],
        ISBN: "987-604-2-07117-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 19500,
        code: "W1SCB9SH4B64",
        name: "ONE PIECE 75"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[2],
        boxId: [ boxIds[64] ],
        ISBN: "987-604-2-07118-5",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 19500,
        code: "W1SCB9SH4B65",
        name: "ONE PIECE 76"
      }
      itemIds.push(Items.insert(item));
      item = {
        seriesId: seriIds[2],
        boxId: [ boxIds[65] ],
        ISBN: "987-604-2-08727-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 19500,
        code: "W1SCB9SH4B66",
        name: "ONE PIECE 77"
      }
      itemIds.push(Items.insert(item));
    }
  };

  InsertUser();
  InsertData();
});