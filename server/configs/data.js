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
    let warehouses = Warehouses.find().fetch();
    let warehouseIds = warehouses.map(warehouse => warehouse._id);

    if (warehouses.length === 0) {
      let warehouse = {
        name: 'W1',
        address: '38/6K Nguyễn Văn Trỗi'
      }
      warehouseIds.push(Warehouses.insert(warehouse));
      warehouse = {
        name: 'W2',
        address: '136/2 Tô Ký'
      }
      warehouseIds.push(Warehouses.insert(warehouse));
    }

    let sections = Sections.find().fetch();
    let sectionIds = sections.length > 0 ? sections.map(section => section._id) : [];

    if (sections.length === 0) {
      warehouses.forEach((warehouse) => {
        let section = {
          name: 'SA',
          warehouseId: warehouse._id,
        }
        sectionIds.push(Sections.insert(section));
        section = {
          name: 'SB',
          warehouseId: warehouse._id,
        }
        sectionIds.push(Sections.insert(section));
        section = {
          name: 'SC',
          warehouseId: warehouse._id,
        }
        sectionIds.push(Sections.insert(section));
        section = {
          name: 'SD',
          warehouseId: warehouse._id,
        }
        sectionIds.push(Sections.insert(section));
      });
    }

    let categories = Categories.find().fetch();
    let categoryIds = categories ? categories.map(category => category._id) : [];

    if (categories.length === 0) {
      let category = {
        name: 'Action',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Adventure',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Fantasy',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Martial Arts',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Sci-fi',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Comedy',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Drama',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Slice of Life',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Romance',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'School Life',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Shounen',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Horror',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Supernatural',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Tragedy',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Detective',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Harem',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Ecchi',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Loli',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Yaoi',
      }
      categoryIds.push(Categories.insert(category));
      category = {
        name: 'Yuri',
      }
      categoryIds.push(Categories.insert(category));
    }

    let blocks = Blocks.find().fetch();
    let blockIds = blocks ? blocks.map(block => block._id) : [];

    if (blocks.length === 0) {
      sectionIds.forEach((sectionId) => {
        let block = {
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
        let shelve = {
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
        let box = {
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
      let seri = {
        name: "Kết Giới Sư",
        author: "Yellow TANABE",
        shelfId: [[shelveIds[0], shelveIds[1], shelveIds[2]]],
        publishYear: "2004",
        publisher: "SHOUGAKUKAN",
        categoryId: [categoryIds[0], categoryIds[1], categoryIds[2]]
      }
      seriIds.push(Series.insert(seri));
      seri = {
        name: "ONE-PUNCH MAN",
        author: "ONE, Yusuke Murata",
        shelfId: [[shelveIds[34], shelveIds[35]]],
        publishYear: "2004",
        publisher: "SHOUGAKUKAN",
        categoryId: [categoryIds[12]]
      }
      seriIds.push(Series.insert(seri));
      seri = {
        name: "ONE PIECE",
        author: "Eiichiro Oda",
        shelfId: [[shelveIds[65], shelveIds[66]]],
        publishYear: "1997",
        publisher: "SHUEISHA",
        categoryId: [categoryIds[0], categoryIds[1], categoryIds[2]]
      }
      seriIds.push(Series.insert(seri));
    }


    let items = Items.find().fetch();
    let itemIds = items ? items.map(item => item._id) : [];


    if (items.length === 0) {
      let item = {
        warehouseId: warehouseIds[0],
        sectionId: sectionIds[0],
        blockId: blockIds[0],
        shelfId: shelveIds[0],
        boxId: [boxIds[0]],
        seriesId: seriIds[0],
        ISBN: "987-604-2-08812-1",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 18000,
        code: "W1SAB1SH1BO1",
        name: "Kết Giới Sư 20"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[0] }, { $set: { currentQuantity: 100 } });
      item = {
        warehouseId: warehouseIds[0],
        sectionId: sectionIds[0],
        blockId: blockIds[0],
        shelfId: shelveIds[0],
        boxId: [boxIds[1]],
        seriesId: seriIds[0],
        ISBN: "987-604-2-08813-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 18000,
        code: "W1SAB1SH1BO2",
        name: "Kết Giới Sư 21"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[1] }, { $set: { currentQuantity: 100 } });
      item = {
        warehouseId: warehouseIds[0],
        sectionId: sectionIds[0],
        blockId: blockIds[0],
        shelfId: shelveIds[0],
        boxId: [boxIds[0]],
        seriesId: seriIds[0],
        ISBN: "987-604-2-08814-5",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 18000,
        code: "W1SAB1SH1BO1",
        name: "Kết Giới Sư 22"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[0] }, { $set: { currentQuantity: 200 } });
      item = {
        warehouseId: warehouseIds[0],
        sectionId: sectionIds[2],
        blockId: blockIds[8],
        shelfId: shelveIds[34],
        boxId: [boxIds[553]],
        seriesId: seriIds[1],
        ISBN: "987-604-2-08909-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 20000,
        code: "W1SCB9SH35BO554",
        name: "ONE-PUNCH MAN 11"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[553] }, { $set: { currentQuantity: 100 } });
      item = {
        warehouseId: warehouseIds[0],
        sectionId: sectionIds[2],
        blockId: blockIds[8],
        shelfId: shelveIds[34],
        boxId: [boxIds[554]],
        seriesId: seriIds[1],
        ISBN: "987-604-2-08910-4",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 20000,
        code: "W1SCB9SH35BO555",
        name: "ONE-PUNCH MAN 12"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[554] }, { $set: { currentQuantity: 100 } });
      item = {
        warehouseId: warehouseIds[0],
        sectionId: sectionIds[2],
        blockId: blockIds[8],
        shelfId: shelveIds[34],
        boxId: [boxIds[555]],
        seriesId: seriIds[1],
        ISBN: "987-604-2-08911-1",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 20000,
        code: "W1SCB9SH35BO556",
        name: "ONE-PUNCH MAN 13"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[555] }, { $set: { currentQuantity: 100 } });
      item = {
        warehouseId: warehouseIds[1],
        sectionId: sectionIds[5],
        blockId: blockIds[17],
        shelfId: shelveIds[65],
        boxId: [boxIds[1024]],
        seriesId: seriIds[2],
        ISBN: "987-604-2-07117-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 19500,
        code: "W1SAB1SH4B64",
        name: "ONE PIECE 75"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[1024] }, { $set: { currentQuantity: 100 } });
      item = {
        warehouseId: warehouseIds[1],
        sectionId: sectionIds[5],
        blockId: blockIds[17],
        shelfId: shelveIds[65],
        boxId: [boxIds[1025]],
        seriesId: seriIds[2],
        ISBN: "987-604-2-07118-5",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 19500,
        code: "W1SAB1SH4B65",
        name: "ONE PIECE 76"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[1025] }, { $set: { currentQuantity: 100 } });
      item = {
        warehouseId: warehouseIds[1],
        sectionId: sectionIds[5],
        blockId: blockIds[17],
        shelfId: shelveIds[65],
        boxId: [boxIds[1026]],
        seriesId: seriIds[2],
        ISBN: "987-604-2-08727-8",
        quantity: 100,
        size: "11,3 x 17,6",
        edition: "TANKOUBON",
        price: 19500,
        code: "W1SAB1SH4B66",
        name: "ONE PIECE 77"
      }
      itemIds.push(Items.insert(item));
      Boxes.update({ _id: boxIds[1026] }, { $set: { currentQuantity: 100 } });
    }
  };

  InsertUser();
  InsertData();
});