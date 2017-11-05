import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Action, Items, Boxes, Shelves, Blocks, Sections, Warehouses } from '../../lib/collections';

export default function () {
  Meteor.methods({
    'action.stockIn'(item, status) {
      check(item, Object);
      check(status, [Object]);

      let itemDetail = Items.findOne({ name: item.item });
      let itemId = '';
      if (itemDetail) {
        itemId = itemDetail._id;
        itemDetail.details = itemDetail.details.map(detail => {
          if (detail.warehouseId === Meteor.user().warehouseId) {
            detail.quantity += Number.parseInt(item.quantity);
            status.map(element => {
              if (!detail.boxId.includes(element.boxId)) {
                detail.boxId.push(element.boxId)
              }
            });
          }
          return detail;
        });
        Items.update({ _id: itemDetail._id }, { $set: itemDetail });
      } else {
        const boxes = Boxes.find({ _id: { $in: status.map(element => element.boxId) } }).fetch();
        const shelfIds = boxes.map(box => box.shelfId);
        const shelves = shelfIds.map(shelfId =>
          Shelves.findOne({ _id: shelfId })
        );
        let code = '';
        for (let i = 0; i < boxes.length; i++)
          code += shelves[i].name + boxes[i].name;
        const block = Blocks.findOne({ _id: shelves[0].blockId });
        const section = Sections.findOne({ _id: block.sectionId });
        const warehouse = Warehouses.findOne({ _id: section.warehouseId });
        const data = {
          name: item.item,
          price: item.price,
          edition: item.edition,
          size: item.size,
          ISBN: item.isbn,
          seriesId: item.seriesId,
          details: [
            {
              warehouseId: Meteor.user().warehouseId,
              sectionId: section._id,
              blockId: block._id,
              boxId: status.map(element => element.boxId),
              quantity: item.quantity,
              code: warehouse.name + section.name + block.name + code
            }
          ]
        };
        itemId = Items.insert(data);
      }
      status.map(element => {
        const box = Boxes.findOne({ _id: element.boxId });
        box.currentQuantity += element.number;
        Boxes.update({ _id: box._id }, { $set: box });
      });
      Action.insert({
        date: new Date(),
        staffId: Meteor.userId(),
        itemId: itemId,
        quantity: item.quantity,
        type: 'Stock In'
      });
    }
  });
}
