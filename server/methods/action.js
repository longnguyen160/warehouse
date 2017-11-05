import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Action, Items, Boxes } from '../../lib/collections';

export default function () {
  Meteor.methods({
    'action.stockIn'(item, status) {
      check(item, Object);
      check(status, [Object]);

      let itemDetail = Items.findOne({ name: item.item });
      let itemId = itemDetail._id;
      if (itemDetail) {
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
