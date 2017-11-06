import users from './users';
import position from './position';
import item from './item';
import series from './series';
import stockIn from './stockIn';
import shelf from './shelf';

export default function() {
  users(),
  position(),
  item(),
  series(),
  stockIn(),
  shelf()
}